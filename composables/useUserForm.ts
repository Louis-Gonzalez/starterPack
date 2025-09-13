import { ref, computed, type Ref } from 'vue';
import * as validators from '~/utils/validators';

export function useUserForm() {
  const lastname = ref<string>('');
  const firstname = ref<string>('');
  const email = ref<string>('');
  const comment = ref<string>('');

  const isRequiredColor = (field: Ref<string>) =>
    computed(() => field.value.trim() === '' ? 'blue' : ''); // bleu si vide

  const lastnameColor = isRequiredColor(lastname);
  const firstnameColor = isRequiredColor(firstname);
  const emailColor = isRequiredColor(email);
  const commentColor = isRequiredColor(comment); // 🌟 ajouté

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

    if (!validators.isNotInjectingSomething(comment.value)) {
      errors.comment = 'Le commentaire contient des caractères interdits';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handleSubmit = () => {
    const { valid, errors } = validate();
    console.log('Form values:', { lastname: lastname.value, firstname: firstname.value, email: email.value, comment: comment.value });

    if (!valid) {
      console.error('Erreurs de validation:', errors);
      return;
    }

    console.log('Formulaire valide ✅');
    // ici tu peux faire ton traitement des données call api etc ...
  };

  // 🌟 Rules Vuetify
  const rules = {
    lastname: [
      (v: string) => !!v || 'Le nom est obligatoire',
      (v: string) => validators.isString(v) || 'Doit être une chaîne',
      (v: string) => validators.isLongerThan(v, 2) || 'Doit contenir au moins 3 caractères',
      (v: string) => validators.hasNoNumber(v) || 'Le nom ne doit pas contenir de chiffre',
      (v: string) => validators.isNotInjectingSomething(v) || 'Contient des caractères interdits',
    ],
    firstname: [
      (v: string) => !!v || 'Le prénom est obligatoire',
      (v: string) => validators.isString(v) || 'Doit être une chaîne',
      (v: string) => validators.isLongerThan(v, 2) || 'Doit contenir au moins 3 caractères',
      (v: string) => validators.hasNoNumber(v) || 'Le prénom ne doit pas contenir de chiffre',
      (v: string) => validators.isNotInjectingSomething(v) || 'Contient des caractères interdits',
    ],
    email: [
      (v: string) => !!v || 'L\'email est obligatoire',
      (v: string) => validators.isEmail(v) || 'Email invalide',
      (v: string) => validators.isNotInjectingSomething(v) || 'Contient des caractères interdits',
    ],
    comment: [
      (v: string) => validators.isNotInjectingSomething(v) || 'Le commentaire contient des caractères interdits',
    ],
  };

  return {
    lastname,
    firstname,
    email,
    comment,
    handleSubmit,
    validate,
    rules,
    lastnameColor,
    firstnameColor,
    emailColor,
    commentColor,
  };
}
