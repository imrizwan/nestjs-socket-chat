import { useState, useEffect } from "react";
import moment from "moment";
import io from 'socket.io-client';
import './App.css';
const socket = io('http://172.16.25.31:4000');
function App() {

  const colors = ["#e74c3c", "#8e44ad", "#3498db", "#2ecc71", "#c0392b", "#7d3c98", "#2980b9", "#27ae60"];

  const [fields, setFields] = useState({ messages: [], message: '', name: '', nameDisabled: false, color: '' });
  const [isConnected, setIsConnected] = useState(socket.connected);

  const createNotification = (message) => {
    const notification = new Notification(message.name, {
      body: message.message,
      icon: `https://ui-avatars.com/api/?name=${message.name}&background=${message.color}&color=fff`
    });
    notification.onclick = () => {
      window.focus();
    }
  }

  function notifyMe() {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      // const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  }



  useEffect(() => {
    notifyMe();
    let name = localStorage.getItem('name');
    let color = localStorage.getItem('color');
    let isDisabled = name ? true : false;
    name = name ? name : '';
    color = color ? color : '';
    setFields({ ...fields, nameDisabled: isDisabled, name, color });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on("message", async (arg1) => {
      try {
        let temp = [arg1, ...fields.messages];
        createNotification(arg1);
        setFields({ ...fields, messages: temp });
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
      socket.emit('message', msg, (data) => { console.log(data) });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      <div className="center">
        <div>
          <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
        </div>
        Name: <input
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
                let color = colors[Math.floor(Math.random() * colors.length)];
                localStorage.setItem('name', fields.name);
                localStorage.setItem('color', color);
                localStorage.setItem('nameDisabled', true);
                setFields({ ...fields, nameDisabled: true, color });
              }
            }
          }} />
      </div>
      <div className="container">
        <div className="chat-container">
          {fields.messages.map((msg, index) => (
            <div className={msg.name === fields.name ? "message receiver" : "message sender"} key={index}>
              <div id="container" style={{ background: msg.color }}>
                <div id="name">
                  {msg.name ? msg.name.split('').slice(0, 1) : ''}
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
            disabled={!isConnected}
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
                  let msg = { type: 'sent', message: fields.message, datetime: new Date(), name: fields.name, color: fields.color };
                  console.log("msg", msg)
                  let temp = [msg, ...fields.messages];
                  setFields({ ...fields, messages: temp, message: '' });
                  sendMessage(msg);
                }
              }
            }} />
          <button type="submit">Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
