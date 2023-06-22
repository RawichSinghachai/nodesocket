const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 4000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require("./src/routes/routes"));

httpServer.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`);
});
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

//                        socket.io

const io = new Server(httpServer,{
  cors:{
    origin: "*"
  }
})

io.on("connection", (socket) => {
  

  socket.on('chat', (message)=>{
    console.log(`message : ${message}`);

    io.emit('chat',message)

  })

});