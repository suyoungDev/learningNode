const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html')
})

app.post('/', (req, res) => {
  let height = Number(req.body.height) / 100;
  let weight = Number(req.body.weight);
  let result = (weight / (height * height)).toFixed(2);
  let comment;
  if (result <= 18.5){
    comment = '저체중';
  } else if (result <= 23) {
    comment = '정상';
  } else if (result <= 30) {
    comment = '비만';
  } else {
    comment = '고도비만';
  }
  res.send(`당신의 BMI는 ${result}% 입니다. ${comment}입니다.`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})