import { useState, useEffect } from "react";
import moment from "moment";
import io from 'socket.io-client';
import './App.css';
const socket = io('http://localhost:4000');
function App() {

  const senderColors = ["#e74c3c", "#8e44ad", "#3498db", "#2ecc71"];
  const receiverColors = ["#c0392b", "#7d3c98", "#2980b9", "#27ae60"];

  const [fields, setFields] = useState({ messages: [], message: '', name: '', nameDisabled: false, senderColor: senderColors[Math.floor(Math.random() * senderColors.length)], receiverColor: receiverColors[Math.floor(Math.random() * receiverColors.length)] });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    let name = localStorage.getItem('name');
    let isDisabled = name ? true : false;
    name = name ? name : '';
    setFields({ ...fields, nameDisabled: isDisabled, name });
  }, []);

  useEffect(() => {
    socket.io.on("connection", (error) => {
      // ...
    });
    socket.on('connect', () => {
      console.log('Connected');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on("message", async (arg1) => {
      try {
        console.log("listening", arg1); // 1
      } catch (e) {
        console.log(e);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  });

  const sendMessage = (msg) => {
    try {
      socket.emit('message', msg, (data) => console.log(data));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="center">
        <input
          disabled={fields.nameDisabled}
          placeholder="Your message"
          value={fields.name}
          type="text"
          onChange={(e) => {
            setFields({ ...fields, name: e.target.value });
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              if (fields.name.length < 3) {
                alert('Name must be at least 3 characters long');
              } else {
                localStorage.setItem('name', fields.name);
                localStorage.setItem('nameDisabled', true);
                setFields({ ...fields, nameDisabled: true });
              }
            }
          }} />
      </div>
      <div className="container">
        <div className="chat-container">
          {fields.messages.map((msg, index) => (
            <div className={msg.type === 'sent' ? "message sender" : "message receiver"} key={index}>
              <div id="container" style={{ background: msg.type === 'sent' ? fields.senderColor : fields.receiverColor }}>
                <div id="name">
                  {fields.name ? fields.name.split('').slice(0, 1) : ''}
                </div>
              </div>
              {/* <img className="avatar" alt="profile" src="https://placeimg.com/50/50/people?1" /> */}
              <div className="datetime">{moment(msg.datetime).format('DD/MM/YYYY hh:mm A')}</div>
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="send-message-form">

          <input
            placeholder="Your message"
            value={fields.message}
            type="text"
            onChange={(e) => {
              setFields({ ...fields, message: e.target.value });
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (!fields.name) {
                  return alert("Please enter your name");
                } else {
                  let msg = { type: 'sent', message: fields.message, datetime: new Date() };
                  let temp = [msg, ...fields.messages];
                  sendMessage(msg);
                  setFields({ ...fields, messages: temp, message: '' });
                }
              }
            }} />
          <button type="submit">Send</button>
        </div>
      </div>

      {/* <div>
        <p>Connected: {'' + isConnected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <button onClick={sendMessage}>Send ping</button>
      </div> */}
    </div>
  );
}

export default App;
