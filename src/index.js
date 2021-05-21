import { useState } from "react";
import ReactDOM from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MyHabits from "./components/MyHabits";
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import Header from "./components/Header";
import History from "./components/History";
import Menu from "./components/Menu";
import "./styles/reset.css";
import ProgressContext from './contexts/ProgressContext';
import Today from "./components/Today";
import UserContext from "./contexts/UserContext";

/*

*/

function App() {
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState("");
  
 // setProgressOfHabits(user.percentage);
  return (    
    <UserContext.Provider value={{ user, setUser }}>
      <ProgressContext.Provider value = {{progress, setProgress}}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            <SignUp />
          </Route>  
        
          <Route path="/habitos" exact>
              <Header/>
            <MyHabits />
            <Menu/>
          </Route>

          <Route path="/hoje" exact>
          <Header/>
            <Today/>
            <Menu/>
          </Route>

          <Route path="/historico" exact>
          <Header/>
          <History/>
          <Menu/>
          </Route>

        </Switch>
      </BrowserRouter>
      </ProgressContext.Provider>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector(".root"));