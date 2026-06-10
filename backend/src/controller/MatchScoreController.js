const matchscoremodel = require('../models/MatchScoreModel')
const mongoose = require('mongoose');  // Add this line at the top


//----------------- ----------------- match score create  api =--------------------------------------


const creatematchscore = async (req, res) => {
    try{

        const matchscore = await matchscoremodel.create(req.body)
        res.status(201).json({
            message: "matchscore created successfully.....",
            data: matchscore
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            message: "internal server error"
        })
    }
}

//----------------- ----------------- get all match score  api =--------------------------------------

const getallmatchscore = async (req, res) => {
    try{

        const matchscore = await matchscoremodel.find()
        res.status(200).json({
            message: "all match score data",
            data: matchscore
        })
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}

//----------------- ----------------- get match score by id  api =--------------------------------------
const getmatchscorebyid = async (req, res) => {
    try{

        const matchscore = await matchscoremodel.findById(req.params.id)
        res.status(200).json({
            message: "match score data",
            data: matchscore
        })
    }catch(err){
        res.status(500).json({
            message: "internal server error"
        })
    }
}
//--get match score suumay by match id

const getmatchscorebymatchid = async (req, res) => {
    try{
        const matchId = req.params.matchId;
        const matchscore = await matchscoremodel.find({ matchId: matchId });
        res.status(200).json({
            message: "Match score data",
            data: matchscore
        });
    }catch(err){
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};










// getmatchscore by userId

const getmatchscorebyuserid = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Find all match scores where user was a batsman
        const battingScores = await matchscoremodel.find({ batsmanId: userId });
        
        // Find all match scores where user was a bowler
        const bowlingScores = await matchscoremodel.find({ bowlerId: userId });
        
        // Collect all unique matchIds using a Set
        const matchesPlayed = new Set();
        
        // Add batting matches
        battingScores.forEach(score => {
            matchesPlayed.add(score.matchId.toString());
        });
        
        // Calculate total statistics
        let totalRuns = 0;
        let totalSixes = 0;
        let totalFours = 0;
        let total50s = 0;
        let total100s = 0;

        // Initialize statistics by batType
        const statsByBatType = {};

        // Only process scores where batsmanId exists
        battingScores.forEach(score => {
            if (score.batType) {
                totalRuns += Number(score.batType || 0);
                totalSixes += Number(score.batType==6?1:0 || 0);
                totalFours += Number(score.batType==4?1:0 || 0);

                // Count 50s and 100s
                const runs = Number(score.runs || 0);
                if (runs >= 100) {
                    total100s += 1;
                } else if (runs >= 50) {
                    total50s += 1;
                }

                const batType = String(score.batType || 'Unknown');
                
                if (!statsByBatType[batType]) {
                    statsByBatType[batType] = {
                        runs: 0,
                        sixes: 0,
                        fours: 0,
                        innings: 0,
                        fifties: 0,
                        hundreds: 0
                    };
                }

                // Update batType-wise statistics
                statsByBatType[batType].runs += Number(score.runs || 0);
                statsByBatType[batType].sixes += Number(score.sixes || 0);
                statsByBatType[batType].fours += Number(score.fours || 0);
                statsByBatType[batType].innings += 1;
            }
        });

        // Calculate bowling statistics
        let totalOvers = 0;
        let totalWickets = 0;
        let totalWides = 0;
        let totalNoBalls = 0;

        // Initialize outType statistics
        const statsByoutType = {};

        // Process bowling statistics
        bowlingScores.forEach(score => {
            // Update total bowling statistics
            if(score.bowlerId) {  // Changed from outPlayerId to bowlerId
                totalOvers += Number(score.bowlerId || 0);
                totalWickets += Number(score.bowlerId || 0);
                totalWides += Number(score.bowlerId || 0);
                totalNoBalls += Number(score.bowlerId || 0);

                const outType = String(score.outType || 'Unknown');  // Changed from outPlayerId to outType
                
                if (!statsByoutType[outType]) {
                    statsByoutType[outType] = {
                        overs: 0,
                        wickets: 0,
                        wides: 0,
                        noBalls: 0,
                        innings: 0
                    };
                }

                // Update outType-wise statistics
                statsByoutType[outType].overs += Number(score.overs || 0);
                statsByoutType[outType].wickets += Number(score.wickets || 0);
                statsByoutType[outType].wides += Number(score.wides || 0);
                statsByoutType[outType].noBalls += Number(score.noBalls || 0);
                statsByoutType[outType].innings += 1;
            }
        });

        // Update the response JSON
        res.status(200).json({
            message: "Player statistics",
            data: {
                totalMatches: matchesPlayed.size,
                batting: {
                    totalRuns,
                    totalSixes,
                    totalFours,
                    total50s,
                    total100s,
                    battingInnings: battingScores.length,
                    battingStatsByType: statsByBatType,
                },
                bowling: {
                    totalOvers,
                    totalWickets,
                    totalWides,
                    totalNoBalls,
                
                    bowlingInnings: bowlingScores.length,
                },
                
                battingDetails: battingScores,
                bowlingDetails: bowlingScores
            }
        });
        // console.log("bowling ...",bowling)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};




// Get tournament details for logged-in user
const getUserTournaments = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        // Validate if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid User ID format"
            });
        }
        
        // Find all matches where user participated
        const battingMatches = await matchscoremodel.find({ batsmanId: userId })
            .populate({
                path: 'matchId',
                populate: {
                    path: 'tournamentId'
                }
            });
            
        const bowlingMatches = await matchscoremodel.find({ bowlerId: userId })
            .populate({
                path: 'matchId',
                populate: {
                    path: 'tournamentId'
                }
            });

        // Get unique tournaments
        const tournaments = new Set();
        
        battingMatches.forEach(match => {
            if (match.matchId && match.matchId.tournamentId) {
                tournaments.add(JSON.stringify(match.matchId.tournamentId));
            }
        });
        
        bowlingMatches.forEach(match => {
            if (match.matchId && match.matchId.tournamentId) {
                tournaments.add(JSON.stringify(match.matchId.tournamentId));
            }
        });

        const uniqueTournaments = Array.from(tournaments).map(t => JSON.parse(t));

        res.status(200).json({
            message: "User tournament details",
            data: {
                totalTournaments: tournaments.size,
                tournaments: uniqueTournaments
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


// Get team details for logged-in user
const getUserTeams = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                message: "Invalid User ID"
            });
        }
        
        // Find all matches where user participated
        const battingMatches = await matchscoremodel.find({ batsmanId: userId })
            .populate({
                path: 'matchId',
                populate: [
                    { path: 'team1Id' },
                    { path: 'team2Id' }
                ]
            });
            
        const bowlingMatches = await matchscoremodel.find({ bowlerId: userId })
            .populate({
                path: 'matchId',
                populate: [
                    { path: 'team1Id' },
                    { path: 'team2Id' }
                ]
            });

        // Get unique teams
        const teams = new Set();
        
        battingMatches.forEach(match => {
            if (match.matchId) {
                if (match.matchId.team1Id) {
                    teams.add(JSON.stringify(match.matchId.team1Id));
                }
                if (match.matchId.team2Id) {
                    teams.add(JSON.stringify(match.matchId.team2Id));
                }
            }
        });
        
        bowlingMatches.forEach(match => {
            if (match.matchId) {
                if (match.matchId.team1Id) {
                    teams.add(JSON.stringify(match.matchId.team1Id));
                }
                if (match.matchId.team2Id) {
                    teams.add(JSON.stringify(match.matchId.team2Id));
                }
            }
        });

        const uniqueTeams = Array.from(teams).map(t => JSON.parse(t));

        res.status(200).json({
            message: "User team details",
            data: {
                totalTeams: teams.size,
                teams: uniqueTeams
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};


// Add to module exports
module.exports = {
    creatematchscore,
    getallmatchscore,
    getmatchscorebyid,
    getmatchscorebyuserid,
    getUserTournaments,
    getUserTeams,
    getmatchscorebymatchid
}