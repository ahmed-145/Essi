export interface Answer {
  exercise_id: string;
  is_correct: boolean;
  wrong_rule_id?: string | null;
  ms_to_answer: number;
}

interface ProgressEvent extends Answer {
  id: string;
  user_id: string;
  created_at: string;
}

interface Dependencies {
  storage: {
    getAllKeys(): Promise<readonly string[]>;
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  };
  owner(): string | undefined;
  uuid(): string;
  send(event: ProgressEvent): Promise<{ code: string } | null>;
}

const prefix = (owner: string) => `essi:progress:v2:${owner}:`;

export function createProgressOutbox({ storage, owner, uuid, send }: Dependencies) {
  let drain = Promise.resolve();

  function flush() {
    const account = owner();
    if (!account) return Promise.resolve();
    const run = drain.then(async () => {
      const keys = (await storage.getAllKeys()).filter(key => key.startsWith(prefix(account))).sort();
      for (const key of keys) {
        if (owner() !== account) return;
        const raw = await storage.getItem(key);
        if (!raw) continue;
        const event: ProgressEvent = JSON.parse(raw);
        const error = await send(event);
        // An obsolete exercise or rule affects this answer alone. Retain it
        // for a later content sync and allow valid answers to proceed.
        if (error?.code === '23503') continue;
        if (error) return;
        await storage.removeItem(key);
      }
    });
    drain = run.catch(() => {});
    return run;
  }

  async function record(input: Answer) {
    const account = owner();
    if (!account) return { ok: false };
    const event = { ...input, id: uuid(), user_id: account, created_at: new Date().toISOString() };
    const key = prefix(account) + event.created_at + ':' + event.id;
    await storage.setItem(key, JSON.stringify(event));
    await flush();
    return { ok: true, queued_offline: (await storage.getItem(key)) !== null };
  }

  return { record, flush };
}
