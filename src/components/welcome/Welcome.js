import React from "react";
import "./Welcome.css";

import { Avatar } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

import MessageIcon from "@material-ui/icons/Message";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import PersonIcon from "@material-ui/icons/Person";

function Welcome() {
  return (
    <div className="wel">
      {/* <div className="banner">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2019-04/teenage-boy-doing-homework-picture-id1035393928.jpg?itok=KKhw2VCm"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 style={{ backgroundColor: "rgb(39, 104, 148)" }}>
                Manage Your Tasks
              </h3>
              <button className="btn btn-light">Register now</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i2.wp.com/bdmpublications.com/wp-content/uploads/2020/07/Planning-coding-projects.jpg?fit=780%2C405&ssl=1"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3 style={{ backgroundColor: "rgb(39, 104, 148)" }}>
                Manage Your Time
              </h3>
              <button className="btn btn-light">Register now</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.pinimg.com/originals/ff/e8/1d/ffe81dc2fbd7ed0017d052b17950eff9.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 style={{ backgroundColor: "rgb(39, 104, 148)" }}>
                Manage Your Productivity
              </h3>
              <button className="btn btn-dark">Register now</button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div> */}

      <div className="task welcome">
        <ul className= "list-group">
          <li className= "list-group-item">
            <div className="row">
              <div className="col-1">
                <Avatar style={{ backgroundColor: "#228ae6" }}>
                  <MessageIcon />
                </Avatar>
              </div>
              <div className="col-8 ml-2">
                <h6>Message</h6>
                <p>Переписывайтесь с друзьями</p>
              </div>
              <div className="col-2" />
              <CheckIcon style={{ color: "#8d9391" }} />
            </div>
          </li>
          <li className= "list-group-item">
            <div className="row">
              <div className="col-1">
                <Avatar style={{ backgroundColor: "#00aae4" }}>
                  <PersonIcon />
                </Avatar>
              </div>
              <div className="col-7 ml-2">
                <h6>Find Friends</h6>
                <p>Find your friends for communication</p>
              </div>
              <div className="col-3" />
              <CheckIcon style={{ color: "#8d9391" }} />
            </div>
          </li>
          <li className= "list-group-item">
            <div className="row">
              <div className="col-1">
                <Avatar style={{ backgroundColor: "#91c73e" }}>
                  <PostAddIcon />
                </Avatar>
              </div>
              <div className="col-7 ml-2">
                <h6>Add Post</h6>
                <p>Add yourself post</p>
              </div>
              <div className="col-3" />
              <CheckIcon style={{ color: "#8d9391" }} />
            </div>
          </li>
          <li className= "list-group-item">
            <div className="row">
              <div className="col-1">
                <Avatar style={{ backgroundColor: "#ff0000" }}>
                  <ThumbUpAltIcon />
                </Avatar>
              </div>
              <div className="col-5 ml-2">
                <h6>Like</h6>
                <p>Like another posts</p>
              </div>
              <div className="col-5" />
              <CheckIcon style={{ color: "#8d9391" }} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
