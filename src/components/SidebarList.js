import { CircularProgress } from "@material-ui/core";
import SidebarListItem from "./SidebarListItem";
import "./SidebarList.css";

export default function SidebarList({ title, data }) {
  if (!data) {
    return (
    <div className="loader__container sidebar__loader">
      <CircularProgress />
      </div>
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
