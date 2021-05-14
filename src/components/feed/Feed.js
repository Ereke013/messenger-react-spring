import React, { useEffect, useState } from "react";
import "./Feed.css";
import MessageSender from "./messageSender/MessageSender";
import Post from "./post/Post";
import StoryReel from "./storyReel/StoryReel";
import axios from "../../axios";
import requests from "../../request";
import {connect} from "react-redux";
import {Avatar} from "@material-ui/core";
import {InsertEmoticon, PhotoLibrary} from "@material-ui/icons";

function Feed({auth, userEmail, rootPage}) {
  const authh = auth;
  const userEm = userEmail;
  const root = rootPage;

  console.log("auth: " + authh + ", userEmail: " + userEm + ", rootPage: " + root);
  console.log("auth: ", authh , ", userEmail: " , userEm , ", rootPage: " , root);
  const [isAdded, setIsAdded] = useState(false);

  const [addPost, setPost] = useState({
    postTitle: "",
    postObject:"",
    posterUser: authh.user,
    postDate: Date.now()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPost();
    console.log("text: "+ addPost.postTitle+ ", postObject: " + addPost.postObject + ", userId: " + addPost.posterUser);

    // clear form
    setPost({...addPost, postTitle: "", postObject: ""});
  };

  async function addNewPost(){
    let res = await axios.post(requests.addPost, addPost);

    setIsAdded(!isAdded);
  }


  //get all posts
  const [posts, setPosts] = useState([]);
  // localStorage.setItem("currentPage", "");
  useEffect(()=>{
    async function fetchData(){
      let request = "";
      console.log(authh.user.jwtToken)
      axios.defaults.headers.common[
          "Authorization"
          ] = `Bearer ${authh.user.jwtToken}`;
      if(root==="home"){

        request = await axios.get(requests.news);
      }
      else if(root ==="userNews"){
        request = await axios.get(requests.getUserNews+ userEm);
      }
      // switch (sourc) {
      //   case "home":
      //     console.log("homega keldi");
      //     request = await axios.get(requests.news);
      //     return request;
      //   case "mynews":
      //     console.log("my news keldi");
      //     request = await axios.get(requests.getUserNews, userId);
      //     return request;
      // }
      // const request = await axios.get(requests.news);
      setPosts(request.data);
      posts.map((post)=>(
          console.log("posts: " + post.postTitle)

    ))
      // console.log("posts: " + posts);
    }
    fetchData();
  },[isAdded]);

  return (
    <div className="feed">
      {/*<StoryReel />*/}
      <div className="messageSender">
        <div className="messageSender__top">
          <Avatar
              // src={user.photoURL}
          />
          <form>
            <input
                value={addPost.postTitle}
                onChange={(e) => setPost({ ...addPost, postTitle: e.target.value})}
                className="messageSender__input__text"
                placeholder={`What's on your mind ?`}
            />
            <input
                value={addPost.postObject}
                onChange={(e) => setPost({ ...addPost, postObject: e.target.value})}
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
      {posts.map((post) => (

        <Post
          key={post.id}
          profilePic={post.posterUser.ava}
          username={post.posterUser.fullName}
          image={post.postObject}
          message={post.postTitle}
          // timestamp={post.postDate}
            // profilePic="https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png"
            // username="Test"
            // image="https://static10.tgstat.ru/channels/_0/66/66de8dadec5fa9d4dbcc0a4beb1cfcf5.jpg"
            // message="Football Legend!🔥"
            // timestamp={post.data.timestamp}
        />
      )).reverse()}
    </div>
  );
}
const mapStateToProps = (state, {email, sourc}) => {
  console.log("state: " +  ", email: " + email + ", sourc: " + sourc);
  console.log(state.authState.user);
  return {
    auth: state.authState,
    userEmail: email,
    rootPage: sourc,
  };
};
export default connect(mapStateToProps)(Feed);
