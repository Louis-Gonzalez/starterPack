import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
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
        const button = wrapper.findComponent({ name: 'v-btn' })
        expect(button.exists()).toBe(true)
        expect(button.text()).toContain('Click Me')
    })

    it('affiche le texte après clic sur le bouton', async () => {
        const wrapper = mount(IndexPage)

        expect(wrapper.find('p').exists()).toBe(false)

        const button = wrapper.findComponent({ name: 'v-btn' })
        expect(button.exists()).toBe(true)

        await button.trigger('click')
        await nextTick()

        const paragraph = wrapper.find('p')
        expect(paragraph.exists()).toBe(true)
        expect(paragraph.text()).toBe('This is a text ! or not !')
    })
})
