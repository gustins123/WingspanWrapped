import React, { useState, useEffect, useRef } from "react";
import PointBreakdownChart from "./PointBreakdownChart";
import logo from './assets/images/Wingspan.png';
import bgImage from './assets/images/watercolor-blue.webp';
import arrow from './assets/svg/arrow_down.svg';


const WingspanWrappedDisplay = ({ stats }) => {

  const [hue, setHue] = useState(0); // Track hue value
  const [scrollY, setScrollY] = useState(0);
  const divRef = useRef(null); // Reference to the div

  // Update scroll position when the div is scrolled
  const handleScroll = () => {
    if (divRef.current) {
      setScrollY(divRef.current.scrollTop); // Get scroll position of the div
    }
  };

  // Calculate hue value based on scroll position
  const calculateHue = () => {
    const divHeight = divRef.current.scrollHeight - divRef.current.clientHeight; // Total scrollable height
    const scrollPercent = scrollY / divHeight; // Percentage of how far the user has scrolled
    const hue = scrollPercent * 360; // Map scroll percentage to hue value (0 to 360)
    setHue(hue);
  };

  useEffect(() => {
    const divElement = divRef.current;
    divElement.addEventListener("scroll", handleScroll); // Listen to scroll event
    calculateHue();

    return () => {
      divElement.removeEventListener("scroll", handleScroll); // Cleanup
    };
  }, [scrollY]);

  const data = [
    { gameId: 1, playerName: 'John', birds: 10, bonusCards: 2, goals: 3, eggs: 5, foodOnCards: 3, tuckedCards: 1, totalPoints: 75, place: 1 },
    { gameId: 2, playerName: 'Sarah', birds: 8, bonusCards: 3, goals: 2, eggs: 6, foodOnCards: 4, tuckedCards: 2, totalPoints: 65, place: 2 },
    { gameId: 3, playerName: 'Mike', birds: 12, bonusCards: 1, goals: 4, eggs: 7, foodOnCards: 2, tuckedCards: 0, totalPoints: 80, place: 1 },
    { gameId: 4, playerName: 'Alice', birds: 9, bonusCards: 2, goals: 3, eggs: 8, foodOnCards: 3, tuckedCards: 1, totalPoints: 70, place: 3 },
    { gameId: 5, playerName: 'Bob', birds: 11, bonusCards: 4, goals: 2, eggs: 6, foodOnCards: 5, tuckedCards: 3, totalPoints: 85, place: 1 },
  ];
  

  const customLabels = [
    "Eggs",
    "Birds",
    "Bonus Cards",
    "End-of-Round Goals",
    "Food on Cards",
    "Tucked Cards",
  ];

  //console.log("hue:",hue);
  //console.log("scroll:",scrollY); 
  return (
    <div ref={divRef} className= "h-screen bg-custom-bg bg-cover bg-center  w-screen overflow-y-auto overflow-x-hidden snap-mandatory snap-y scroll-smooth hide-scrollbar transition-all duration-300"
    style={{
      backgroundImage: `url(${bgImage})`,
      filter: `hue-rotate(${hue}deg)`, // Apply dynamic hue rotation
    }}
    >
      <div className="h-screen w-screen snap-center flex justify-between flex-col items-center">
        <img src={logo} alt="wingspan logo" className="mx-auto mb-4"/>
        <img className="animate-bounce h-20 mb-10" src={arrow} alt="arrow" />
      </div>
      

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">You like to play wingspan, dont you?</p> 
        <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >You played <span className="font-bold">{stats.playerGames}</span> games this year. You're in the top <span className="font-bold">{stats.topPercent}%</span></p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">Bonus cards isnt your thing but they still contributed for <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.breakdown.bonusCardPercentage}%</span> of your score</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">End of year is coming but it means a good thing for you because you on average got <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.averageRoundPoints}</span> end of round points.</p>
          <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Your best score was <span className="font-bold">{stats.maxRoundPoints}</span></p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">
        Egg-cellent work! You laid a total of <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.totalEggs}</span> eggs this year. Thats <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.averageEggs}</span> per game.</p>
          <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Your high score was <span className="font-bold">{stats.maxEggs}</span></p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >You've got a knack for secrecy! You tucked <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.totalTuckedCards}</span> cards this year, hiding away some secret strategies. No one saw that coming!</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >Talk about a showstopper! Your best game was an absolute masterpiece with <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.maxPoints}</span> points. That’s your highest score yet. Way to go!</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >You finished in 1st place <span className="font-bold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.winCount}</span> times this year. Clearly, you’re a top contender every time you play!</p>
        <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Your winrate is  <span className="font-bold">{stats.winrate}</span>%</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-around flex-col items-center text-white text-center p-5">
        <div className="pt-10">
          <table className="min-w-full bg-gray-200 bg-opacity-30 text-gray-700 border-collapse" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
            <tbody>
              <tr className="font-bold" >
                <td colSpan="2" className="px-1 py-1 border-b border-r border-gray-700">{stats.playerName.toUpperCase()}</td>
                <td className="px-1 py-1 w-1/6 border-b border-r border-gray-700">Average</td>
                <td className="px-1 py-1 w-1/6 border-b border-r border-gray-700">Max</td>
                <td className="px-1 py-1 w-1/6 border-b border-gray-700">Total</td>
              </tr>
              <tr>
                <td rowSpan="3" className="px-1 py-1 w-1/6 transform rotate-[-90deg] font-bold border-r border-b border-gray-700">AMOUNT ON CARDS</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">Birds</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageBirdPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxBirdPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalBirdPoints}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Bonus cards</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageBonusPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxBonusPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalBonusPoints}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">End-of-round Goals</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageRoundPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxRoundPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalRoundPoints}</td>
              </tr>
              <tr>
                <td rowSpan="3" className="px-1 py-1 transform rotate-[-90deg] font-bold border-r border-gray-700">1 POINT EACH</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">Eggs</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageEggs}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxEggs}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalEggs}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Food on cards</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageFoodOnCards}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxFoodOnCards}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalFoodOnCards}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Tucked cards</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageTuckedCards}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxTuckedCards}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalTuckedCards}</td>
              </tr>
              <tr>
                <td colSpan="2" className="px-1 py-1 font-bold border-t border-r border-gray-700">Total Points</td>
                <td className="px-1 py-1 border-t border-r border-gray-700">{stats.averagePoints}</td>
                <td className="px-1 py-1 border-t border-r border-gray-700">{stats.maxPoints}</td>
                <td className="px-1 py-1 border-t border-gray-700">{stats.totalPoints}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <PointBreakdownChart breakdown={stats.breakdown} customLabels={customLabels} width={window.innerWidth}/>
      </div>
    </div>
  );
};

export default WingspanWrappedDisplay;

