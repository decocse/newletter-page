
const express=require("express");
const bodypraser=require("body-parser");
const request =require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodypraser.urlencoded({extended:true}))


app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;
const data={
  members:[
    {
    email_address:email,
    status:"suscribed",
    merge_fields:{
      FNAME:firstname,
      LNAME:lastname
    }
  }
]
};
const jsondata=JSON.stringify(data);
const url= "https://us1.api.mailchimp.com/3.0/lists/a6b99f4c3c";
const options={
  method:"post",
  auth:"deco:d6550609e1d79db44b409d81841d74bf-us1"
}
const request=https.request(url,options,function(response){
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});
  request.write(jsondata);
  request.end();

});

app.get("/" ,function(req ,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT||3000,function(req,res){
  console.log("ok ");
});


//api key
//d6550609e1d79db44b409d81841d74bf-us1
//list // IDEA: //a6b99f4c3c
