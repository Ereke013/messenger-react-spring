import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarRow.css";
import { Link } from "react-router-dom";
import {useRouteMatch} from "react-router";

function SidebarRow({ src, title, Icon, to }) {
    let {path, url}=useRouteMatch();
    // const currentPage = localStorage.getItem("currentPage");
    // let current = (to===currentPage)?"current":"";
    // console.log("currentPage: " + currentPage);
  return (
    <div>
      <Link to={`${url}${to}`} style={{textDecoration:"none"}}>
        {/*<div className={`sidebarRow ${(to===currentPage)?"current":""}`}>*/}
        <div className="sidebarRow">
          {src && <Avatar src={src} />}
          {Icon && <Icon />}
          <h4>{title}</h4>
        </div>
      </Link>
    </div>
  );
}

export default SidebarRow;
