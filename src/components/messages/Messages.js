import React, {useEffect, useState} from "react";
import "./Messages.css";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {LogOutAuthAction} from "../../redux/actions/AuthAction";
import {connect} from "react-redux";
import axios from "../../axios";
import requests from "../../request";

function Messages(props) {
    // localStorage.setItem("currentPage", "/messages");
    const { auth} = props;
    const [messages, setMessages]=useState([]);
    const [isSend, setSend]=useState(false);
    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get("/api/usermessages/"+auth?.user.email);
            setMessages(request.data);
            console.log("mm");
            console.log(request.data);
        }
        fetchData();
        // const interval = setInterval(() => {
        //     console.log('This will run every second!');
        //
        // }, 2000);
        // return () => clearInterval(interval);

    },[isSend])
    console.log("messages");
    console.log(messages);
    return (
        <div className="messages">
            <div className="card bg-light" >
                <div className="card-header" style={{textAlign:"center"}}>
                    <h2>Messages</h2>
                </div>
                <div className="card-body" style={{background:"transparent"}}>
                    <div className="card__body_text">
                        <ul className="list-group list-group-flush">
                            {
                                messages.length>0?
                                    messages.map((message)=>{
                                        console.log("mssg")
                                        console.log(message)
                                    return(
                                        <Link className="list-group-item message__Link2" style={{textDecoration:"none"}} to="/meeee">
                                            <div className="message__Link">
                                                <Avatar src={auth.user.email=== message.friend.email?message.user.ava : message.friend.ava} style={{marginTop:"1%"}}/>
                                                <div className="messages__text">

                                                    {
                                                        auth.user.email=== message.friend.email?
                                                            <>

                                                                <label> {message.user.fullName}</label>
                                                            </>
                                                            :
                                                            <>
                                                                {console.log("ten")}
                                                                {message.friend.fullName}
                                                            </>

                                                    }

                                                    <p>{message.message_text} </p>
                                                </div>
                                                <div className="messages__date">
                                                    <label>09.04.2021</label>
                                                </div>
                                            </div>
                                        </Link>
                                    );

                            })


                                    :
                                    <h2 style={{textAlign:"center"}}>No messages</h2>

                            }

                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.authState,
    };
};


export default connect(mapStateToProps)(Messages);