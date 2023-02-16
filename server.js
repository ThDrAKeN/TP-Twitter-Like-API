const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

if (process.env.NODE_ENV !== 'production') require('dotenv').config()



const userRouter = require('./routes/api/users');
const tweetRouter = require('./routes/api/tweet');
const retweetRouter = require('./routes/api/retweet');

app.use('/users', userRouter);
app.use('/tweet', tweetRouter);
app.use('/retweet', retweetRouter);




const PORT = process.env.PORT || 6000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
