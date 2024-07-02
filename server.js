import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from 'dotenv';
import router from './router/route.js';
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 8080


app.use('/api', router)

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("db connected...")
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
    try{
        res.json("get request...")
    }catch(error){
        res.json(error)
    }
})

app.listen(port, () => {
    console.log(`server runnin on port ${port}`)
})