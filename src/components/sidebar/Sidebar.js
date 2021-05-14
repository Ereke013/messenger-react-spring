import React from "react";
import "./Sidebar.css";
import SidebarRow from "./sidebarRow/SidebarRow";
import {
  EmojiFlags,
  People,
  Chat,
} from "@material-ui/icons";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

// import { useStateValue } from "../../state/Provider";

function Sidebar(props) {
  // const [{ user }, dispatch] = useStateValue();
  const { auth, logout, errorHandler } = props;
  console.log("user h: ", auth);
  return (
    <div className="card" style={{width:"100%", height:"100%"}}>
        <div className="card-body">
            <SidebarRow
                src={auth.user.ava}
                title={auth.user.fullName}
                to="/profile"
            />
            <SidebarRow Icon={AccountCircleIcon} title="Profile" to="/profile" />
            <SidebarRow Icon={EmojiFlags} title="News" to="" />
            <SidebarRow Icon={People} title="Friends" to="/friends" />
            <SidebarRow Icon={Chat} title="Messages" to="/messages" />
            <SidebarRow Icon={ThumbUpIcon} title="Likes" to="/likes" />
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};
export default connect(mapStateToProps)(Sidebar);
