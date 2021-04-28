const { MongoClient } = require("mongodb");                        
const url = "mongodb+srv://YuliaKitan:tnv333@petadoption.lszzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url, { useUnifiedTopology: true });
 
 const dbName = "main";
                      
 async function run() {
 }