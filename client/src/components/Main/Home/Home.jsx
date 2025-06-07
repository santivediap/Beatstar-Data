import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return <section>
    <article className="home-header">
      <h1>BEATSTAR DATA</h1>
      <p>Created by players for players</p>
    </article>

    <article className="home-data">
      <img src="/assets/beatstar-preview1.svg" alt="preview" />
      <div className="welcome-data">
        <h1>WELCOME!</h1>
        <p>Beatstar Data is a webpage created with the purpose of providing users game information in a very easy way</p>
        <p>Our main goal is to help players to get in touch with real-time data such as:</p>

        <ul>
          <li>Level stage scores</li>
          <li>News (soon)</li>
          <li>Tour pass (Soon)</li>
          <li>Events (Soon)</li>
        </ul>
      </div>
    </article>

    <article className="dev-info">
      <p>Hello! I am Santiago Vedia, the developer of this webpage.&#10;&#13;You can find more information about me <Link to={ "https://www.linkedin.com/in/santivediag/" }>here</Link>. Feel free to send me a message if you want to contact me!</p>

      <img src="./assets/dev-img.jpg" alt="dev-img" />
    </article>
  </section>;
};

export default Home;
