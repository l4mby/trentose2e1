const app = require('./app').app;
const server = require('./app').server;
const fetch = require('node-fetch');
const SERVER_URL = process.env.SERVER_URL || ('http://localhost:' + 3000);

let testPost = {
   assignmentID: "5",
   workerID: "3",
   taskID: "4",
   assignmentResult: {mark: 31}
}
let testGet1 = {
   assignmentID: "1",
   workerID: "1",
   taskID: "1",
   assignmentResult: {mark: 30}
};
let testGet2 = {
   assignmentID: "2",
   workerID: "1",
   taskID: "2",
   assignmentResult: {mark: 20}
};

const postAssignment = function(toAssign){
   return fetch(SERVER_URL + '/assignments', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(toAssign)
   });
};

const getAssignmentList = function(){
   return fetch(SERVER_URL + '/assignments?workerID=1', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      }
   });
};

afterAll(() => {
   server.close();
});

test('GET /assignments correct test', () => {
   return getAssignmentList()
      .then(res => {
         expect(res.status).toBe(200);
         return res.json();
      })
      .then(jres => {
         expect(jres).toContainEqual(testGet1);
         expect(jres).toContainEqual(testGet2);
      })
      .catch(e => console.log(e));
});

test('POST /assignments correct test', () => {
   return postAssignment(testPost)
      .then(res => {
         expect(res.status).toBe(201);
         return res.json();
      })
      .then(jres => {
         expect(jres).toMatchObject(testPost);
      })
      .catch(e => console.log(e));
});