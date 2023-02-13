const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();


// const{createPool}=require('mysql');
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"userscrud",
    connectionLimit:10

});
// router.get('/', (req, res) => {
// pool.query('select * from user ',(err,result,fields)=> {
//     if(!err){
//         res.send(result)
//     }
//     else{
//         console.log(err)
//     }
// });
// })
connection.connect(function(error){
    if(!!error)
        console.log(error);             
    
    else 
        console.log('Database connected!!');
});


//set views file
// app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req,res) => {
    // res.send('CRUD WITH NODEJs/Express/MySql',)
    let sql = 'SELECT * FROM user';
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        res.render('user_index',{
            title:'BECOME A MEMBER IN A WINK!!',
            user:rows
    });
    
    });
});

app.get('/add', (req,res) => {
    res.render('user_add',{
        title:'BECOME A MEMBER IN A WINK!!',
    });
});
app.post('/save', (req,res) => {
    let data = {firstName: req.body.firstName, lastName: req.body.lastName,email: req.body.email, passWord: req.body.passWord};
    let sql = "INSERT INTO user SET ?";
    let query = connection.query('sql', data,(err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

// app.get('/edit/:user_id', (req,res) => {
//     const user_id = req.params.user_id;
//     let sql = `SELECT * FROM user where email = ${email}`;
//     let query = connection.query(sql,(err,result) => {
//         if(err) throw err;
//         res.render('user_edit',{
//             title:'BECOME A MEMBER IN A WINK!!',
//             user:result[0]
//         });
//     });
// });

//server listening
app.listen(5000)
    console.log('Server is running at port 5000');