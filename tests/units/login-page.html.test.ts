import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginPage from '../../pages/authentication/login.vue'

describe('LoginPage', () => {
  it('devrait afficher le bon titre', () => {
    const wrapper = mount(LoginPage)
    const title = wrapper.find('h1')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('This is Login Page')
  })

  it('devrait contenir le paragraphe', () =>{
    const wrapper = mount(LoginPage)
    const paragraphe = wrapper.find('p')
    expect(paragraphe.exists()).toBe(true)
    expect(paragraphe.text()).toContain('Aliquam blandit urna sit amet magna cursus, ')
  })

  it('devrait contenir l\'image avec la bonne classe et le bon src', () => {
    const wrapper = mount(LoginPage)
        const img = wrapper.find('img.logo-nuxt-icon')

    expect(img.classes()).toContain('logo-nuxt-icon')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/favicon.ico')
    expect(img.attributes('alt')).toBe('nuxt icon')
  })

  it('incrémente et décrémente le compteur quand on clique sur les boutons', async () =>{
    const wrapper = mount(LoginPage)

    // On récupère les deux boutons
    const buttons = wrapper.findAll('button')
    const btnAdd = buttons[0]
    const btnSubtract = buttons[1]

    // Le compteur est affiché dans le même <p> que les boutons
    const count = () => wrapper.findAll('p')[2].text()

    // on vérifie que la valeur du début est 0
    expect(count()).toContain('0')

    // Incrémentation
    await btnAdd.trigger('click')
    expect(count()).toContain('1')

    // Nouvelle incrémentation
    await btnAdd.trigger('click')
    expect(count()).toContain('2')

    // Décrémentation
    await btnSubtract.trigger('click')
    expect(count()).toContain('1')
  })

})
