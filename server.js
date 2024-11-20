const express =require('express');
const app=express();
const mysql=require('mysql2');
const dotenv=require('dotenv');

app.use(express.json());
dotenv.config();

const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
});

db.connect((err)=>{
    if (err) return console.log('Error connecting to My SQL' );
    console.log('connection found',db.threadId)
});


// question 1
app.get('/patients',(req,res)=>{
    db.query('SELECT patient_id,first_name,last_name,date_of_birth FROM patients',(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error');
        }else{
            res.render('patients',{results:results});
        }
    })
})
//question 2
app.get('/providers',(req,res)=>{
    db.query('SELECT first_name,last_name,provider_specialty FROM providers',(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error');
        }else{
            res.render('providers',{results:results});
        }
    })
})
//question 3
app.get('/patients',(req,res)=>{
    db.query('SELECT first_name FROM patients',(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error');
        }else{
            res.render('patients',{results:results});
        }
    })
})
//question 4
app.get('/providers',(req,res)=>{
    db.query('SELECT provider_specialty FROM providers',(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error');
        }else{
            res.render('providers',{results:results});
        }
    })
});   

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})