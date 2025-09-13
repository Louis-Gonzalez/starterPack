import { ref } from 'vue';
import * as validators from '~/utils/validators';

export function useUserForm() {
  const lastname = ref('');
  const firstname = ref('');
  const email = ref('');

  // Fonction de validation qui renvoie true/false et un objet d'erreurs
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
      valid: Object.keys(errors).length === 0, // true si pas d'erreurs
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
    // ici tu peux appeler ton API ou faire ce que tu veux avec les données
  };

  return { lastname, firstname, email, handleSubmit, validate };
}
