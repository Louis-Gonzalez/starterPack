import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../../components/common/MyComponent.vue';

describe('MyComponent.vue', () => {
  it('affiche le titre du paragraphe', () => {
    const wrapper = mount(MyComponent, {
      props: {
        myComponentProps: 'This is my props'
      }
    })

    // Vérifie que le h2 affiche bien le texte du ref
    expect(wrapper.exists()).toBe(true)
    const title = wrapper.find('h2')
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('This is a paragraph title')

  })

  it('affiche la props du paragraphe', () => {
    const wrapper = mount(MyComponent, {
      props: {
        myComponentProps: 'This is my props'
      }
    })
    // Vérifie que le paragraphe affiche la prop passée
    expect(wrapper.find('p').text()).toBe('This is my props')
  })
})
