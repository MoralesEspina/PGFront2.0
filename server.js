let express = require('express');
let app = express();

app.use(express.static(__dirname+'/dist/front'));

app.get('/*', (req, res)=>{
  res.sendFile(__dirname+'/dist/front/index.html');
});

app.listen(process.env.PORT || 4200);
