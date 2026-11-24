// A missed item stays due even when it was the last item in the queue.
export function advanceLesson<T>(
  queue: T[], idx: number, correctCount: number, totalAnswered: number, correct: boolean,
) {
  return {
    queue: correct ? queue : [...queue, queue[idx]],
    idx: idx + 1,
    correctCount: correctCount + Number(correct),
    totalAnswered: totalAnswered + 1,
  };
}
