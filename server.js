const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
  
const app = express();


dotenv.config()
app.use(express.json())

app.get('/', (req,res) =>{
    res.send('Welcome')
})
app.post('/posts' , authenticate , (req,res ) =>{
        jwt.verify(req.token, process.env.jWtsercretkey , (err, data) =>{
            if(err){
                res.send('bhuwan')
            }  else{
                res.send('Success')
            }
        }  )
})
app.post('/login' ,(req,res) =>{
    const user = {
        id:10,
        username: "Messi",
        email:" messibarca@gmail.com"
    }
   const token =  jwt.sign({user} , process.env.jWtsercretkey , {expiresIn: '86400s' })
   res.json(token)
})
//middleware
function authenticate ( req,res ,next) {
    const authHeader = req.headers['authorization']
     if ( authHeader !== 'undefined'){
          const token = authHeader && authHeader.split(' ')[1]
            req.token = token
     }
   
}
app.listen(3000)