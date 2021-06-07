const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];



app.post("/messages", function (req, res) {
  messages.push(req.body)
  return res.sendStatus(200)
  
});

app.get("/messages:id", function (request, response) {
  const id =parseInt(request.params.id)
  const messages = messages.find((m) => m.id === id)
  if (messages) {
    res.send(messages)
  }else{
    response.sendStatus(400)
  }
});


app.delete('/messages/:id', function (req,res){
  const id =parseInt(request.params.id)
  const messageIndex = messages.findIndex((m) => m.id === id)

  if (messageIndex!==-1){
   messages.splice(messageIndex, 1)
   res.sendStatus(200) 
  }else {
    res.sendStatus(400)
  }

});


app.get('/message/search',(req,res)=>{
  const textQuery = req.query.text//
  const matches = messages.filter((m)=>m.text.includes(textQuery))

  if (matches.length) {
    res.send(matches)
  }else{
    response.sendStatus(400)
  }

  
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
