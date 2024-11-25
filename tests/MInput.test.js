import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MInput from '../src/components/input/MInput.vue'

describe('MInput', () => {
  it('renders properly', () => {
    const wrapper = mount(MInput, {
      props: {
        modelValue: '',
        placeholder: 'Enter text'
      }
    })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits input event', async () => {
    const wrapper = mount(MInput)
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['test'])
  })

  it('shows error message', () => {
    const wrapper = mount(MInput, {
      props: {
        error: 'This field is required'
      }
    })
    expect(wrapper.find('p').text()).toBe('This field is required')
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(MInput, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })
})
