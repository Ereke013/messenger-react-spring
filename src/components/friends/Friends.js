import React, {useEffect, useState} from "react";
import "./Friends.css";
import SearchIcon from "@material-ui/icons/Search";
import {Link} from "react-router-dom";
import MessageIcon from '@material-ui/icons/Message';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Avatar} from "@material-ui/core";
import {connect} from "react-redux";
import axios from "../../axios";
import requests from "../../request";
import AddIcon from '@material-ui/icons/Add';

function Friends({auth, userEmail}){
    // localStorage.removeItem("currentPage");
    // localStorage.setItem("currentPage", "/friends");
    const auth_u = auth;
    const userMail = userEmail;

    const [friends, setFriends] = useState([]);
    const [recommendfriends, setRecommendFriends] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.myfriends+auth_u?.user.email);
            const requestrecommend = await axios.get(requests.recommendfriends+auth_u?.user.email);
            setFriends(request.data);
            setRecommendFriends(requestrecommend.data);
            console.log(recommendfriends);
        }
        fetchData();
    },[])
    console.log("friends: " + friends);


    //send a request to add friend
    const[isSend, setSend] = useState(false);
    const [addRequest, setRequest] = useState({
        userFrom:auth_u.user,
        userTo: null,
        added_time: Date.now()
    });

    let req = {userFrom:auth_u.user,
        userTo: null,
        added_time: Date.now()};

    async function addToRequest(userTo){
        console.log("addTorequestMethod: " );
        setRequest({...addRequest, userTo: userTo});
        console.log(addRequest);

        let res = await axios.post(requests.addFriendReques, addRequest);
        setSend(!isSend);
        console.log("send:", isSend);
        // setRequest({...addRequest, userTo: null});
    }
    return(
        <div className="friends__page">

            <div className="ffrien">

                <div className="friends__request">
                    <div className="friends__request__title">
                        <h2 style={{textAlign:"center"}}>Friends Request (1)</h2>
                    </div>
                    <div className="friends__request__list">
                        <div className="friends__list__one">
                            <div className="friends__image">
                                <img src="https://cdn.vox-cdn.com/thumbor/kLmLWhVH_8L0RCQADim9uytXoVo=/0x0:2480x1994/1200x800/filters:focal(1302x235:1698x631)/cdn.vox-cdn.com/uploads/chorus_image/image/53748663/usa_today_9266437.0.jpg"/>
                            </div>
                            <div className="friends__list__info">
                                <Link to="/friends" >
                                    <h5 className="info__text">
                                        User Userov
                                    </h5>
                                </Link>
                                <div className="mt-3">
                                    <button className="btn accept__link" ><AddIcon />Accept friend request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="friends mt-3">
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center"}}>
                            <h1>My Friends</h1>
                        </div>
                        {/*<div className="card-body"></div>*/}
                    </div>
                    <div className="friends__input">
                        <SearchIcon />
                        <input type="text" placeholder="Search friends" />
                    </div>
                    <hr/>

                    <div className="friends__list">
                        {
                            friends.length>0
                                ?
                                friends.map((friend)=>(
                                    <div className="friends__list__one">
                                        <div className="friends__image">
                                            <img src={friend.friend.ava}/>
                                        </div>
                                        <div className="friends__list__info">
                                            <Link to="/friends" style={{textDecoration:"none"}}>
                                                <h5 className="info__text">
                                                    {friend.friend.fullName}
                                                </h5>
                                            </Link>
                                            <Link to="/messages" style={{textDecoration:"none"}}><MessageIcon /> Send Messages</Link>
                                        </div>
                                    </div>
                                ))
                                :
                                <h1 style={{textAlign:"center"}}>NO FRIENDS</h1>
                        }


                        {/*<hr/>*/}

                        {/*<div style={{textAlign:"center", marginTop:"5%"}}>*/}
                        {/*    <h2>Recommended friends</h2>*/}
                        {/*</div>*/}


                        {/*<div className="friends__list__one">*/}
                        {/*    <img src="https://sportpng.com/wp-content/uploads/2020/01/Cristiano-Ronaldo-sportpng-22.jpg"/>*/}
                        {/*    <div className="friends__list__info">*/}
                        {/*        <Link to="/friends" style={{textDecoration:"none"}}>*/}
                        {/*            <h5 style={{color:"black"}} className="info__text">*/}
                        {/*                User Userov*/}
                        {/*            </h5>*/}
                        {/*        </Link>*/}
                        {/*        <Link to="/messages" style={{textDecoration:"none"}}><PersonAddIcon /> Add friend</Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>
                </div>
            </div>
            <div className="list__recommend">
                <div className="card">
                    <div className="card-header"><h3>Recommended friends</h3></div>
                </div>
                <div className="rec__fr">
                    {
                        recommendfriends
                            // .slice(0, 3)
                            .map((recommendfriend)=>(

                            <div className="recommended__list__fr">
                                {console.log("yoooo")}
                                {console.log(recommendfriend)}
                                <img src={recommendfriend.ava} />
                                <div className="friends__list__info">
                                    <Link to="/friends" style={{textDecoration:"none"}}>
                                        <h5 style={{color:"black", fontSize:"15px"}}>
                                            {recommendfriend.fullName}
                                        </h5>
                                    </Link>
                                    <button onClick={()=>{
                                        // setRequest({...addRequest, userTo: recommendfriend})
                                        // console.log("user for send: " + addRequest.userTo.id + " "+ addRequest.userFrom.id);
                                        console.log(recommendfriend);
                                        // console.log("add rrecommendfriend: " + recommendfriend.user);
                                        addToRequest(recommendfriend);
                                    }} className="btn btn__rec" style={{textDecoration:"none"}}><PersonAddIcon /> Add friend</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" style={{width:"100%"}}>More...</button>
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = (state) => {
    console.log("state: " + state.authState);
    return {
        auth: state.authState,
    };
};
export default connect(mapStateToProps)(Friends);