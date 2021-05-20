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
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';

function Friends({auth, userEmail}){
    // localStorage.removeItem("currentPage");
    // localStorage.setItem("currentPage", "/friends");
    const auth_u = auth;
    const userMail = userEmail;

    const [userSend, setUserSend] = useState({
        id:auth_u.user.id,
        fullName: auth_u.user.fullName,
        ava: auth_u.user.ava,
        email: auth_u.user.email,
        password: auth_u.user.password,
        roles: auth_u.user.roles
    });
    const[isSend, setSend] = useState(false);
    const [friends, setFriends] = useState([]);
    const [recommendfriends, setRecommendFriends] = useState([]);
    const [zaprosfriends, setZaprosFriends] = useState([]);
    const [zaprosSendTofriends, setZaprosSendToFriends] = useState([]); // кимге запрос жберде текущий юзер солардын списогы



    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.myfriends+auth_u?.user.email);
            const requestrecommend = await axios.get(requests.recommendfriends+auth_u?.user.email);
            const zaprosfriends = await axios.get(requests.zaprosNafriend+auth_u?.user.email);
            const zaprossendtofriends = await axios.get("/api/getuserSendKomu/"+auth_u?.user.email);
            setFriends(request.data);
            setRecommendFriends(requestrecommend.data);
            setZaprosFriends(zaprosfriends.data);
            setZaprosSendToFriends(zaprossendtofriends.data);
            console.log("friends");
            console.log(request.data);
        }

        const interval = setInterval(() => {
            console.log('This will run every second!');
            fetchData();
        }, 2000);
        return () => clearInterval(interval);

    },[isSend])
    console.log("friends: " + friends);

    //send a request to add friend

    const [addRequest, setRequest] = useState({
        userFrom:userSend,
        userTo: {},
        added_time: Date.now()
    });

    let req = {userFrom:auth_u.user,
        userTo: null,
        added_time: Date.now()};

    async function addToRequest(){
        console.log("addTorequestMethod: " );
        // setRequest({...addRequest, userTo: userRequestTo});
        console.log(addRequest);

        let res = await axios.post(requests.addFriendReques, addRequest);
        setSend(!isSend);
        console.log("send:", isSend);
        // setRequest({...addRequest, userTo: null});
        const setIsUser = {
            id: 0,
            fullName: "",
            ava: "",
            email: "",
            password: "",
            roles: []
        }
    }
    console.log("zaprossend")
    console.log(zaprosSendTofriends);

    function deleteRequest(emailkim, emailkimdi){
        let wor = axios.delete("/api/deletefriendsrequestbyuser/"+emailkim+"/"+emailkimdi).then(()=>{
            setSend(!isSend);
        })
    }
    return(
        <div className="friends__page">

            <div className="ffrien">

                <div className="friends__request">
                    <div className="friends__request__title">
                        <h3 style={{textAlign:"center"}}>Friends Request ({zaprosfriends.length})</h3>
                    </div>
                    <div className="friends__request__list">
                        {
                            zaprosfriends.length>0?
                                zaprosfriends.map((zfriend)=>{
                                    console.log("zfriend");
                                    console.log(zfriend);
                                return(
                                    <div className="friends__list__one">
                                        <div>
                                            <img src={zfriend.userFrom.ava} className="friends__image" alt=""/>
                                        </div>
                                        <div className="friends__list__info">
                                            <Link to="/friends" >
                                                <h5 className="info__text">
                                                    {zfriend.userFrom.fullName}
                                                </h5>
                                            </Link>
                                            <div className="mt-3">
                                                <button onClick={(e)=>{
                                                    const setUserFrom ={
                                                        id:auth_u.user.id,
                                                        fullName: auth_u.user.fullName,
                                                        ava: auth_u.user.ava,
                                                        email: auth_u.user.email,
                                                        password: auth_u.user.password,
                                                        roles: auth_u.user.roles
                                                    };
                                                    const setUserTo ={
                                                        id:zfriend.userFrom.id,
                                                        fullName: zfriend.userFrom.fullName,
                                                        ava: zfriend.userFrom.ava,
                                                        email: zfriend.userFrom.email,
                                                        password: zfriend.userFrom.password,
                                                        roles: zfriend.userFrom.roles
                                                    };
                                                    console.log("setUserFrom");
                                                    console.log(setUserFrom);
                                                    console.log("setUserTo");
                                                    console.log(setUserTo);

                                                    const frReq = {
                                                        id:null,
                                                        userFrom: setUserFrom,
                                                        userTo: setUserTo,
                                                        added_time: Date.now()
                                                    }
                                                    console.log("frReq");
                                                    console.log(frReq);

                                                    let res = axios.post("/api/addFriends/"+ setUserFrom.email + "/"+setUserTo.email).then((e)=>{
                                                        setSend(!isSend);
                                                    })
                                                }} className="btn accept__link" ><AddIcon />Accept friend request</button>
                                                <button onClick={(e)=>{
                                                    let req = axios.delete("/api/deletefriendsrequestbyuser/"+auth_u.user.email+"/"+zfriend.userFrom.email).then(()=>{
                                                        setSend(!isSend);})
                                                }} className="btn ml-3 accept__link2" ><CloseIcon />Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                        })

                                :
                                <>
                                    <h2 style={{textAlign:"center", color:"darkgray", marginTop:"3%", marginBottom:"3%"}}> No zapros</h2>
                                </>
                        }


                    </div>
                </div>

                <div className="friends mt-3">
                    <div className="card">
                        <div className="card-header" style={{textAlign:"center"}}>
                            <h3>My Friends</h3>
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
                                            <img src={friend.ava}/>
                                        </div>
                                        <div className="friends__list__info">
                                            <div className="row">
                                                <div className="col-11">
                                                    <Link to="/friends" style={{textDecoration:"none"}}>
                                                        <h5 className="info__text">
                                                            {friend.fullName}
                                                        </h5>
                                                    </Link>
                                                </div>
                                                <div className="col-1">
                                                    <Link style={{textDecoration:"none"}} >
                                                        <h5 className="d-flex" onClick={(e)=>{
                                                            let res = axios.delete("/api/deleteFriend/"+auth_u.user.email+"/"+friend.email).then((res)=>{
                                                                setSend(!isSend);
                                                            })
                                                        }}>
                                                            <DeleteIcon style={{color:"red", marginLeft:"40px"}} />
                                                            Delete
                                                        </h5>
                                                    </Link>
                                                </div>
                                            </div>

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
                                    {/*{auth?.user.roles.find(o => o.role === 'ROLE_ADMIN')}*/}
                                    {
                                        zaprosSendTofriends.find(o=>o.userTo.id === recommendfriend.id)?
                                            <>
                                                <button onClick={(e)=>{
                                                    let req = axios.delete("/api/deletefriendsrequestbyuser/"+recommendfriend.email + "/"+auth_u.user.email).then((ee)=>{
                                                        setSend(!isSend);
                                                    })
                                                }} className="btn btn__rec" style={{textDecoration:"none"}}><CheckIcon /> Sended </button>
                                            </>
                                            :
                                            <button onClick={()=>{
                                                const setIsUser = {
                                                    id: recommendfriend.id,
                                                    fullName: recommendfriend.fullName,
                                                    ava: recommendfriend.ava,
                                                    email: recommendfriend.email,
                                                    password: recommendfriend.password,
                                                    roles: recommendfriend.roles
                                                };
                                                console.log("recommendfriend");
                                                console.log(setIsUser);
                                                setRequest({userTo: setIsUser});
                                                // addToRequest();
                                                let res = axios.post("/api/addfriendrequest/"+ auth_u.user.email + "/" + recommendfriend.email).then((e)=>{
                                                    setSend(!isSend);
                                                });
                                            }} className="btn btn__rec" style={{textDecoration:"none"}}><PersonAddIcon /> Add friend</button>
                                    }

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