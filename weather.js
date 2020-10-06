const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/weather.html");

});

app.post("/", function (req, res){
    // console.log("Post Recieved")
    // console.log(req.body.cityName)

    const query = req.body.cityName;
    const apiKey = "9521708361c49a1c03f287c6e783f274";
    const units = "imperial";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey +"&units=" + units ;

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function (data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            // console.log(temp);
            // console.log(weatherData);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


            // console.log(weatherDescription);
            res.write("<p>The Weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The Temperature in " + query + " is " + temp + " Degrees.</h1>");
            res.write("<image src=" + imageUrl +">");
            res.send()
        })
    })

});

  
    










app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})