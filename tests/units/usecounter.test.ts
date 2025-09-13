import { describe, it, expect } from 'vitest';
import { useCounter } from '~/composables/useCounter';

describe('useCounter composable', () => {
  it('initializes with default value (0)', () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });

  it('initializes with a custom value', () => {
    const { count } = useCounter(5);
    expect(count.value).toBe(5);
  });

  it('increments correctly', () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });

  it('decrements correctly', () => {
    const { count, decrement } = useCounter(2);
    decrement();
    expect(count.value).toBe(1);
  });

  it('resets to the initial value', () => {
    const { count, increment, reset } = useCounter(3);
    increment();
    increment();
    expect(count.value).toBe(5); // 3 + 2
    reset();
    expect(count.value).toBe(3);
  });
});
