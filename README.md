# AGORA 

Below is the documentation for using agora analytics on localhost PC

## Pre-requisites

### Must needed downloads
1) [NodeJS](https://nodejs.org/en/download)
2) [MySQL community server](https://dev.mysql.com/downloads/mysql/)
3) [MySQL workbench](https://dev.mysql.com/downloads/workbench/)

(Make sure to add the path of MySQL bin folder)

### Setting up MySQL
Open Mysql workbench and lighten the following code lines on by one

```terminal
create database agora;

use agora;

create table loginData(
	id varchar(100) PRIMARY KEY,
    company varchar(100),
    email varchar(100),
    pass varchar(100)
);
```

## Installation

Open a new folder and type the following commands in terminal window for cloning the Agora project and setting up the dependencies

```terminal
git init
git clone https://github.com/VasuOOCh/Agora.git
npm install
```
Make sure to update the following changes in index.js file

```javascript
const anthropic = new Anthropic({
    apiKey: 'Enter your API key here', // Enter your Claude AI key
    });
```
[Get your Claude AI API here](https://www.anthropic.com/api)
```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agora',
    password : "password"  //Enter your MySQL server password
  });
```

## How to start the web-app
```terminal
node index.js
```

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Tech (dependencies) used : 
1) @anthropic-ai/sdk": "^0.19.0"
2) ejs: "^3.1.9"
3) express: "^4.19.1"
4) method-override: "^3.0.0"
5) mysql2: "^3.9.2"
6) uuidv4: "^6.2.13"
## Interface of the Web
### HOME PAGE
<img width="960" alt="Screenshot 2023-04-16 153839" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/homepage.png">

## ABOUT PAGE
<img width="960" alt="Screenshot 2023-04-16 153918" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/about1.png">
<img width="960" alt="Screenshot 2023-04-16 153945" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/about2.png">

## CONTACT US PAGE
<img width="960" alt="Screenshot 2023-04-16 154002" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/contactpage.png">

## REGISTRATION PAGE
<img width="960" alt="Screenshot 2023-04-16 154025" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/register.png">

## LOGIN PAGE
<img width="960" alt="Screenshot 2023-04-16 154002" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/login.png">

## USER PAGE
<img width="960" alt="Screenshot 2023-04-16 154002" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/user.jpeg">

## ADMIN PAGE
<img width="960" alt="Screenshot 2023-04-16 154002" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/admin_page.png">

## CREDIT SCORE PAGE
<img width="960" alt="Screenshot 2023-04-16 154025" src="https://github.com/VasuOOCh/Agora/blob/main/screenshot_of_web/creditpage.png">
