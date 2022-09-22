import { useState } from "react";
import moment from "moment";
import './App.css';

function App() {

  const [fields, setFields] = useState({ messages: [], message: '' });

  return (
    <div className="App">
      <div className="container">
        <div className="chat-container">
          {fields.messages.map((msg, index) => (
            <div className={msg.type === 'sent' ? "message sender" : "message receiver"} key={index}>
              <img className="avatar" src="https://placeimg.com/50/50/people?1" />
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
                let temp = [{ type: 'sent', message: fields.message, datetime: new Date() }, ...fields.messages];
                setFields({ messages: temp, message: '' });
              }
            }} />
          <button type="submit">Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
