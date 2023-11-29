import React, { useEffect, useState } from "react";

const Room = ({ socket }) => {
  const [room, setRoom] = useState("1");
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("join_room", { room });

    socket.on("receive_message_room", updateData);

    socket.on("emit_success", updateData);
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", enterSubmit);

    return () => {
      window.removeEventListener("keypress", enterSubmit);
    };
  });

  const updateData = (data) => {
    setData((prev) => [...prev, data]);
    setText("");
  };

  const enterSubmit = (event) => {
    if (event.code === "Enter") {
      sendMessage();
    }
  };

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessage = () => {
    socket.emit("send_message_room", { room, message: text });
  };

  return (
    <div>
      <div>
        <input
          placeholder="enter room number"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />

        <button onClick={joinRoom}>Join</button>
      </div>
      <div>
        <input
          placeholder="enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={sendMessage}>Submit</button>
      </div>
      <div
        style={{
          width: "400px",
          minHeight: "500px",
          border: "1px solid blue",
          margin: "20px auto",
        }}
      >
        {data.map((item) => {
          return (
            <div
              key={item.message}
              style={{ textAlign: item.id === socket.id ? "right" : "left" }}
            >
              {item.message}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Room;
