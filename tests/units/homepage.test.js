import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MyPage from '../../pages/index.vue';

describe('Homepage Test', () => {
  it('devrait afficher le bon titre', () => {
    const wrapper = mount(MyPage);
    expect(wrapper.find('h1').text()).toBe('Homepage');
  });

  it("devrait afficher l'URL correcte", () => {
    // Pour tester l'URL dans un test d'intégration
    expect(window.location.pathname).toBe('/');
  });
});
