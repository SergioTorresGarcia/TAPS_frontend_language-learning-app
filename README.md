# TAPS - Language Learning Program

This is the FINAL PROJECT of the Full Stack Development Bootcamp with <a href="https://github.com/GeeksHubsAcademy" target="_blank">Geekshubs Academy</a>.


## Idea overview

This is a language learning program (mobile first) designed to help users learn and practice Japanese vocabulary in an enjoyable and engaging way. 
The program provides various types of word quizzes, pictogram and word recognition, and progress tracking to enhance the learning experience. It gives instant feedback on your progress.

<hr/>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#project-description-es">Description (ES)</a></li>
    <li><a href="#challenge">Challenge</a></li>
    <li><a href="#database-diagram">Database diagram</a></li>
    <li><a href="#instalation-local">Instalation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#project-development">Project development</a></li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#author">Author / Contact </a></li>
  </ol>
</details>

<hr/>

## How the game works

#### Stay Motivated
Easily form a language learning habit with the game-based features and enjoyable challenges with perfect level and pace for you.

#### Effective and Fun Learning Games
With Taps, learning becomes playtime. Engaging games, review modes, and interactive challenges transform language acquisition into a joyful experience.

#### Memorable Illustrations
Boost your memory retention with our captivating visuals and vibrant and soothing colors. Each word is accompanied by an eye-catching image, forging strong associations between the word and its meaning. Say hello to seamless language recall!

<hr/>


<div align="center">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
    <img src= "https://img.shields.io/badge/javascipt-EFD81D?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js"/>
    <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
    <img src="https://img.shields.io/badge/DOCKER-2020BF?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</div>

<hr/>

## General features

- Word Quizzes: Users can take quizzes to test their knowledge of vocabulary words.
- Flashcards: Flashcards are available to help users memorize vocabulary.
- Progress Tracking: The program tracks user progress to monitor learning achievements.
- Admin Panel: Administrators can manage users, words and levels in the program.

<hr/>

## Mini-games:
- Learning: the word and symbol appear (tap to continue).
- Compare 2 words (only one matches the symbol).
- Compare 2 symbols (only one matches the word).
- Compare 4 words (only one matches the symbol).
- Compare 4 symbols (only one matches the words).
- Display word AND symbol (is it true or false?).

<hr/>

## Challenge - MVP
- Use of REDUX
- Complex project structure: Hooks, Components, Services
- Modularized CSS (separated files)
- SPA (use of react-router-dom)
- Register / Login / Editable Profile views
- Views tha consum all endpoints from backend (at least 2 full CRUDs)


## Database diagram (MySQL)

![Reverse engineered diagram of the DB](src/assets/DIAGRAM-FINAL-PROJECT-5-tables.png)

## Instalation (local)
1.  Clone this repository: 
`$ git clone https://github.com/SergioTorresGarcia/TAPS_frontend_language-learning-app.git`
2. Navigate to the project directory `$ cd project-name`
3.  Install dependencies: run ` $ npm i ` in terminal

⚠️ MAKE SURE THAT BACKEND & DATABASE ARE RUNNING AS WELL ⚠️
<!-- 3.  Connect repository with database 
Set up environment variables: create a .env file in the root directory (sample provided).
4.  Run migrations:  ` $ npm run migrations `
5.  Run seeders:  ` $ npm run seed `
6.  Start server:  ` $ npm run dev ` -->

