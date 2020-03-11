const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT ||1337;
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app =  express();
app.use( express.json());
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true ,  useUnifiedTopology: true });

app.get('/',(req, res)=>{
    res.json({
        message:'Hello World!'
    })
})

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api/logs' , logs)
app.use( middlewares.notFound);
app.use( middlewares.errorHandler);

app.use(morgan('common'));
app.use(helmet());
app.listen(port , ()=>{
    console.log(`Server is running at ${port}`)
})