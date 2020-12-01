const express = require('express');
const https = require('https');

const app = express();

app.get('/', function(req, res){
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=Incheon&appid=02e441a38cd4dea2f66af42e94f8dc29&units=metric';

  https.get(url, function(response){
    console.log(response);
  })
})

app.listen(3000, function(){
  console.log('server is running on port 3000');
})