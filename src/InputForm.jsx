import React from "react";

const InputForm = ({ playerName, setPlayerName, onSubmit }) => (
  <div className="flex justify-center items-center h-screen w-screen">
    <div className="text-center">
      <input
        type="text"
        className="border rounded px-4 py-2 mb-4 w-64"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Fly Away!
      </button>
    </div>
  </div>
);

export default InputForm;
