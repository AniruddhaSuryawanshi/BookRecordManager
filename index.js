const express = require("express");
const {users} = require("./data/users.json");

const app = express();

const PORT = 8081;

app.use(express.json());

// const data = ["Aniruddha", "dev"];
app.get("/",(req, res)=>{
    res.status(200).json({
        message:"server is up",
    });
});

app.get('/users',(req, res)=>{
res.status(200).json({
    success: true,
    data: users
})
})


app.get("*",(req,res)=>{
    res.status(400).json({
        message:"doesnt exist",
    });
});

app.listen(PORT, ()=>{
console.log(`server at port ${PORT}`);
});