const mongoose= require('mongoose');

const mongoURL='mongodb://localhost:27017/hotels'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

const db =mongoose.connection;
db.on('connected',()=>{
    console.log('connected to server');
})
db.on('error',()=>{
    console.log('connection error to server');
})
db.on('disconnected',()=>{
    console.log('disconnected to server');
})

module.exports={
    db
}