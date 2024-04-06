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
    apiKey: 'APIKEY', // fill your api key 
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
    password : "password" // type your mysql workbench password
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

//from here

app.delete("/delete/:compId/:id", (req,res)=>{
    let id = req.params.id;

    // res.send("Delete")

    let q = `DELETE FROM comp${req.params.compId} WHERE id = "${id}"`;

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect(`/admin/${req.params.compId}`);
        })
    } catch(err) {
        res.send(err);
    }
})

app.post("/submit/:compId/:id", (req,res)=>{
    userCredits += 10;
    console.log(req.params);
    let id = req.params.id;
    let answer = req.body[`ans${id}`];

    let q = `UPDATE comp${req.params.compId}
    SET ${answer}value = ${answer}value + 1
    WHERE id  = "${id}";`

    try{
        connection.query(q, (err,result) =>{
            if(err) throw err;
            console.log(result);
            res.redirect("/user")
        })
    }catch(err) {
        res.send(err);
    }
    // res.send("OK")
})
app.get("/new/:compId",(req,res)=>{
    let compId = req.params.compId;
    res.render("new.ejs",{compId});
})

app.post("/new/:compId", async (req,res)=>{
    let compId = req.params.compId;
    // console.log(req.body);

    let q1 = `SELECT * FROM logindata WHERE id="${compId}"`
    const compName = await new Promise((resolve, reject) => {
        connection.query(q1, (err, result) => {
            if (err) reject(err);
            console.log(result)
            resolve(result[0].company);
        });
    });


    let q = `INSERT INTO comp${compId} VALUES ('${uuid()}','${req.body.question}','${req.body.opt1}','${req.body.opt2}','${req.body.opt3}','${req.body.opt4}', 0,0,0,0, "${compName}", "${compId}")`

    // const compName = await new Promise((resolve, reject) => {
    //     connection.query(q, (err, result) => {
    //         if (err) reject(err);
    //         resolve(result[0].company);
    //     });
    // });

    connection.query(q, (err,result)=>{
        if(err) throw err;
        // console.log(result);

        res.redirect(`/admin/${compId}`);
    })


    
})



app.post("/help/:compId", (req,res)=>{
    let msg = req.body.help;

    try{
        answer(`${msg}`).then((resp)=>{
            helpMsg = resp;
    
            res.redirect(`/admin/${req.params.compId}`);
        })
    } catch{
        res.send("Servers are too busy ! You may try again later")
    }
    
   
})

app.post("/ans/:compId/:id", (req,res)=>{
    let id = req.params.id;
    let compId = req.params.compId;
    let q1 = `SELECT question,id from comp${compId}`;

    try{
        connection.query(q1,(err,result1)=>{
            if(err) throw err;
            // let question = result1[0].question;
    
            answer(`Explain the question : ${result1[0].question} in simple terms`).then((resp)=>{
    
                message = resp;
                msgId = result1[0].id;
                // console.log(message);
                res.redirect("/user");
            })
    
        })
    }
    catch{
        res.send("Servers are too busy, you may try again later")
    }
    
    
})

app.get("/login", (req,res)=>{
    res.render("login.ejs");
})

app.post("/login",(req,res)=>{
    let isValid = false;
    let email = req.body.email;
    let pass = req.body.password;

    let q = `SELECT * FROM logindata`

    connection.query(q, (err,result)=>{
        if(err) throw err;
        for(let i=0;i<result.length;i++) {
            if(result[i].email === email) {
                    if(result[i].pass === pass) {
                        isValid = true;
                        res.redirect(`admin/${result[i].id}`);
                    }
            }
        }
        if(isValid == false) {
            res.send("Wrong credentials");
        }
        
        
    })

    // res.send("Authorised");
})



app.get("/credit",(req,res)=>{
    res.render("credits.ejs", {userCredits})
})

app.listen(3000,(req,res)=>{
    console.log("Port started at 3000");
    // console.log(uuid());
})
