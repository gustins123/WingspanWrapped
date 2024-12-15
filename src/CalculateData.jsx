import React from "react";

export const calculateData = (data, name) => {
    // Calculate games played
    const playerName = name.toLowerCase(); 
    const gameCounts = calculateGamesPlayed(data);
    const playerGames = gameCounts[playerName] || 0;
    const playerData = data.filter((stat) => stat["Player Name"]?.toLowerCase() === playerName.toLowerCase());

    if(!playerData || playerData.length === 0){
        return null;
    }
    // Percentile rank
    const topPercent = calculatePercentileRank(gameCounts, playerName);

    // Calculate total and average points
    const totalPoints = playerData.reduce((sum, entry) => sum + Number(entry["Total Points"] || 0), 0);
    const maxPoints = playerData.reduce((max, entry) => {
        const points = Number(entry["Total Points"] || 0);
        return points > max ? points : max;
      }, 0);
    var averagePoints = playerGames > 0 ? totalPoints / playerGames : 0;
    averagePoints = Math.round(averagePoints * 100) / 100; 

    // Calculate total and average eggs placed
    const totalEggs = playerData.reduce((sum, entry) => sum + Number(entry["Eggs"] || 0), 0);
    const maxEggs = playerData.reduce((max, entry) => {
        const points = Number(entry["Eggs"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageEggs = playerGames > 0 ? totalEggs / playerGames : 0;
    averageEggs = Math.round(averageEggs * 100) / 100;

    // Calculate total and average Bird points
    const totalBirdPoints = playerData.reduce((sum, entry) => sum + Number(entry["Birds"] || 0), 0);
    const maxBirdPoints = playerData.reduce((max, entry) => {
        const points = Number(entry["Birds"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageBirdPoints = playerGames > 0 ? totalBirdPoints / playerGames : 0;
    averageBirdPoints = Math.round(averageBirdPoints * 100) / 100;

    // Calculate total and average bonus cards
    const totalBonusPoints = playerData.reduce((sum, entry) => sum + Number(entry["Bonus Cards"] || 0), 0);
    const maxBonusPoints = playerData.reduce((max, entry) => {
        const points = Number(entry["Bonus Cards"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageBonusPoints = playerGames > 0 ? totalBonusPoints / playerGames : 0;
    averageBonusPoints = Math.round(averageBonusPoints * 100) / 100;

    // Calculate total and average End-of-round goals
    const totalRoundPoints = playerData.reduce((sum, entry) => sum + Number(entry["End-of-Round Goals"] || 0), 0);
    const maxRoundPoints = playerData.reduce((max, entry) => {
        const points = Number(entry["End-of-Round Goals"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageRoundPoints = playerGames > 0 ? totalRoundPoints / playerGames : 0;
    averageRoundPoints = Math.round(averageRoundPoints * 100) / 100;

    // Calculate total and average Tucked Cards
    const totalTuckedCards = playerData.reduce((sum, entry) => sum + Number(entry["Tucked Cards"] || 0), 0);
    const maxTuckedCards = playerData.reduce((max, entry) => {
        const points = Number(entry["Tucked Cards"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageTuckedCards = playerGames > 0 ? totalTuckedCards / playerGames : 0;
    averageTuckedCards = Math.round(averageTuckedCards * 100) / 100;

    // Calculate total and average Tucked Cards
    const totalFoodOnCards = playerData.reduce((sum, entry) => sum + Number(entry["Food on Cards"] || 0), 0);
    const maxFoodOnCards = playerData.reduce((max, entry) => {
        const points = Number(entry["Food on Cards"] || 0);
        return points > max ? points : max;
      }, 0);
    var averageFoodOnCards = playerGames > 0 ? totalFoodOnCards / playerGames : 0;
    averageFoodOnCards = Math.round(averageFoodOnCards * 100) / 100;

    // Calculate 1st place count and winrate
    //console.log(playerData);
    const winCount = playerData.filter(entry => entry["Place\r"] == 1).length;
    var winrate = playerGames > 0 ? (winCount / playerGames) * 100 : 0;
    winrate = Math.round(winrate * 100) / 100;

    // Calculate percentages
    const eggsPercentage = Math.round(((totalEggs / totalPoints)*100)*100)/100;
    const birdsPercentage = Math.round(((totalBirdPoints / totalPoints)*100)*100)/100;
    const bonusCardPercentage = Math.round(((totalBonusPoints / totalPoints)*100)*100)/100;
    const endOfRoundPercentage = Math.round(((totalRoundPoints / totalPoints)*100)*100)/100;
    const foodOnCardsPercentage = Math.round(((totalFoodOnCards / totalPoints)*100)*100)/100;
    const tuckedCardsPercentage = Math.round(((totalTuckedCards / totalPoints)*100)*100)/100;

    //console.log(eggsPercentage+birdsPercentage+bonusCardPercentage+endOfRoundPercentage+foodOnCardsPercentage+tuckedCardsPercentage);

    // Return all stats in a structured object
    return {
        playerName,
        playerGames,
        topPercent,
        totalEggs,
        maxEggs,
        averageEggs,
        totalBirdPoints,
        maxBirdPoints,
        averageBirdPoints,
        totalPoints,
        maxPoints,
        averagePoints,
        totalBonusPoints,
        maxBonusPoints,
        averageBonusPoints,
        totalRoundPoints,
        maxRoundPoints,
        averageRoundPoints,
        totalTuckedCards,
        maxTuckedCards,
        averageTuckedCards,
        totalFoodOnCards,
        maxFoodOnCards,
        averageFoodOnCards,
        winCount,
        winrate,
        breakdown: {
            eggsPercentage,
            birdsPercentage,
            bonusCardPercentage,
            endOfRoundPercentage,
            foodOnCardsPercentage,
            tuckedCardsPercentage
        },
    };
    
};

function calculateGamesPlayed(data) {
    const playerGameCounts = {};
    data.forEach(entry => {
      const playerName = entry["Player Name"].toLowerCase();
      if (playerGameCounts[playerName]) {
        playerGameCounts[playerName]++;
      } else {
        playerGameCounts[playerName] = 1;
      }
    });
    return playerGameCounts;
}
function calculatePercentileRank(gameCounts, playerName) {
    const playerArray = Object.entries(gameCounts).map(([name, games]) => ({
        playerName: name,
        gamesPlayed: games,
      }));
    // Sort the array by gamesPlayed in descending order
    const sortedData = playerArray.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  
    // Find the player's rank
    const playerIndex = sortedData.findIndex(player => player.playerName === playerName);
    if (playerIndex === -1) return "Player not found";
  
    const totalPlayers = sortedData.length;
    const playersBelow = totalPlayers - (playerIndex + 1);
  
    // Calculate percentile rank
    const percentileRank = ((playersBelow + 1) / totalPlayers) * 100;
    return Math.round(100 - percentileRank); // Convert to "top X%" format
}