const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'))
// public = 폴더 이름, static files를 보관함
// 홈 directory에있는 css같은 경우는 static이기에 
// public폴더안에 보관하는게 좋음

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName,lastName,email );
  // https.get(url, (response) => {
  //   response.on('data', (data) => {

  //     res.send('data is sended safely');
  //   })
  // })
})

app.listen(3000, () => {
  console.log('server is running on port 3000');
})