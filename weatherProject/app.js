const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { report } = require('process');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = '02e441a38cd4dea2f66af42e94f8dc29';
  const unit = 'metric';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}&lang=kr`;

  https.get(url, (response)=>{
    console.log( 'https에러코드: ' + response.statusCode); // http 에러코드 

    response.on('data', (data)=>{
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      res.write(`<h1>오늘의 ${query} 날씨 브리핑</h1>`);
      res.write(`<img src='${weatherIconUrl}'><p>`)
      res.write('<p>오늘의 하늘은 ' + weatherDescription + '<p>');
      res.write('오늘의 기온은 섭씨 ' + temp + '도'); // 한글쓰면 깨지는 이유는?!
      res.send();
    })
  })
})


app.listen(3000, ()=>{
  console.log(`port 3000`);
})

