import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import Sidebar from "../sidebar/Sidebar";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Feed from "../feed/Feed";
import MessageSender from "../feed/messageSender/MessageSender";
import Post from "../feed/post/Post";

function Profile(props) {
    const { auth} = props;
    // localStorage.removeItem("currentPage");
    // localStorage.setItem("currentPage", "/profile");
  return (
    <div className="profile">
        {/*<div className="container">*/}
        {/*    <div className="row">*/}
                {/*<div className="col-lg-12 mt-5">*/}
                    <div className="card profile">
                        <div className="row mt-2">
                            <div className="col-3">
                                <img src={auth?.user.ava} alt="" className="profile__image"/>
                            </div>
                            <div className="col-8">
                                <h3 className="profile__fullname">{auth?.user.fullName}</h3>
                                <h5>Email: {auth?.user.email}</h5>
                                <Link to={`/profile/:userId`} style={{textDecoration:"none"}}>
                                    Edit profile
                                </Link>
                            </div>
                        </div>
                        <hr/>
                        {/*<div className="profile__sendPost">*/}
                        {/*    <h2 style={{textAlign:"center"}}>Send Posts</h2>*/}
                        {/*    <MessageSender />*/}
                        {/*</div>*/}

                        <hr/>
                        {/*<Post*/}
                        {/*    profilePic="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"*/}
                        {/*    username="Test"*/}
                        {/*    image="https://static10.tgstat.ru/channels/_0/66/66de8dadec5fa9d4dbcc0a4beb1cfcf5.jpg"*/}
                        {/*    message="Football Legend!🔥"*/}
                        {/*/>*/}

                    </div>
        <div className="mt-3">
            <Feed email={auth?.user.email} sourc={"userNews"}/>
        </div>
                {/*</div>*/}

        {/*    </div>*/}
        {/*</div>*/}

    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};
export default connect(mapStateToProps)(Profile);
