# Pet care search system
This is a pet care search system project which architecture has two main parts - back-end and front-end. It is a project made for pet caretakers and pet owners to find each other. Pet caretakers can make their advertisements, have a calendar in which there are dates and times available shown of each week of the day. Colors also indicate whether they are already reserved or not. They can see incoming reservations of owners and confirm or cancel them. An email is also sent to the owner when the caretaker confirms or cancels the reservation. The caretakers can also see owner advertisements. Owners can also create advertisements, but their main function is to see caretaker advertisements. They can comment on them, and also reserve times, for which there is a calendar. When they reserve times, an email is sent to them that the reservation is in progress and is waiting to be confirmed by the caretaker. 

## Used Technologies

Technologies used for back-end:
* Node.js 14.18.0 environment
* Express.js 4.17.3 framework 
* TypeScript 4.6.3 programming language
* ESlint 8.12.0 for static code anaylsis
* Jest 28.0.3 for unit testing
* Supertest 6.2.3 for integration testing
* Winston 3.6.0 for logging

Technologies used for front-end:
* React.js 18.0.0 framework(library)
* TypeScript 4.6.3 programming language
* Material UI 5.6.1 library
* ESlint 8.12.0

Database: 
* MySQL 2.8.1
* Knex.js 1.0.4 for SQL query building.

## How to run the application
* Firstly download the project and use the command npm install in both back-end and front-end projects in order to install the required libraries.
* In order to run the API (back-end), type the command ```npm run serve``` in command line or, if for example using Visual Studio Code, you can press F5(Ctrl + F5).
* In order to run the front-end, type the command ```npm run app.ts``` in command line or, f for example using Visual Studio Code, you can press F5(Ctrl + F5).
