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

})
