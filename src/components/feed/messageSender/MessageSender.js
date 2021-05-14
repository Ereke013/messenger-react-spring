import React, { useState } from "react";
import "./MessageSender.css";
import { Avatar } from "@material-ui/core";
import { Videocam, PhotoLibrary, InsertEmoticon } from "@material-ui/icons";
import axios from "../../../axios";
import requests from "../../../request";
import {connect} from "react-redux";
function MessageSender(props,setIsAdded, isAdded) {
 const {auth} = props;

  const [post, setPost] = useState({
    postTitle: "",
    postObject:"",
    posterUser: auth.user,
    postDate: Date.now()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost();
    console.log("text: "+ post.postTitle+ ", postObject: " + post.postObject + ", userId: " + post.posterUser);

    // clear form
    setPost({...post, postTitle: "", postObject: ""});
  };

  async function addPost(){
    let res = await axios.post(requests.addPost, post);

    setIsAdded(!isAdded);
  }

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        <Avatar
        // src={user.photoURL}
        />
        <form>
          <input
            value={post.postTitle}
            onChange={(e) => setPost({ ...post, postTitle: e.target.value})}
            className="messageSender__input__text"
            placeholder={`What's on your mind ?`}
          />
          <input
            value={post.postObject}
            onChange={(e) => setPost({ ...post, postObject: e.target.value})}
            className="messageSender__input__img"
            placeholder={"Image URL (Optional)"}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
      <div className="messageSender__bottom">
        {/*<div className="messageSender__option">*/}
        {/*  <Videocam style={{ color: "red" }} />*/}
        {/*  <h3>Live Video</h3>*/}
        {/*</div>*/}

        <div className="messageSender__option">
          <PhotoLibrary style={{ color: "green" }} />
          <h3>Photo/Gif</h3>
        </div>

        <div className="messageSender__option">
          <InsertEmoticon style={{ color: "orange" }} />
          <h3>Feeling/Activity</h3>
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
export default connect(mapStateToProps)(MessageSender);
