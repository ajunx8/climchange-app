import React from "react";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home" style={{ backgroundImage: "url(/climatechange.jpeg)" }}>
      <div className="headerContainer">
        <h1> CLIMATE CHANGE! </h1>
        <p> CLIMATE CHANGE OMG </p>
      </div>

      <div className="loginmessage">
        {/* {if (!session) `<h3>You must be logged in to post</h3>`} */}
      </div>
    </div>
  );
}

export default Home;