Once both back and front-end are running, run ` $ npm run dev ` in terminal and access the application (http://localhost:5173/)

This is a mobile first app, so for a better experience, select mobile view in your browser's  developer console:

> Option + ⌘ + J (on macOS)

> Shift + CTRL + J (on Windows/Linux)

To explore the app:

1. Register/login yourself and start playing.

2. Sign in as 'user' and play for a while. Remember to check out the rules of the game, your progress, and try deleting your profiles if you wish:
```bash
{
    "email": "user@mail.com",
    "password": "Aa123456"
}
```

3. Signing in as 'admin' you'd have access to extra functionalities in the admin panel:
- Roles CRUD
- Users CRUD
- Levels CRUD
- Words CRUD
```bash
{
    "email": "admin@mail.com",
    "password": "Aa123456"
}
```


## PAGES

- from LANDING `to LOGIN`

- from LOGIN `to REGISTER`

- from REGISTER `to  LOGIN`

- from PROFILE check:   
    > RULES (if you need)
    > PROGRESS (if you want)
    > EDIT PROFILE (if you must)
    > DELETE PROFILE (if you dare!)

- from HOME:       
    > GAME
    > PROFILE
    > LOG OUT (it would save the last played word)

- from GAME:
    > PLAY > PLAY2 ... PLAY5 > PLAY ...
    > CONGRATS view (after 10 words learnt)

- from HOME (as Admin):
    > GAME
    > PROFILE
    > LOG OUT
    > ADMIN

- from ADMIN PANEL:
    > ROLES Create / Read / Delete
    > USERS Read
    > LEVELS
    > WORDS Create / Read / Delete


<details>
<summary>AUTH routes</summary>

-   REGISTER new user
    
        POST http://localhost:4500/auth/register

    body:
    
    ``` js
        {
            "username": "Sergio",
            "email": "sergio@sergio.com",
            "password": "Aa123456"
        }
    ```

-   LOGIN user

        POST http://localhost:4500/auth/login
        
    body:

    ``` js
        {
            "email": "sergio@sergio.com",
            "password": "Aa123456"
        }
    ```
</details>

<details>
<summary>USERS routes</summary>

-   GET ALL USERS  (including dinamic query search)

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users
        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users?email=example@domain.com

- GET USER BY ID

      GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id

-   UPDATE PROFILE (for the currently logged user)

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/self

    body:

    ```js
        {
            "first_name": "name",
            "last_name": "surname",
            "email": "something@domain.com",
            "password": "111111"
        }
    ```
-   UPDATE USER BY ID

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id

-   UPDATE USER'S ROLE

        PUT https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id/:role

-   DELETE USER BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/users/:id
</details>
<details>
<summary>SERVICES routes</summary>

-   CREATE A NEW SERVICE

        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services

-   GET ALL SERVICES

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services

-   UPDATE SERVICE BY ID

        UPDATE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services/:id

-   DELETE SERVICE BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/services/:id
</details>
<details>
<summary>APPOINTMENTS routes</summary>

-   CREATE A NEW APPOINTMENT

        POST https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments

-   GET ALL APPOINTMENTS

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments
-   GET OWN APPOINTMENTS

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/profile
        
-   GET APPOINTMENTS BY ID

        GET https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

-   UPDATE APPOINTMENTS BY ID

        UPDATE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

-   DELETE APPOINTMENTS BY ID

        DELETE https://proyecto4-buscador-dev-jzta.1.ie-1.fl0.io/api/appointments/:id

</details>

<br />
Find here the collection of all endpoints in Thunder Client:

1. You have to open Thunder Client
2. Go to collections
3. Import this file: `./HTTP/thunder-collection_STUDIO TATTOO.json`


## Project Development:

<details>
  <summary>1. SQL - Database design:</summary>
    
-   Analyze the task to find the purpose of the database and gather all requirements
-   Concept design: create an Entity-Relationship Diagram where we
define tables, their attributes, and the relationships with one another.
-   Normalization: eliminate redundancy, identify primary keys (PK) and foreign keys (FK)
-   Logical thinking: decide what can and cannot be 'NULL' (not required) and which are 'UNIQUE' fields
</details>

<details>
  <summary>2. DOCKER - Creating a container</summary>

-   Install docker
- Create a container
    > docker run -d -p 3306:3306 --name <container-name> -e MYSQL_ROOT_PASSWORD=<your_password> mysql
- Access it
    > mysql -h localhost -P 3306 -u root -p
you will need -h (host), -P (port), -u (username) and -p (password)
- Execute it
    > docker exec -it mysql-pruebas bash
</details>

<details>
  <summary>3. EXPRESS - Create a server connection</summary>

- We initiate NODE:  `$ npm init` 
    This creates 'package.json' where all the dependencies will be stored.

- We run the command: `$ npm install express --save`
    This creates 'package-lock.json' and the 'node_modules' folder

- We create the folder '.gitignore' and add '/node_modules' inside
    This blocks the heavy folder from being upload to github with the rest of the project.

- We install TYPESCRIPT (as developers) `$ npm install typescript -D`

- We create the 'tsconfig.json' file: `$ npx tsc --init`

- We install types /express & node: `$ npm install @types/express @types/node -D`

- We install dependencies to compile TS (nodemon): `$ npm install ts-node nodemon -D`

- We add a shortcut to the package.json's scripts:
    > "dev": "nodemon ./src/server.ts"

- We create the file '.env' with the PORT (of the server) and add '.env' to the '.gitignore'.

    Also add a copy '.env.sample' where we will storage a blueprint of data, without the sensitive information (in this case: 'PORT= ')

- We install 'dotenv': `$ npm i dotenv`
    This gets added to the dependencies and will grab data from the .env file
</details>

<details>
  <summary>4. DOTENV - Connect to the DB</summary>

- We create the folder 'src' with a 'server.ts' file inside.
    The main function connects to the server `startServer();`<br/>
- We link a new file called `app.ts` to separate responsabilities.<br/>
-   In this file we write the following code:

    ```js
    import express from "express";
    import dotenv from "dotenv";
    import { Request, Response } from "express";
    
    // links the .env folder
    dotenv.config(); 

    // runs server connection
    const app = express(); 

    // parses responses to .json)
    app.use(express.json()); 

    // sets up the connection port
    const PORT = process.env.PORT || 4002; 

    // server is up and listening to any upcomming request
    app.listen(3000, () => console.log('Servidor levantado en 3000')); 


    // testing request - 'Hello world' means we are ready to go!
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!')
    }); 
    ```

- We run the server using the previously created nodemon shortcut: `$ npm run dev`
</details>

<details>
  <summary>5. MySQL Workbench</summary>

- We open the workbench and run the following commands:

    ```sql
    CREATE DATABASE <project_name>;
    USE <project_name>;
    ```
</details>

<details>
  <summary>6. MIGRATIONS & MODELS</summary>

- Creating MIGRATIONS [Data Definition Language (DDL): with typeorm]: `./src/database/migrations`
- Adding them to `DataSource.migrations` in the `db.ts` file: `Role, User, Service, Appointment`
- Creating MODELS (entities) [Data Manipulation Language (DML)]
- Adding them to `DataSource.entities` in the `db.ts` file: `Roles, Users, Services, Appointments`
</details>

<details>
  <summary>7. CONTROLLERS</summary>

- We create controllers (in a folder on the same level with `package.json`): 
    > `auth, roles, users, services, appointments`
</details>

<details>
  <summary>8. ROUTES</summary>

- We create routes (in `app.ts`) for CRUD (create, read, update and delete) database records.
</details>

<details>
  <summary>9. MIDDLEWARE: auth()</summary>
  
  - Additionally we need to control access to our data. We will use 'middleware' functions.

  -  `Auth` (authorisation systembased on TOKENs) will block anything that is not to be seen by the general public. In our case, it only does not affect to `register`, `login` and `getServices` (as those are the endpoints reachable without logging in)
  -  The `auth()` function verifies an encrypted TOKEN created automatically while logging in. With an active token we have access to other data.
</details>

<details>
  <summary>10. MIDDLEWARE: isSuperAdmin()</summary>
  
- We also want to grant special administrative access. With another middleware, the `isSuperAdmin()` function, we control PERMISSIONS.
- The 'superadmin' role would be able to reach all data, while Users would have a more limited reach. More levels can be implemented
</details>

<details>
  <summary>11. TOKENDATA</summary>

- For the TOKEN to work, we create a new file `./types/index.d.ts` with the following lines:

    ```js
    export type tokenData = {
        userId: number;
        roleName: string;
    };

    declare global {
        namespace Express {
            export interface Request {
                tokenData: tokenData;
            }
        }
    }
    ```
</details>

<details>
  <summary>12. SEEDERS</summary>

- In order to check out this project, you'll need to ppopulate the database.

- Follow steps 5 and 6 of the <a href="#instalation-local">instalation</a>
</details>


## Deployment
The project is deployed here:
*PENDING DEPLOYMENT*

You can use this route for all the endpoints.


## Author
<div align="center">
<a href = "mailto:a.sergiotorres@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://github.com/SergioTorresGarcia" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a> 
</div>