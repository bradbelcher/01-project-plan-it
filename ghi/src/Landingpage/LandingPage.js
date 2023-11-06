import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import video from "./media/solarsystem.mp4";
import Projectcards from "./LPFunctions";

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="container-fluid">
        <video autoPlay muted loop>
          <source src={video} className="video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="nav-container">
          <header className="nav-header">
            <div>
              <Link to="/" className="planit-logo">
                <img
                  src={require("./media/logo.png")}
                  className="App-logo"
                  alt="Plan-it Logo Small"
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </div>
            <div>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign-Up
              </Link>
            </div>
          </header>
        </div>
        <div className="container">
          <div className="page-section">
            <div className="page-text">
              <img
                src={require("./media/logo.png")}
                className="App-logo-large"
                alt="logo"
              />

              <h2>Unleash Your Coding Dreams with Collaborative Projects!</h2>
              <p>
                Welcome to Project Plan-It, the ultimate platform where software
                engineers, developers, and coders unite to transform passion
                into reality. Create, collaborate, and conquer coding projects
                that once seemed too complex to tackle alone. Join our vibrant
                community and experience the thrill of building together!
              </p>
              <div>
                <Link to="/signup">
                  <button className="browser-buttons" type="button">
                    JOIN OUR COMMUNITY!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid-1">
        <div className="container">
          <div className="page-section">
            <div className="page-text">
              <h2>Elevate Your Coding Journey in A Supportive Community!</h2>
              <p>
                Dive into a world tailored for coding enthusiasts like you. At
                Project Plan-It, we're a gathering of developers, engineers, and
                coders of all languages, ready to embark on ambitious projects
                together. Whether you're starting a new venture or offering your
                expertise as a mentor, this is where ideas flourish and
                friendships form.
              </p>
              <div>
                <Link to="/signup">
                  <button className="browser-buttons-1" type="button">
                    SIGN UP NOW!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-w">
        <div className="page-section">
          <h2>Empowering Coders: Where Collaboration Ignites Brilliance!</h2>
          <div className="features-grid">
            <div className="grid-item">
              <img alt="" src={require("./media/lightbulb.png")} className="icon" />
              <h3>Ideas</h3>
              <p>
                Ignite innovation in our creative hub! Share and refine coding
                project ideas with a vibrant community of visionaries. Together,
                we'll shape concepts into groundbreaking projects that redefine
                coding possibilities.
              </p>
            </div>

            <div className="grid-item">
              <img alt="" src={require("./media/gears.png")} className="icon" />
              <h3>Create</h3>
              <p>
                Transform ideas into reality with our intuitive project creation
                tools. Build a dedicated space for your coding dreams, where you
                can outline, plan, and lay the foundation for your ambitious
                projects.
              </p>
            </div>
            <div className="grid-item">
              <img alt="" src={require("./media/group.png")} className="icon" />
              <h3>Collaborate</h3>
              <p>
                Join forces with a community of passionate coders. Find mentors,
                share insights, and synergize your skills to conquer challenges
                together. Collaboration fuels innovation, and together, we turn
                concepts into cutting-edge creations.
              </p>
            </div>
            <div className="grid-item">
              <img alt="" src={require("./media/publish.png")} className="icon" />
              <h3>Publish</h3>
              <p>
                It's time to unveil your masterpiece to the world. With a few
                clicks, your project goes live, accessible to enthusiasts,
                potential users, and fellow developers. Embrace the satisfaction
                of sharing your coding triumphs with a global audience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid-1">
        <div className="container">
          <div className="page-section">
            <h2>
              All programming languages are welcome! If it's used to program,
              then you'll find it here!
            </h2>
            <div className="icon-grid">
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/pythonlogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/reactlogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/jslogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/html5logo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/csslogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/nodejs.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/npmlogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/sqllogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/tslogo.png")}
                  className="logo-icon"
                />
              </div>
              <div className="grid-item">
                <img
                  alt=""
                  src={require("./media/vsclogo.png")}
                  className="logo-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-w">
        <div className="page-section">
          <Projectcards />
        </div>
      </div>
      <div className="container-fluid-1">
        <div className="page-section">
          <h2>
            Join our community and  start building your dream projects
            today! Click the image below to get started!
          </h2>
          <div>
            <img
              className="hack-the-planet"
              src={require("./media/htp.png")}
              alt="ClickableImage"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="container">
          <footer className="nav-header">
            <div>
              <p>© 2023 Planiteers</p>
            </div>
            <div className="footer-nav">
              <nav>
                <a href="/">Home</a>
              </nav>
              <nav>
                <a href="/">Pricing</a>
              </nav>
              <nav>
                <a href="/">About</a>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
