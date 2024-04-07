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
### Interface of the Web
<img width="960" alt="Screenshot 2023-04-16 153839" src="https://github.com/VasuOOCh/Agora/blob/main/Public/images/img1.jpg">
<img width="960" alt="Screenshot 2023-04-16 153918" src="https://user-images.githubusercontent.com/112328989/232295540-02b53622-0005-428f-a19b-6e4b0370055f.png">
<img width="960" alt="Screenshot 2023-04-16 153945" src="https://user-images.githubusercontent.com/112328989/232295545-adbe7c1b-537d-4bdf-9abc-8ddb53ae5d65.png">
<img width="960" alt="Screenshot 2023-04-16 154002" src="https://user-images.githubusercontent.com/112328989/232295551-c3303a53-de61-469b-917d-4c40dbc08e8c.png">
<img width="960" alt="Screenshot 2023-04-16 154025" src="https://user-images.githubusercontent.com/112328989/232295558-799d0f82-c676-4fd4-8f48-7339dbc46105.png">
