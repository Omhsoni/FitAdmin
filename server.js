const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js")

const {supabase} = require('./config') // supabase instance

const URL = "mongodb://127.0.0.1:27017/FitAdmin";

main().then( () => {
    console.log("Server connected to database.");
})
.catch((err) => {
    console.log(err)
});

async function main() {
    await mongoose.connect(URL);
}

app.get("/", (req,res) => {
    res.send("This is root of FitAdmin");
});

app.listen(4080, () =>{
    console.log("server is ready and listening");
});


async function getData() {
    try {
      const { data, error } = await supabase
        .from('Gyms')
        .select('*');
  
      if (error) {
        throw error;
      }
  
      console.log('Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  getData();