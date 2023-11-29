import React, { useEffect, useState } from "react";

function Chat({ socket }) {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("receive_message", updateData);

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

  const sendMessage = () => {
    socket.emit("send_message", { message: text });
  };

  return (
    <div>
      <input
        placeholder="enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={sendMessage}>Submit</button>
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
}

export default Chat;
