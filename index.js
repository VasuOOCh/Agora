const express = require('express')
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const mysql = require('mysql2');
const { uuid } = require('uuidv4');
const Anthropic = require('@anthropic-ai/sdk');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

let userCredits = 0;
let message = "";
let msgId = "";
let helpMsg = "";
const anthropic = new Anthropic({
    apiKey: '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', // This is the default and can be omitted
    });

async function answer(ques) {
    const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: ques }],
    model: 'claude-3-opus-20240229',
});

// console.log(message.content[0].text)
return message.content[0].text;
    
}


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agora',
    password : "@Harshit0511"
  });

app.get("/",(req,res)=>{
    res.render("index.ejs")
})



app.get("/user", async (req, res) => {
    try {
        let result = [];

        let q1 = `SELECT id,company FROM loginData`;

        const result1 = await new Promise((resolve, reject) => {
            connection.query(q1, (err1, result1) => {
                if (err1) reject(err1);
                resolve(result1);
            });
        });

        // console.log(result1);

        for (let i = 0; i < result1.length; i++) {
            let q2 = `SELECT * FROM comp${result1[i].id}`;
            const result2 = await new Promise((resolve, reject) => {
                connection.query(q2, (err2, result2) => {
                    if (err2) reject(err2);
                    resolve(result2);
                });
            });
            // console.log(result2)
            result2.forEach(res => {
                result.push(res);
            });
        }

        // console.log(result);
        res.render("user.ejs", { userCredits, message, msgId, result });
    } catch (error) {
        // Handle errors
        console.error(error);
    }
});

// harshgit