import React from "react";
import { Link } from "react-router-dom";
import { BsBarChart } from "react-icons/bs";
import { FiEdit3, FiSettings } from "react-icons/fi";
import { PiChatTeardropDots } from "react-icons/pi";
const MagicBox = ({}) => {
  return (
    <div className="home">
      <Link to={"/chat"}>
        <div className="app">
          <PiChatTeardropDots />
          Conversation
        </div>
      </Link>
      <Link to={"/chat"}>
        <div className="app">
          <FiEdit3 />
          Content editor
        </div>
      </Link>
      <Link to={"/accounts/settings"}>
        <div className="app">
          <FiSettings />
          Settings
        </div>
      </Link>
      <Link to="/data-analysis">
        <div className="app">
          <BsBarChart />
          Data analysis
        </div>
      </Link>
    </div>
  );
};

export default MagicBox;
