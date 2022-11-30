import "./Chat.css";
import React from "react";
import { useEffect, useRef } from 'react'
import { useHistory, useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import useChatMessages from "../hooks/useChatMessages";
import ChatMessages from "./ChatMessages";
import ChatFooter from "./ChatFooter";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { ArrowBack, MoreVert } from "@material-ui/icons";
import { createTimestamp, db } from "../firebase";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ScrollableFeed from 'react-scrollable-feed';


export default function Chat({ user, page }) {
  const [input, setInput] = React.useState("");
  const [isDeleting, setDeleting] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null);
  const { roomId } = useParams();
  const history = useHistory();
  const messages = useChatMessages(roomId);
  const room = useRoom(roomId, user.uid);
  const messagesEndRef = useRef(null); 


  //To scroll the view for each new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView()
  }, 
  [messages]
  )

  function onChange(event) {
    setInput(event.target.value);
  }

  async function sendMessage(event) {
    event.preventDefault();
    
    if (input.trim() || (input === "")) {
      setInput("");   
      const newMessage = 
             {
            name: user.displayName,
            message: input,
            uid: user.uid,
            timestamp: createTimestamp(),
            time: new Date().toUTCString(),
          };

          db.collection("users")
          .doc(user.uid)
          .collection("chats")
          .doc(roomId)
          .set({
            name: room.name,
            timestamp: createTimestamp(),
          });

       await db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add(newMessage);
    }
  }


  async function deleteRoom() {
    setOpenMenu(false);
    setDeleting(true);

    try {
      const roomRef = db.collection("rooms").doc(roomId);
      const roomMessages = await roomRef.collection("messages").get();
      await Promise.all([
        ...roomMessages.docs.map((doc) => doc.ref.delete()),
        db
          .collection("users")
          .doc(user.uid)
          .collection("chats")
          .doc(roomId)
          .delete(),
        roomRef.delete(),
      ]);
    } catch (error) {
      console.error("Error deleting room: ", error.message);
    } finally {
      setDeleting(false);
      page.isMobile ? history.goBack() : history.replace("");
    }
  }

  return (
    <div className="chat">
      <div style={{ height: page.height }} className="chat__background" />

      <div className="chat__header">
        {page.isMobile && (
        <IconButton onClick={history.goBack}>
          <ArrowBack />
          </IconButton>
          )}

        <div className="avatar__container">
          <Avatar src={room?.photoURL} />
        </div>

        <div className="chat__header--info">
          <h3 style={{ width: page.isMobile && page.width - 165 }}>
            {room?.name}
          </h3>
        </div>
        
        <div className="chat__header--right">
            <div className="chat__header--right--icons">
              <SearchOutlinedIcon className="searchicon-right" ></SearchOutlinedIcon>
              <MoreVert className="verticaldots-right" onClick={(event) => setOpenMenu(event.currentTarget)}/>
            </div>
                
            <Menu
              id="menu"
              anchorEl={openMenu}
              open={Boolean(openMenu)}
              onClose={() => setOpenMenu(null)}
              keepMounted
              >
              <MenuItem onClick={deleteRoom}>Delete Room</MenuItem>
            </Menu>
        </div>
      </div>
      

      <div className="chat__body--container" style={{ height: "500px" }}>
        <ScrollableFeed>
        <div className="chat__body" style={{ height: "500px"}}>
          <ChatMessages
            messages={messages}
            user={user}
            roomId={roomId}
          />
            {/* To scroll the view for each new message*/}
           <div ref={messagesEndRef}><br /></div>
        </div>
        </ScrollableFeed>
      </div>
       
      <ChatFooter
        input={input}
        onChange={onChange}
        sendMessage={sendMessage}
        user={user}
        room={room}
        roomId={roomId}
      />

      {/* Icona di caricamento di quando elimina chat */}
      {isDeleting && (
      <div className="chat__deleting">
        <CircularProgress />
        </div>)} 

  </div>

  );
}
