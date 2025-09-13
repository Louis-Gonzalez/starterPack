import { ref } from 'vue';

export function useUserForm() {


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkIsString = (word : unknown) => {
    return typeof word === "string";
  }

  const checkIsEmptyString = (word : unknown) => {
    if (checkIsString(word)) {
      // couvrir les cas où il y a des espaces vide !
      return !word.length
    }
  }

  const checkIsEnoughLonger = (word: unknown, wordLength : number) => {
    if (!checkIsEmptyString(word)) {
      word.length >= wordLength
    }
  }

  const checkIsNumber = (word : unknown) => {
    return typeof word === "number";
  }

  const checkIsEmail = (word : unknown) => {
    if (checkIsEmptyString(word)) {
      word.map.include(emailRegex)
    }
  }

  return {
    checkIsEmail,
    checkIsString,
    checkIsNumber,
    checkIsEmptyString,
    checkIsEnoughLonger
  };
}
