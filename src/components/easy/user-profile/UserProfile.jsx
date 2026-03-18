import React, { Component, useState } from "react";
import "./styles.css";

const user = {
  name: "Jane Doe",
  bio: "Frontend developer who loves React and coffee ☕️",
  image: "https://do6gp1uxl3luu.cloudfront.net/question-webp/dummyUser.jpg",
};

// class UserProfile extends Component {

//   render() {
//     const [showBio, setShowBio] = useState(false)
//     function onButtonClick() {
//       setShowBio(true)
//     }
//     return (
//       <div className="user-profile">
//         <img src={user.image} />
//         <h2>{user.name}</h2>
//         <button onClick={onButtonClick}>Show bio</button>
//         {showBio && <div>{user.bio}</div>}
//       </div>
//     );
//   }
// }

function UserProfile() {
  const [showBio, setShowBio] = useState(false);

  function onButtonClick() {
    setShowBio(!showBio);
  }

  return (
    <div className="user-profile">
      <img src={user.image} alt={user.name} />
      <h2>{user.name}</h2>
      <button onClick={onButtonClick} className="profileBtn">
        {showBio ? "Hide bio" : "Show bio"}
      </button>
      {showBio && <p>{user.bio}</p>}
    </div>
  );
}

export default UserProfile;
