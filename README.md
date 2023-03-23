# Tech Blog

A CMS-style blog site for developers to publish articles, blog posts, and share their thoughts and opinions.

![license](https://img.shields.io/static/v1?label=license&message=No_license&color=blue&style=for-the-badge)

  Built with:

  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

> Live/deployment URL: https://wk14-mvc-challenge-techblog.herokuapp.com/

> Repository URL: https://api.github.com/repos/ptrcao/14-MVC-02-Challenge

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Credits](#credits)
- [Contributions](#contributions)
- [License](#license)


## Project Description
A CMS-style blog site for developers to publish articles, blog posts, and share their thoughts and opinions.

This application is a CMS-style blog site where developers can publish their blog posts and comment on other developers' posts. It follows the Model-View-Controller (MVC) architectural pattern, using Handlebars.js as the templating engine, Sequelize as the Object-Relational Mapping (ORM) tool, and the express-session npm package for authentication.

The site presents existing blog posts, if any, on the homepage, along with navigation links to the homepage and the dashboard, and the option to log in. Users can sign up, create a username and password, and log in to access their dashboard, where they can add new blog posts, update or delete existing ones, and view their comments.

## Installation
1. Clone the repository to your local machine.
2. Install the required dependencies by running the following command in the project root directory:
```
npm install
```
3. Create a .env file and add your MySQL database credentials:
```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PW=your_database_password
```

Run the database schema and seed data:
```
npm start
```

## Usage
1. Start the application by running the following command:
```
node server
```
2. Open your browser and navigate to http://localhost:3000.


## Technology Stack
* Node.js
* Express.js
* MySQL
* Sequelize ORM
* Handlebars.js
* Express-session
* Connect-session-sequelize
* Bcrypt
* Dotenv


## Contributions
Contributions are welcome. Please refer to the Contributor Covenant for contribution guidelines.

## Credits
- PC

## License
No license

## Questions
How to reach me?

GitHub link: https://api.github.com/users/ptrcao
