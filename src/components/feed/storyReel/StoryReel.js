import React from "react";
import "./StoryReel.css";

// images (profile)
import photo1 from "../../../img/story/photo1.png";
import photo2 from "../../../img/story/photo2.jpg";
import photo3 from "../../../img/story/photo3.jfif";
import photo4 from "../../../img/story/photo4.jfif";
import photo5 from "../../../img/story/photo5.jfif";

// images (story)
import ist1 from "../../../img/story/storyImage/ist1.jpg";
import ist2 from "../../../img/story/storyImage/ist2.jpg";
import ist3 from "../../../img/story/storyImage/ist3.jpg";
import ist4 from "../../../img/story/storyImage/ist4.jfif";
import ist5 from "../../../img/story/storyImage/ist5.jpg";

import Story from "./story/Story";

function StoryReel() {
  console.log("storyReel");
  return (
    <div className="storyReel">
      <Story image={ist1} profileSrc={photo1} title="Test User" />
      <Story image={ist2} profileSrc={photo2} title="Just User" />
      <Story image={ist3} profileSrc={photo3} title="Jai User" />
      <Story image={ist4} profileSrc={photo4} title="User GOI" />
      <Story image={ist5} profileSrc={photo5} title="User Aiteur" />
    </div>
  );
}

export default StoryReel;
