import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import { connect, Schema, model } from 'mongoose';

const app = express();


app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('Public'));

//seting Up mongoDb database:

connect('mongodb://localhost:27017/restDb');

const articleSchema= new Schema({
    title:'String',
    Contant:'String'
})

const Article = model('article',articleSchema);


app.get('/',(req,res)=>{
    res.send('HAI');
})


app.get('/articles',async function(req,res){

    //Two ways to find an data in database - promises and async and await:

    // Article.find({}).then(function(articles){
    //     console.log(articles)
    // })

    const articles = await Article.find({})
    // const  data= await articles.json();
//    res.send(articles)
})







app.listen(3000,function(){
    console.log('Server starts at 3000')
})