import express from 'express';
import dotenv from 'dotenv'
import connectDB from './database/connect';
import app from './app';
dotenv.config();



const Port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
})})
.catch((error)=>{
    console.log('mongoDb connection failed', error)
})