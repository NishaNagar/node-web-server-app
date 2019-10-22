const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '/n',(err)=>{
        if(err){
            console.log('unable to append to server.log');
        }

    });
next();
});
// app.use((req,res,next)=>{
//     res.render('maintanance.hbs');
// })
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear()
});
hbs.registerHelper('screamIT',(text)=>{
return text.toUpperCase();
})
app.get('/',(req,res)=>{
// res.send('<h1>Hello Express</h1>');
// res.send({
//     name:'Andrew',
//     likes:['Biking','Cities']
// });
res.render('home.hbs',{
    pageTitle:'Home page',
    // currentYear:new Date().getFullYear(),
    welcomeMessage:'Welcome to our site'
})
})
app.get('/about',(req,res)=>{
    // res.send('About page');
    res.render('about.hbs',{
        pageTitle:'About page',
        // currentYear:new Date().getFullYear()
    });
})
app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
pageTitle:'Projects'
    });
})
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'unable to handle request'
    })
})
app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});