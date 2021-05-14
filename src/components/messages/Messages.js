import React from "react";
import "./Messages.css";
import {Link} from "react-router-dom";
import {Avatar} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Messages() {
    // localStorage.setItem("currentPage", "/messages");
    return (
        <div className="messages">
            <div className="card bg-light" >
                <div className="card-header" style={{textAlign:"center"}}>
                    <h2>Messages</h2>
                </div>
                <div className="card-body" style={{background:"transparent"}}>
                    <div className="card__body_text">
                        <ul className="list-group list-group-flush">
                            <Link className="list-group-item message__Link2" style={{textDecoration:"none"}}>
                                <div className="message__Link">
                                    <Avatar src="https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png" style={{marginTop:"1%"}}/>
                                    <div className="messages__text">
                                        <label>User Userov</label>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                                    </div>
                                    <div className="messages__date">
                                        <label>09.04.2021</label>
                                    </div>
                                </div>
                            </Link>

                            <Link className="list-group-item message__Link2" style={{textDecoration:"none"}}>
                                <div className="message__Link">
                                    <Avatar src="https://img.icons8.com/color/452/avatar.png" style={{marginTop:"1%"}}/>
                                    <div className="messages__text">
                                        <label>Test User</label>
                                        <p>The element will then take up the specified width, and the remaining space will be split equally between the two margins </p>
                                    </div>
                                    <div className="messages__date">
                                        <label>09.04.2021</label>
                                    </div>
                                </div>
                            </Link>

                            <Link className="list-group-item message__Link2" style={{textDecoration:"none"}}>
                                <div className="message__Link">
                                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgLZal2ngrRXdEebFSXKENv_Joj38zpGXhwA&usqp=CAU" style={{marginTop:"1%"}}/>
                                    <div className="messages__text">
                                        <label>Halo Malo</label>
                                        <p>To just center the text inside an element, use . </p>
                                    </div>
                                    <div className="messages__date">
                                        <label>09.04.2021</label>
                                    </div>
                                </div>
                            </Link>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Messages;