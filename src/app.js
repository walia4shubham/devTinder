import express from 'express';
import 'dotenv/config';
const app = express();
const PORT = process.env.PORT || 3000;

app.use( (req, res) => {
    if(req.path  == '/s'){
 res.send('Hello, RAM!');
    }else if (req.path  == '/shu'){
 res.send('Hello, SHUIV!');
    }else{
 res.send('Hello, worldssssssss!');
    }
});
app.get('/shubham', (req, res) => {
  res.send('Hello, mF!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});