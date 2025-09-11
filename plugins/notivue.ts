import { defineNotivueConfig } from 'notivue'

export const notivueConfig = defineNotivueConfig({
  notifications: {
    // type classique
    success: {
      title: 'Succès',
      duration: 4000
    },
    // type spécial avec lien
    special: {
      title: 'Notification spéciale',
      duration: 8000, // reste plus longtemps
      props: {
        link: '' // on pourra passer un lien dynamiquement
      }
    }
  }
})
