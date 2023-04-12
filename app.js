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

app.route('/articles')

.get(async function(req,res){

    //Two ways to find an data in database - promises and async and await:

    // Article.find({}).then(function(articles){
    //     console.log(articles)
    // })

    const articles = await Article.find({})
    // const  data= await articles.json();
   res.send(articles)
})

.post(async (req,res)=>{
    console.log(req.body.title);
    console.log(req.body.contant)
  
   const newArticle = new Article({
      title:req.body.title,
      Contant:req.body.contant
   })
  
   try{
     await newArticle.save()
     res.send('Successfully Created')
   }catch{
      res.send('Failed to add')
   }
  
  })

  .delete(async (req,res)=>{
    try{
        await Article.deleteMany()
        res.send('Successfully Deleted');
    }catch{
        res.send('faild to delete')
    }
})

app.route('/articles/:customArticle')

.get((req,res)=>{
    const customArticle = req.params.customArticle;
   Article.findOne({title:customArticle}).then((article)=>{
      if(article){
        res.send(article)
      }
   })
})

.put((req,res)=>{
   Article.replaceOne(
    {title:req.params.customArticle},
    {title:req.body.title,
    Contant:req.body.contant}
   ).then((response)=>{
    res.send(response)
   })
})

.patch((req,res)=>{
    // console.log(req.body)
    Article.updateOne(
         {title:req.params.customArticle}
        ,{$set:req.body}
        ).then((result)=>{
            res.send(result)
        })
})

.delete((req,res)=>{
    Article.deleteOgtine({title:req.params.customArticle}).then((result)=>{
        res.send(result)
    })
})

app.get('/',(req,res)=>{
    res.send('HAI');
})


app.listen(3000,function(){
    console.log('Server starts at 3000')
})