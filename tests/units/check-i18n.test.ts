import { describe, it, expect } from 'vitest';
import { sortObject, formatJsonWithCorrectCommas } from '../../scripts/i18nUtils.js';

describe('sortObject', () => {
  it('should sort object keys alphabetically', () => {
    const obj = { b: 2, a: 1, c: 3 };
    expect(sortObject(obj)).toEqual({ a: 1, b: 2, c: 3 });
  });
});

describe('formatJsonWithCorrectCommas', () => {
  it('should format JSON string with proper commas', () => {
    const obj = { a: "x", b: "y" };
    const expected = `{
  "a": "x",
  "b": "y"
}`;
    expect(formatJsonWithCorrectCommas(obj)).toBe(expected);
  });
});
