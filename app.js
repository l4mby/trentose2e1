const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.listen(app.get('port'), () => {
   console.log("Node server listening on port " + app.get('port'));
});
