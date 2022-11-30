import React from "react";
import "./ChatFooter.css";
import SendIcon from '@material-ui/icons/Send';
import MoodIcon from '@material-ui/icons/Mood';
import AttachmentIcon from '@material-ui/icons/Attachment';
import {Send} from "@material-ui/icons";


export default function ChatFooter({
  input,
  onChange,
  sendMessage,
}) 

{
  const [isTyping] = React.useState(false);
  const inputRef = React.useRef();
  const btnIcons = (
  <>
    <Send
    style={{
    width: 20,
    height: 20,
    color: "white",
    }}
    />

    <SendIcon
    style={{
    width: 28,
    height: 28,
    color: "rgba(84,101,111,255)",
    }}
    />
    </>
    );


  return (
  <div className="chat__footer">

    {/* Emoticon Icon */}
    <MoodIcon 
    style={{ color: 'rgba(84,101,111,255)' }}> 
    </MoodIcon>
    
    <AttachmentIcon style = {{transform: 'rotate(140deg)' , width: '50', color: 'rgba(84,101,111,255)'}} />

    
    <form>
      <input
      ref={inputRef}
      value={input}
      onChange={!isTyping ? onChange : null}
      placeholder="Type a message"
      />

      <button
        onClick={
        input.trim() || (input === "")
        ? sendMessage
        : false
        }
        type="submit"
        className="send__btn"
        >
        {btnIcons}
      </button>
    </form>

  </div>
  );
}
