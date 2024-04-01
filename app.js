const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("https")
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/",function(req,res){

  const name = req.body.name;
  const email = req.body.email;


  const data = {
    members : [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:name
        }
      }
    ]
  };

  const dataJson = JSON.stringify(data);


  const url = "https://us22.api.mailchimp.com/3.0/lists/41c8c531eb"
  const Option = {
    method:"POST",
    auth:"mazhar1305:8d80ffd35bb66b87b53fcadf9ae48e1f-us22"
  }
  
  const request = https.request(url,Option,function(response){

   if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
   }else{
    res.sendFile(__dirname + "/failure.html");
   }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  // request.write(dataJson);
  request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/");
})










app.listen(process.env.PORT || 3000,function(){
  console.log("server is started on port 3000");
});


// 8d80ffd35bb66b87b53fcadf9ae48e1f-us22
// 41c8c531eb.