import React from "react";
import bgImage from './assets/images/watercolor-blue.webp';
import logo from './assets/images/Wingspan.png';

const InputForm = ({ playerName, setPlayerName, onSubmit }) => (
  <div className="flex justify-center items-center h-screen w-screen bg-custom-bg bg-cover bg-center">
    <div className="text-center">
      <img src={logo} alt="wingspan logo" className="mx-auto mb-4"/>
      <input
        type="text"
        className="border rounded px-4 py-2 mb-4 w-64"
        placeholder="Ieraksti savu vārdu"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Aiziet!
      </button>
    </div>
  </div>
);

export default InputForm;
