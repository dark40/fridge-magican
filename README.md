# fridge-magican

## License
Not Applicable

## Description
This application allows the user to determine what recipes they can make with the ingredients stored within their fridge. The application uses a mysql database to provide recipe information to the user, and allows the user to change the ingredients within their fridge from valid ingredients stored in the database.

The application has login and logout functionality to allow various users to store different fridge ingredient sets. 

## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Collaborators](#collaborators)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation
Once cloned, navigate to the relevant directory and run the following command to install project dependencies:
```
npm i
```
Note: You must have node and mysql installed on your machine for this application to function.

Log in to mysql and run the following command to initiate the database:
```
source db/schema.sql
```

## Usage
To run the application on your local machine, complete the installation process then navigate to the relevant directory and run the following command in the console:
```
npm start
```
The application also relies on seed data to explore all functions. Seed data can be populated by running the following command in the terminal:
```
npm run seed
```
Note that the server must be run at least once for the seed data to be populated as the initial run of the server will generate the database tables. 

A demonstration of the application is provided within the walkthrough video:
***INSERT WALKTHROUGH VIDEO***

## Collaborators
The following personnel have been involved in the devleopment of this application:
- Craig Skicko
- Freddie Yang
- Artur Aleksanyan
- Patrick Gu

## Contributing
To contribute to the ongoing success of this application, please fork a repository then create a pull request once all relevant changes have been implemented and the updated code has been thoroughly tested

## Tests
At the time of writing, no specific tests have been written for this repository. If contributing, prior to pushing changes to the main branch, please ensure that updated code has been thoroughly tested.

## Questions
Should you have any questions, please contact me via [GitHub](https://github.com/CSkicko) or by [email](mailto:craig.skicko@gmail.com)
