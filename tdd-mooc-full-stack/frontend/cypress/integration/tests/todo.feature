Feature: Todo

Scenario: As a user I want to see "Hello world" message after a button click
  Given A user enters to the website
  When the user clicks a button
  Then the text "Hello world" is fetched from the database and is displayed on the webpage

Scenario: As a user I'm able to view todos
  Given A user enters to the website
  When the user is looking at the website
  Then the user is able to see todos

Scenario: As a user I can add a new todo item
  Given A user enters to the website
  When the user writes and submits a new todo
  Then the todo is displayed in the list

#Scenario: As a user I can rename a todo item
#  Given A user enters to the website
#  When a user modifies the existing todo
#  Then the todo is updated 

#Scenario: As a user I can mark a todo as completed
#  Given A user enters to the website
#  When a user marks the todo as done
#  Then the todo disappears from the list

#Scenario: As a user I can archive all completed todo items
#  Given A user enters to the website
#  When a user clicks archived todos button
#  Then all the completed todos are displayed on the webpage