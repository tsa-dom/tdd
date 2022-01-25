/* eslint-disable no-undef */

Given('An user enters to the website', () => {
  cy.visit('http://localhost:3000')
})

When('an user clicks a button', () => {
  cy.get('#hello-button').click()
})

Then('a text "Hello world" is fetched from the database and is displayed on the webpage', () => {
  cy.contains('Hello world')
})