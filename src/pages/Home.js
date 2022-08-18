import React from "react";
import "../styles/Home.css";


function Home() {
  return (
    <div className="home" style={{ backgroundImage: "url(/climatechange.jpeg)" }}>
      <div className="headerContainer">
        <h1> CLIMATE CHANGE NOW </h1>
        <h2> The Causes of Climate Change. </h2>

        <ul>
              <li>The greenhouse effect is essential to life on Earth, but human-made emissions in the atmosphere are trapping and slowing heat loss to space.</li>
              <li>Five key greenhouse gases are CO2, nitrous oxide, methane, chlorofluorocarbons, and water vapor.                                            </li>
              <li>While the Sun has played a role in past climate changes, the evidence shows the current warming cannot be explained by the Sun.             </li>
        </ul>

      </div>

      <div className="loginmessage">
        {/* {if (!session) `<h3>You must be logged in to post</h3>`} */}
      </div>
    </div>
  );
}

export default Home;