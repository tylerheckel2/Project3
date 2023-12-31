import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { database } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import HomeScreen from "./Home";
import PointsPage from "./points";
import ReboundsPage from "./rebounds";
import AssistsPage from "./assists";


function RegisterAndLogin() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "signup") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((err) => {
          alert(err.code);
        });
    }
  };

  return (
    <div className="App">
      {/* Registration and Login Screen */}
      <div className="row">
        <div className={login === false ? "activeColor" : "pointer"} onClick={() => setLogin(false)}>
          Sign Up
        </div>
        <div className={login === true ? "activeColor" : "pointer"} onClick={() => setLogin(true)}>
          Sign In
        </div>
      </div>
      <h1>{login ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="password" placeholder="Password" />
        <br />
        <br />
        <button>{login ? "Sign In" : "Sign Up"}</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
         <Route path="/home" element ={<HomeScreen/>}/>
        <Route path="/points" element ={<PointsPage/>}/>
        <Route path="/rebounds" element ={<ReboundsPage/>}/>
        <Route path="/assists" element ={<AssistsPage/>}/>
        {/* Add more routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;