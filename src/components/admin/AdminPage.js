import React from "react";
import './AdminPage.css';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, Route, Switch} from "react-router-dom";
import {useRouteMatch} from "react-router";
import Users_Admin from "./usersAdmin/Users_Admin";
import Edit_Users_Admin from "./usersAdmin/Edit_Users_Admin";
import News_Admin from "./newsAdmin/News_Admin";
import Friends_Admin from "./friendsAdmin/Friends_Admin";
import Messages_Admin from "./messagesAdmin/Messages_Admin";

function AdminPage(){
    let {path, url} = useRouteMatch();
    return(
        <div className="admin">
            <div className="admin__header">
                <Link to="/home" style={{textDecoration:"none"}}><ArrowBackIcon /> Back to User Page</Link>
                <h3>Admin Page</h3>
            </div>
            <div className="adminpage">
                <div className="admin__leftside">
                    <div className="sidebar">
                        <Link to={`${path}/users`} style={{textDecoration:"none"}} className="admin__link">Users</Link>
                    </div>
                    <div className="sidebar">
                        <Link to={`${path}/news`} style={{textDecoration:"none"}} className="admin__link">News</Link>
                    </div>
                    <div className="sidebar">
                        <Link to={`${path}/friends`} style={{textDecoration:"none"}} className="admin__link">Friends</Link>
                    </div>
                    <div className="sidebar">
                        <Link to={`${path}/messages`} style={{textDecoration:"none"}} className="admin__link">Messages</Link>
                    </div>
                    <div className="sidebar2">
                        <Link to={`${path}/likes`} style={{textDecoration:"none"}} className="admin__link">Likes</Link>
                    </div>
                </div>
                <div className="admin__center">
                    <Switch>
                        <Route exact path={path}>
                            <h1 style={{textAlign:"center", marginTop:"10%"}}>Welcome to admin page</h1>
                        </Route>
                        <Route exact path={`${path}/users`}>
                            <Users_Admin />
                        </Route>
                        <Route path={`${path}/users/:id`}>
                            <Edit_Users_Admin />
                        </Route>
                        <Route exact path={`${path}/news`}>
                            <News_Admin />
                        </Route>
                        <Route exact path={`${path}/friends`}>
                            <Friends_Admin />
                        </Route>
                        <Route exact path={`${path}/messages`}>
                            <Messages_Admin />
                        </Route>
                    </Switch>

                </div>
            </div>
        </div>

    );
}

export default AdminPage;