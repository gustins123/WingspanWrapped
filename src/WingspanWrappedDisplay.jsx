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
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">Šogad tu lidinājies daudz</p> 
        <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        ><span className="font-semibold">{stats.playerGames}</span> spēles! Tas tevi ierindo starp izredzētajiem  <span className="font-semibold">{stats.topPercent}%</span> spēlētāju</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">Bonusa kārtis varbūt nav tava galvenā stratēģija, bet pat tās palīdzēja ar  <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.breakdown.bonusCardPercentage}%</span> punktu</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">Kad pienāk raunda beigas, tu vienmēr uzspīdi. Vidēji tu savāc  <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.averageRoundPoints}</span> punktus.</p>
          <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Vienā spēlē tu pat sasniedzi <span className="font-semibold">{stats.maxRoundPoints}</span>. Iespaidīgi, vai ne?</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]">
        Olas ir tava spēles sirds un dvēsele – šogad tu izdēji <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.totalEggs}</span> olas! Tas ir <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.averageEggs}</span> olas spēlē.</p>
          <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Tavs labākais rezultāts ir <span className="font-semibold">{stats.maxEggs}</span> olas vienā spēlē!</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >Un kā ar aizliktajām kārtīm? Tu aizliki <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.totalTuckedCards}</span> kārtis, saglabājot savas stratēģijas noslēpumu līdz pēdējam brīdim. Tavi sāncenši palika mēmi!</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >Tava labākā spēle bija īsts triumfs ar <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.maxPoints}</span> punktiem. Tāds rezultāts paliks atmiņā vēl ilgi!</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-center flex-col items-center text-white text-center p-6">
        <p className="text-4xl font-semibold mb-4 [text-shadow:_0_0_9px_rgb(0_0_0_/_30%)]"
        >Tu uzvarēji <span className="font-semibold" style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}>{stats.winCount}</span> spēlēs šogad, pierādot, ka ar tevi sacensties nav viegli.</p>
        <p className="text-3xl mt-4 bg-auto bg-center bg-opacity-10 [text-shadow:_0_0_5px_rgb(0_0_0_/_30%)]"
        style={{ backgroundImage: 'url(https://wingspan.rulepop.com/media/brush-teal-long.webp)', backgroundSize: '100% 100%' }}
        >Tavs uzvaru procents ir <span className="font-semibold">{stats.winrate}</span>%</p>
      </div>

      <div className="h-screen w-screen snap-center flex justify-around flex-col items-center text-white text-center p-5">
        <div className="pt-10">
          <table className="min-w-full bg-gray-200 bg-opacity-30 text-gray-700 border-collapse" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
            <tbody>
              <tr className="font-semibold" >
                <td colSpan="2" className="px-1 py-1 border-b border-r border-gray-700">{stats.playerName.toUpperCase()}</td>
                <td className="px-1 py-1 w-1/6 border-b border-r border-gray-700">Vidējais</td>
                <td className="px-1 py-1 w-1/6 border-b border-r border-gray-700">Max</td>
                <td className="px-1 py-1 w-1/6 border-b border-gray-700">Kopā</td>
              </tr>
              <tr>
                <td rowSpan="3" className="px-1 py-1 w-1/6 transform rotate-[-90deg] font-semibold border-r border-b border-gray-700">PUNKTU DAUDZUMS, KURŠ NORĀDĪTS UZ</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">Putnu kārtīm</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageBirdPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxBirdPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalBirdPoints}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Bonusu kārtīm</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageBonusPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxBonusPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalBonusPoints}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Raunda beigu mērķiem</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageRoundPoints}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxRoundPoints}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalRoundPoints}</td>
              </tr>
              <tr>
                <td rowSpan="3" className="px-1 py-1 transform rotate-[-90deg] font-semibold border-r border-gray-700">1 PUNKTS PAR KATRU</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">Olu</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageEggs}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxEggs}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalEggs}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Ēdiena žetonu uz kārtīm</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageFoodOnCards}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxFoodOnCards}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalFoodOnCards}</td>
              </tr>
              <tr>
                <td className="px-1 py-1 border-b border-r border-gray-700">Aizlikto kārti</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.averageTuckedCards}</td>
                <td className="px-1 py-1 border-b border-r border-gray-700">{stats.maxTuckedCards}</td>
                <td className="px-1 py-1 border-b border-gray-700">{stats.totalTuckedCards}</td>
              </tr>
              <tr>
                <td colSpan="2" className="px-1 py-1 font-semibold border-t border-r border-gray-700">KOPĒJIE PUNKTI</td>
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

