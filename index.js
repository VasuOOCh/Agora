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
    apiKey: 'API key', // Enter your API key
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
    password : "password" //Enter your password of MySQL server
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


    

    // try{
    //     connection.query(q,(err,result)=>{
    //         if(err) throw err;
    //         // console.log(result);
    //         res.render("user.ejs", {userCredits,result,message,msgId})
    //         // console.log(message);
    //     })
    // } catch(err) {
    //     res.send(err);
    // }
    toggleMsg = true;
// })

app.get("/register",(req,res)=>{
    res.render("admin_red.ejs");
})

app.post("/register", (req,res)=>{
    let compId = uuid().slice(0,8);
    // console.log(compId);
    companyId = compId;

    let q1 = `INSERT INTO loginData VALUES ("${compId}", "${req.body.company}", "${req.body.email}", "${req.body.password}");`
    compName = req.body.company;

    connection.query(q1,(err,result)=>{
        if(err) throw err;
        console.log(result);
        // res.redirect("/admin");
    })

    let q2 = `CREATE TABLE comp${compId} (id varchar(100) PRIMARY KEY,question varchar(500),opt1 varchar(100),opt2 varchar(100),opt3 varchar(100),opt4 varchar(100),opt1value int,opt2value int,opt3value int,opt4value int,company varchar(100), compId varchar(100))`

    connection.query(q2,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.redirect(`/admin/${compId}`)
    })

})

app.get("/about",(req,res)=>{
    res.render("about.ejs");
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs");
})

app.get("/admin/:compId",async (req,res)=>{

    // let q = `SELECT * FROM comp${companyId}`;
    let compId = req.params.compId;
    // let compName = 'a';
    // console.log(compId1);

    let q = `SELECT company from logindata WHERE id="${compId}"`
    // connection.query(q,(err,result)=>{
    //     compName = result[0].company
    // });


    const compName = await new Promise((resolve, reject) => {
        connection.query(q, (err, result) => {
            if (err) reject(err);
            resolve(result[0].company);
        });
    });

    // console.log(compName);

    let q1 = `SELECT * FROM comp${compId}`;

    try{
        connection.query(q1,(err,result)=>{
            if(err) throw err;
            // console.log(result);
            res.render("admin.ejs", {result, compName, compId,helpMsg});
            if(helpMsg != "" || helpMsg != " ") {
                helpMsg = "";
            }
        })
    } catch(err) {
        res.send(err);
    }

    
    

    
})



app.listen(3000,(req,res)=>{
    console.log("Port started at 3000");
    // console.log(uuid());
})
