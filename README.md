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
