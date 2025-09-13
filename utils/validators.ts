export const isString = (value: unknown): boolean => typeof value === 'string';

export const isEmptyString = (value: unknown): boolean =>
  isString(value) ? value.trim().length === 0 : true;

export const isLongerThan = (value: unknown, minLength: number): boolean =>
  isString(value) ? value.trim().length >= minLength : false;

export const isNumber = (value: unknown): boolean => typeof value === 'number';

export const isEmail = (value: unknown): boolean => {
  if (!isString(value) || isEmptyString(value)) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value.trim());
};

export const hasNoNumber = (value: unknown): boolean => {
  if (!isString(value) || isEmptyString(value)) return false;
  const numberRegex = /\d/;
  return !numberRegex.test(value);
};

export const sanitizeInput = (value: unknown): string => {
  if (!isString(value)) return '';
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // caractères invisibles unicode
};

export const isNotInjectingSomething = (value: unknown): boolean => {
  if (!isString(value)) return false;
  const forbiddenPatterns = [
    /<script.*?>.*?<\/script>/gi, // injection JS
    /('|;|--|\/\*|\*\/|DROP|SELECT|INSERT|DELETE|UPDATE)/gi,
  ];
  return !forbiddenPatterns.some((pattern) => pattern.test(value));
};
