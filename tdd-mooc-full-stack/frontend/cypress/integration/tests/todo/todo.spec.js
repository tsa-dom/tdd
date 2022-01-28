/* eslint-disable no-undef */
import axios from 'axios'

it('Reset', () => axios.get('http://localhost:8080/api/reset'))

Given('A user enters to the website', () => {
  cy.visit('http://localhost:3000')
  cy.contains('Do food')
})

When('the user clicks a button', () => {
  cy.get('#hello-button').click()
})

Then('the text "Hello world" is fetched from the database and is displayed on the webpage', () => {
  cy.contains('Hello world')
})

When('the user is looking at the website', () => {
  // Nothing special here, just describing what the user is doing
})

Then('the user is able to see todos', () => {
  cy.contains('Wash dishes')
})

When('the user writes and submits a new todo', () => {
  cy.get('#add-todo-input').type('This is a new todo')
  cy.get('#add-todo-button').click()
})

Then('the todo is displayed in the list', () => {
  cy.contains('This is a new todo')
})

When('the user modifies the existing todo', () => {
  cy.contains('Modify').first().click()
  cy.get('input').first().clear().type('This is awesome')
  cy.contains('Submit').click()
})

Then('the todo is updated', () => {
  cy.contains('This is awesome')
})

When('the user marks the todo as done', () => {
  cy.contains('Do homework')
  cy.contains('Done').first().click()
})

Then('the todo disappears from the list', () => {
  cy.get('span').should('not.contain', 'Do homework')
  cy.get('span').should('contain', 'Do food')
})

When('the user clicks archived todos button', () => {
  cy.contains('Archived').click()
})

Then('all the completed todos are displayed on the webpage', () => {
  cy.contains('Do homework')
})