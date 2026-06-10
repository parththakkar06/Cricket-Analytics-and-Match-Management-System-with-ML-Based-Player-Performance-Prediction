const config = require("./config/config")
const express = require("express")
const mongoose = require("mongoose");
// const {Server} = require("socket.io")
// const http = require("http")
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//------------------scoket io for MATCH SCORE BOARD------------------

// const  server =  http.createServer(app)
// const io = new Server(server,{
//     cors:{
//         origin:"http://localhost:5173",
//         methods:["GET","POST"]
//     }
// })
// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Join a specific match room
//     socket.on('join_match', (matchId) => {
//         socket.join(matchId);
//         console.log(`User ${socket.id} joined match room ${matchId}`);
//     });

//     // Leave a match room
//     socket.on('leave_match', (matchId) => {
//         socket.leave(matchId);
//         console.log(`User ${socket.id} left match room ${matchId}`);
//     });

//     // Handle score updates
//     socket.on('update_score', (data) => {
//         const { matchId, scoreData } = data;
//         // Broadcast the update to all clients in the match room
//         io.to(matchId).emit('score_updated', scoreData);
//         console.log(`Score updated for match ${matchId}`);
//     });

//     // Handle disconnect
//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });





// ---------------------------------router connection ------------------------------------------------------

//--------------------user router conncetion---------------------
const userrouter = require('../src/router/UserRouter')
app.use('/user',userrouter)

//--------------------role router conncetion---------------------

const rolerouter = require('../src/router/RoleRouter')
app.use('/role',rolerouter)

//-------------user profile -------------------------------------

const userprofilerouter = require('../src/router/UserProfileRouter')
app.use('/userprofile',userprofilerouter)

//-----------------user score------------------------------------

const userscorerouter = require('../src/router/UserScoreRouter')
app.use('/userscore',userscorerouter)


//---------tournamet router------------------

const tournamentrouter = require('../src/router/TournamentRouter')
app.use('/tournament',tournamentrouter)

//-------tournament ground router --------------------------------

const tourgroundrouter = require('../src/router/TournamentGroundRouter')
app.use('/tourground',tourgroundrouter)

//------------ team router---------------------------------------

const teamrouter = require('../src/router/TeamRouter')
app.use('/team',teamrouter)

//------------ teamplayer---------------------------------------

const teamplayerrouter = require('../src/router/TeamPlayer')
app.use('/teamplayer',teamplayerrouter)

//---------------match router --------------------------------

const matchrouter = require('../src/router/MatchRouter')
app.use('/match',matchrouter)


//------------matchplayer router---------------------------

const matchplayerrouter = require('../src/router/MatchPlayerRouter')
app.use('/matchplayer',matchplayerrouter)


//------------matchscore router---------------------------
const matchscorerouter = require('../src/router/MatchScoreRouter')
app.use('/matchscore',matchscorerouter)

const testRoute = require("./router/test");
app.use("/api/test", testRoute);  

const performanceRoute = require('./router/Performace')
app.use("/api/performance",performanceRoute)

const suggestionRoute = require("./router/suggestions");
app.use("/api/suggestions", suggestionRoute);

// ------------------data base connection ------------------------
mongoose.connect(config.DB_URL).then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.log("Error connecting to MongoDB...", err);
})




// ------------------server connetion -------------------------
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});