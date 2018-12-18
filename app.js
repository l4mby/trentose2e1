const express = require('express');
const bodyParser = require('body-parser');
// const uuidv4 = require('uuidv4');
const app = express();

let db = [
{
   assignmentID: "1",
   workerID: "1",
   taskID: "1",
   assignmentResult: {mark: 30}
},
{
   assignmentID: "2",
   workerID: "1",
   taskID: "2",
   assignmentResult: {mark: 20}
}
];

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

app.get('/', (req, res) => {
   res.send("Welcome!");
});

app.get('/assignments', (req, res) => {
   const id = req.query.workerID;
   let retrievedList = [];
   if(id){
      for(let i = 0; i < db.length; i++){
         if(db[i].workerID == id)
            retrievedList.push(db[i]);
      }
      res.status(200).send(JSON.stringify(retrievedList));
   }else
      res.status(404).end(JSON.stringify({code: 404, message: "Id not found"}));
});

app.post('/assignments', (req, res) => {
   const body = req.body;
   if(body){
      let valid = true;
      for(let i = 0; i < db.length && valid; i++){
         if(db[i].assignmentID == body.assignmentID)
            valid = false;
      }
      if(valid){
         db.push(body)
         res.status(201).send(JSON.stringify(body));
      }else{
         res.status(400).end(JSON.stringify({code: 400, message: "Bad Request"}));
      }
   }else
      res.status(400).end(JSON.stringify({code: 400, message: "Bad Request"}));
});

app.get('/assignments/:assignmentID', (req, res) => {
   const assignmentID = req.params.assignmentID;
   let retval = null;
   if(assignmentID){
      let found = false;
      for(let i = 0; i < db.length && !found; i++){
         if(db[i].assignmentID == assignmentID){
            retval = JSON.parse(JSON.stringify(db[i]));
            found = true;
         }
      }
      if(found){
         res.status(200).send(JSON.stringify(retval));
      }else{
         res.status(404).end(JSON.stringify({code: 404, message: "Id not found"}));
      }
   }else
      res.status(404).end(JSON.stringify({code: 404, message: "Id not found"}));
});

app.put('/assignments/:assignmentID', (req, res) => {
   const assignmentID = req.params.assignmentID;
   const body = req.body;
   let retval = null;
   if(assignmentID && body){
      let modified = false;
      for(let i = 0; i < db.length && !found; i++){
         if(db[i].assignmentID == assignmentID && body.assignmentID == assignmentID){
            db[i] = JSON.parse(JSON.stringify(body));
            retval = JSON.parse(JSON.stringify(db[i]));
            modified = true;
         }
      }
      if(modified)
         res.status(202).send(JSON.stringify(retval));
      else
         res.status(409).end(JSON.stringify({code: 409, message: "Conflict can't update"}));
   }else
      res.status(404).end(JSON.stringify({code: 409, message: "Conflict can't update"}));
});

app.delete('/assignments/:assignmentID', (req, res) => {
   const assignmentID = req.params.assignmentID;
   let retval = null;
   if(assignmentID){
      let found = false;
      for(let i = 0; i < db.length && !found; i++){
         if(db[i].assignmentID == assignmentID){
            retval = JSON.parse(JSON.stringify(db[i]));
            db.splice(i, 1);
            found = true;
         }
      }
      if(found)
         res.status(204).send(JSON.stringify(retval));
      else
         res.status(404).end(JSON.stringify({code: 404, message: "Id not found"}));
   }else
      res.status(404).end(JSON.stringify({code: 404, message: "Id not found"}));
});

let server = app.listen(app.get('port'), () => {
   console.log("Node server listening on port " + app.get('port'));
});

module.exports = {app: app,
                  server: server};