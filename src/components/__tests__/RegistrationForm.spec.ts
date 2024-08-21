import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import RegistrationForm from '../RegistrationForm.vue'

describe('RegistrationForm', () => {
  it('renders a form with input fields and a submit button', () => {
    const wrapper = mount(RegistrationForm)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('validates the name field', async () => {
    const wrapper = mount(RegistrationForm)
    const nameInput = wrapper.find('input[type="text"]')
    await nameInput.setValue('')
    await nameInput.trigger('blur')
    expect(wrapper.vm.errors.name).toBe('Name is required.')
  })

  it('validates the username field', async () => {
    const wrapper = mount(RegistrationForm)
    const usernameInput = wrapper.find('input[type="text"][id="username"]')
    await usernameInput.setValue('')
    await usernameInput.trigger('blur')
    expect(wrapper.vm.errors.username).toBe('Username is required.')
    await usernameInput.setValue('invalid username')
    await usernameInput.trigger('blur')
    expect(wrapper.vm.errors.username).toBe('Username can only contain letters and numbers.')
  })

  it('validates the email field', async () => {
    const wrapper = mount(RegistrationForm)
    const emailInput = wrapper.find('input[type="email"]')
    await emailInput.setValue('')
    await emailInput.trigger('blur')
    expect(wrapper.vm.errors.email).toBe('Email is required.')
    await emailInput.setValue('invalid email')
    await emailInput.trigger('blur')
    expect(wrapper.vm.errors.email).toBe('Email must be valid.')
  })

  it('validates the password field', async () => {
    const wrapper = mount(RegistrationForm)
    const passwordInput = wrapper.find('input[type="password"]')
    await passwordInput.setValue('')
    await passwordInput.trigger('blur')
    expect(wrapper.vm.errors.password).toBe('Password is required.')
    await passwordInput.setValue('short')
    await passwordInput.trigger('blur')
    expect(wrapper.vm.errors.password).toBe('Password must be at least 8 characters and contain at least one special character from @ $ #.')
  })
  
  
 
})