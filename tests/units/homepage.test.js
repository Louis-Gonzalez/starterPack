import { mount } from '@vue/test-utils'
import IndexPage from '~/pages/index.vue'

describe('Homepage', () => {
    it('affiche le titre et le bouton', () => {
        const pageTitle = 'Homepage'
        const wrapper = mount(IndexPage)
        const h1 = wrapper.find('h1')

        expect(h1.exists()).toBe(true)
        expect(h1.text()).toEqual(pageTitle)
    })

    it('affiche le titre et les bouton', () => {
        const wrapper = mount(IndexPage)
        const button = wrapper.findComponent('v-btn')
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Click Me')
    })
})
