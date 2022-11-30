import SidebarListItem from "./SidebarListItem";
import "./SidebarList.css";

export default function SidebarList({ title, data }) {
  if (!data) { 
    return (
      null      
      );
    }
    
    return (
    <div className="sidebar__chat--container">
      <h2>{title}</h2>
      {data.map((item) => (
      <SidebarListItem key={item.id} item={item} />
      ))}
      </div>
      );
    }
