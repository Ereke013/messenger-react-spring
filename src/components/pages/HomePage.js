import React from "react";
import Feed from "../feed/Feed";
import Sidebar from "../sidebar/Sidebar";
import "./HomePage.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Profile from "../profile/Profile";
import Messages from "../messages/Messages";
import OneMessage from "../messages/OneMessage";
import Friends from "../friends/Friends";
import {useRouteMatch} from "react-router";
import AdminPage from "../admin/AdminPage";

function HomePage() {
    let {path, url} = useRouteMatch();
    return (
        // <BrowserRouter>
            <Switch>
                {/*// <div>*/}
                {/*//     <div className="container">*/}
                {/*//         <div className="row mt-5">*/}
                {/*//             <div className="col-sm-3">*/}
                {/*//                 <Sidebar />*/}
                {/*//             </div>*/}
                {/*//             <div className="col-sm-9">*/}
                {/*//                 <Feed />*/}
                {/*//             </div>*/}
                {/*//         </div>*/}
                {/*//     </div>*/}
                {/*// </div>*/}
                <div className="homePage">
                    <div className="homePage__right">
                        <Sidebar/>
                    </div>
                    <div className="homePage__center">
                        <Route exact path={path}>

                            <Feed sourc={"home"}/>
                        </Route>
                        <Route  path={`${path}/profile`}>
                            <Profile/>
                        </Route>
                        <Route  path={`${path}/adminPage`}>
                            <AdminPage/>
                        </Route>
                        <Route  path={`${path}/friends`}>
                            <Friends/>
                        </Route>
                        <Route  path={`${path}/messages`}>
                            <Messages/>
                            {/*<Feed />*/}
                        </Route>
                        <Route path={`${path}/admin`}>
                            <AdminPage/>
                            {/*<Feed />*/}
                        </Route>
                        {/*<Route  path={`${path}/messages/2`}>*/}
                        {/*    <OneMessage />*/}
                        {/*    /!*<Feed />*!/*/}
                        {/*</Route>*/}
                        <Route  path={`${path}/likes`}>
                            <OneMessage />
                        </Route>
                    </div>
                    {/*<div className="homePage__center">*/}
                    {/*    <Route exact path="/home">*/}
                    {/*        <Feed/>*/}
                    {/*    </Route>*/}
                    {/*    <Route exact path="/profile">*/}
                    {/*        <Profile/>*/}
                    {/*    </Route>*/}
                    {/*    <Route exact path="/friends">*/}
                    {/*        <Friends/>*/}
                    {/*    </Route>*/}
                    {/*    <Route exact path="/messages">*/}
                    {/*        <Messages/>*/}
                    {/*        /!*<Feed />*!/*/}
                    {/*    </Route>*/}
                    {/*    <Route exact path="/likes">*/}
                    {/*        <Feed/>*/}
                    {/*    </Route>*/}
                    {/*</div>*/}
                </div>
            </Switch>
        // </BrowserRouter>
    );
}

export default HomePage;
