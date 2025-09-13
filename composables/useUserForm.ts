import { ref } from 'vue';
import * as validators from '~/utils/validators';

export function useUserForm() {
  const lastname = ref('');
  const firstname = ref('');
  const email = ref('');

  // Fonction de validation globale
  const validate = (): { valid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    if (!validators.isString(lastname.value) || validators.isEmptyString(lastname.value)) {
      errors.lastname = 'Le nom est obligatoire et doit être une chaîne de caractères';
    }

    if (!validators.isString(firstname.value) || validators.isEmptyString(firstname.value)) {
      errors.firstname = 'Le prénom est obligatoire et doit être une chaîne de caractères';
    }

    if (!validators.isEmail(email.value)) {
      errors.email = 'L\'email est invalide';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = () => {
    const { valid, errors } = validate();
    console.log('Form values:', { lastname: lastname.value, firstname: firstname.value, email: email.value });

    if (!valid) {
      console.error('Erreurs de validation:', errors);
      return;
    }

    console.log('Formulaire valide ✅');
  };

  // 🌟 Rules Vuetify
  const rules = {
    lastname: [
      (v: string) => !!v || 'Le nom est obligatoire',
      (v: string) => validators.isString(v) || 'Doit être une chaîne',
      (v: string) => validators.isLongerThan(v, 2) || 'Doit contenir au moins 3 caractères',
      (v: string) => validators.hasNoNumber(v) || 'Le nom ne doit pas contenir de chiffre', // <- nouvelle règle
    ],
    firstname: [
      (v: string) => !!v || 'Le prénom est obligatoire',
      (v: string) => validators.isString(v) || 'Doit être une chaîne',
      (v: string) => validators.isLongerThan(v, 2) || 'Doit contenir au moins 3 caractères',
      (v: string) => validators.hasNoNumber(v) || 'Le prénom ne doit pas contenir de chiffre', // <- nouvelle règle
    ],
    email: [
      (v: string) => !!v || 'L\'email est obligatoire',
      (v: string) => validators.isEmail(v) || 'Email invalide',
    ],
  };

  return {
    lastname,
    firstname,
    email,
    handleSubmit,
    validate,
    rules
  };
}
