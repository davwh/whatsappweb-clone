import React from "react";
import { useState } from "react";
import { Avatar } from "@material-ui/core";
import { ExitToApp, SearchOutlined } from "@material-ui/icons";
import {auth} from "../firebase";
import "./Sidebar.css";
import SidebarList from "./SidebarList";
import useUsers from "../hooks/useUsers";
import DonutLargeOutlinedIcon from '@material-ui/icons/DonutLargeOutlined';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import MessageIcon from '@material-ui/icons/Message';


export default function Sidebar({user}) {
  const users = useUsers(user);

  //Filter users
  const [name, setName] = useState('');
  // The search result
  const [foundUsers, setFoundUsers] = useState(users);
  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = users.filter((found) => {
        return found.name.toLowerCase().startsWith(keyword.toLowerCase());
        //toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers("");
      //If the text field is empty, show all users
    }
    setName(keyword);
  };


  // Sign Out function
  function signOut(){  
   auth.signOut();
  }
  // Prevent page refresh
  const handleSubmit = event => {
    event.preventDefault();  };


  return <div className="sidebar">
    <div className="sidebar__header">
      <div className="sidebar__header--left">
        <Avatar src={user?.photoURL}/> 
        <h4>{user?.displayName}</h4>
      </div>

      <div className="sidebar__header--right">   
      <DonutLargeOutlinedIcon stlye={{backgroundColor:'transparent'}}></DonutLargeOutlinedIcon>
      <MessageIcon></MessageIcon>   
      <ExitToApp className="exit" onClick={signOut} />
      </div>
    </div>


    <div className="sidebar__search">
      <form onSubmit={handleSubmit} className="sidebar__search--container">
      <SearchOutlined/>
      <input id="search" type="search" value={name} onChange={filter} className="input" placeholder="Search User"
      />
      </form>   
       <div className="filter">
        <FilterListOutlinedIcon></FilterListOutlinedIcon>
      </div>
    </div>
    
    {foundUsers && foundUsers.length > 0 ? (
      foundUsers.map((user) => (
      <div key={user.id}></div>
      ))
      ) : (
      <SidebarList title="" data={users} />
      )}

    <SidebarList title="" data={foundUsers} />
  
  </div>

  
;}