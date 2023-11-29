import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import "./App.css";
import Chat from "./components/chat";
import Room from "./components/room";

const socket = io("http://localhost:8080");

const TABS = ["chat", "room"];

function App() {
  const [activeTab, setActiveTab] = useState(TABS[1]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect");
    });
  }, []);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        {TABS.map((tab) => {
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: tab === activeTab ? "green" : "grey",
                fontSize: 30,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
      {activeTab === TABS[0] && <Chat socket={socket} />}
      {activeTab === TABS[1] && <Room socket={socket} />}
    </div>
  );
}

export default App;
