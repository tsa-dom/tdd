/* eslint-disable no-undef */

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
  cy.contains('Go to the school')
})

When('the user writes and submits a new todo', () => {
  cy.get('#add-todo-input').type('This is a new todo')
  cy.get('#add-todo-button').click()
})

Then('the todo is displayed in the list', () => {
  cy.contains('This is a new todo')
})