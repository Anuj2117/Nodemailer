import express from "express";
import nodemailer from "nodemailer";
// import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app=express();
const port=8000;

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,

    }
});

app.post('/submit' , (req,res)=>{
    const {name , email , message}=req.body;

    const mailOptions={
        from : email ,
        to : process.env.EMAIL_USER , 
        subject :"New Contact Form Submission" , 
        text : `Name: ${name}\nEmail: ${email}\n Message: ${message}`,
    }

    transporter.sendMail(mailOptions , (error, info)=>{
        if(error){
            console.error('Error sending email ', error);
            res.status(500).send('Error sending email')
        }
        else{
            console.log('Email sent : ' , info.response)
            res.send('Email sent successfully')
        }
    });
})

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})