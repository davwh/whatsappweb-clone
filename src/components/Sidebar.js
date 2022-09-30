import React from "react";
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
      <input placeholder="Search user" id="search" type="text" />
      </form>
      <div className="filter">
        <FilterListOutlinedIcon></FilterListOutlinedIcon>
      </div>
    </div>

    {/*Sidebar filled with users in the database */}
    <SidebarList title="" data={users} />
  
  </div>

;}