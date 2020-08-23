const expressTest = require("express");
const https = require("https");
const app = expressTest();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.listen(process.env.PORT ||3000,function(){
  console.log("server started on 3000");
})
app.get("/",function(req,res){
  //res.send("wiki app in progress");
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const search = req.body.search;
  console.log(search);
  url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+search+"&limit=10&namespace=0&format=json";
  //url="https://en.wikipedia.org/w/api.php?action=query&format=json&list=allpages&apfrom="+search+"";
  https.get(url,function(response){
    console.log(response.statusCode);
    if(response.statusCode===200)
    {
    response.on("data",function(data){
    //  console.log(data);
     const ad=JSON.parse(data);
     const bc = JSON.stringify(ad);
     console.log(ad);
    // console.log(ad[3]);
    const wikidatatitle = ad[1];
     const wikidata = ad[3];
     console.log(wikidata);
     //var len=ad.query.allpages.length;
    // res.write("<body style=background-color:a2de96;></body>");
    res.write("<body style=background-color:Yellow>")

     for (i=0;i<10;i++){
      //  console.log(ad.query.allpages[i].pageid);
      //  console.log(ad.query.allpages[i].title);
      //  const pageid = ad.query.allpages[i].pageid;
      //  console.log("https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids="+pageid+"&inprop=url");
      //  res.write(ad.query.allpages[i].title);
      //  res.write("\n");
      //  res.write("https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids="+pageid+"&inprop=url");
      res.write("\n");
      //res.write("<body style=background-color:green>")
      res.write("<p style=background-color:a2de96;>"+wikidatatitle[i]+"</p>");
      res.write("\n");
      res.write("<a href="+wikidata[i]+">"+wikidata[i]+"</a>");
      res.write("\n");
      //res.write("</body>")
     }
      res.end();
    })
  }
  else
  {
    response.redirect("/");
  }
})
})




//9cf775e01538687ce13d60480c7a2e13c93827c7
