import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUserForm } from '~/composables/useUserForm';

describe('useUserForm composable', () => {
  let composable: ReturnType<typeof useUserForm>;

  beforeEach(() => {
    composable = useUserForm();
  });

  it('initial values should be empty', () => {
    expect(composable.lastname.value).toBe('');
    expect(composable.firstname.value).toBe('');
    expect(composable.email.value).toBe('');
    expect(composable.comment.value).toBe('');
  });

  it('should return blue color if required fields are empty', () => {
    expect(composable.lastnameColor.value).toBe('blue');
    expect(composable.firstnameColor.value).toBe('blue');
    expect(composable.emailColor.value).toBe('blue');
    expect(composable.commentColor.value).toBe('blue');
  });

  it('validate() should return errors if fields are empty', () => {
    const { valid, errors } = composable.validate();
    expect(valid).toBe(false);
    expect(errors.lastname).toBeDefined();
    expect(errors.firstname).toBeDefined();
    expect(errors.email).toBeDefined();
  });

  it('validate() should be valid with correct values', () => {
    composable.lastname.value = 'Dupont';
    composable.firstname.value = 'Jean';
    composable.email.value = 'jean.dupont@example.com';
    composable.comment.value = 'Ceci est un commentaire sûr';

    const { valid, errors } = composable.validate();
    expect(valid).toBe(true);
    expect(Object.keys(errors).length).toBe(0);
  });

  it('handleSubmit() should log error for invalid form', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    composable.handleSubmit();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('handleSubmit() should log success for valid form', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    composable.lastname.value = 'Dupont';
    composable.firstname.value = 'Jean';
    composable.email.value = 'jean.dupont@example.com';
    composable.comment.value = 'Commentaire valide';

    composable.handleSubmit();
    expect(logSpy).toHaveBeenCalledWith('Formulaire valide ✅');

    logSpy.mockRestore();
  });
});
