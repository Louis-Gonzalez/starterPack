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
