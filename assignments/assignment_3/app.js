const express=require("express");
const faker = require("faker");
var bodyParser = require('body-parser')
const app=express();

var users=[]
for (let x=0;x<=5;x++){
    users.push({
        name:faker.name.findName(),
        email: faker.internet.email()
    })
}

app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
    // console.log(users)
    res.render('index',{users})
})

app.get('/form',(req,res)=>{
    res.render('form')
})

app.post('/user/add',(req,res)=>{
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("Server is listening")
});