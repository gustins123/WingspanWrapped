import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import WingspanWrappedDisplay from "./WingspanWrappedDisplay";
import { calculateData } from "./CalculateData";
import { fetchStats } from "./fetchStats";

const App = () => {
  const [playerStats, setPlayerStats] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats("e/2PACX-1vQGfvyxf9fngSudzlUIpxUkqQfuc7jvd2s0P6QXDEq9BmC1KvLI8dFk57n6Q5daZDlvH6KoY6vYcbGb");
        setPlayerStats(data);
      } catch {
        setError("Failed to fetch stats.");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const handleNameSubmit = () => {
    if (playerStats) {
      // Calculate stats and breakdown
      const calculatedStats = calculateData(playerStats, playerName);
      setStats(calculatedStats);
      console.log(calculatedStats);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (stats != null) return (
    <div>
      {/* Other components and logic */}
      {stats && <WingspanWrappedDisplay stats={stats}/>}
    </div>
  );

  return <InputForm playerName={playerName} setPlayerName={setPlayerName} onSubmit={handleNameSubmit} />;
};

export default App;
