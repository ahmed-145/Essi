import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import { createProgressOutbox } from '../lib/progressOutbox.ts';

test('offline replay survives restarts, account changes, missing content and lost acknowledgements', async () => {
  const disk = new Map([['essi:offline_progress_events', 'owner unknown']]);
  const applied = new Set();
  let account = 'a';
  let online = false;
  let loseResponse = false;
  const dependencies = {
    storage: {
      getAllKeys: async () => [...disk.keys()],
      getItem: async key => disk.get(key) ?? null,
      setItem: async (key, value) => { disk.set(key, value); },
      removeItem: async key => { disk.delete(key); },
    },
    owner: () => account,
    uuid: randomUUID,
    async send(event) {
      assert.equal(event.user_id, account);
      if (!online) return { code: 'offline' };
      if (event.exercise_id === 'missing') return { code: '23503' };
      applied.add(event.id);
      if (loseResponse) {
        loseResponse = false;
        throw Error('response lost after commit');
      }
      return null;
    },
  };
  const input = { exercise_id: 'L1_E1', is_correct: true, ms_to_answer: 25 };
  let outbox = createProgressOutbox(dependencies);
  await outbox.record({ ...input, exercise_id: 'missing' });
  const receipts = await Promise.all(Array.from({ length: 105 }, () => outbox.record(input)));
  assert.ok(receipts.every(receipt => receipt.queued_offline));
  outbox = createProgressOutbox(dependencies);
  account = 'b';
  online = true;
  await outbox.flush();
  assert.equal(applied.size, 0);
  assert.equal((await outbox.record(input)).queued_offline, false);
  account = 'a';
  loseResponse = true;
  await assert.rejects(outbox.flush(), /response lost/);
  await Promise.all([outbox.flush(), outbox.flush()]);
  assert.equal(applied.size, 106);
  assert.equal(disk.size, 2);
  assert.ok([...disk.values()].some(raw => raw.includes('missing')));
  assert.equal(disk.get('essi:offline_progress_events'), 'owner unknown');
});
