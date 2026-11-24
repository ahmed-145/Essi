import assert from 'node:assert/strict';
import test from 'node:test';
import { advanceLesson } from '../lib/advanceLesson.ts';

test('the final correct answer counts toward the completion totals', () => {
  const result = advanceLesson(['a', 'b'], 1, 1, 1, true);
  assert.equal(result.idx, result.queue.length);
  assert.equal(result.correctCount, 2);
  assert.equal(result.totalAnswered, 2);
});

test('a final item remains due through repeated misses and a saved-session round trip', () => {
  let state = { queue: ['a'], idx: 0, correctCount: 0, totalAnswered: 0 };
  for (const correct of [false, false, false, true]) {
    const { queue, idx, correctCount, totalAnswered } = JSON.parse(JSON.stringify(state));
    assert.equal(queue[idx], 'a');
    state = advanceLesson(queue, idx, correctCount, totalAnswered, correct);
  }
  assert.equal(state.idx, state.queue.length);
  assert.equal(state.correctCount, 1);
  assert.equal(state.totalAnswered, 4);
});
