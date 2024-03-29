import React from "react";
import "../css/app.css";
import GameContainer from "./GameContainer";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Ranking from "./Ranking";
import SoloGame from "./soloGame";
import UserProfile from "./UserProfile";
import "../css/newspaper.css"

import { Route, Switch, withRouter } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Guest" + ((Math.random() * 100000) | 0).toString()
      },
      id: null
    };
  }


  componentDidMount() {
    this.getUser();
  }

  logout = () => {
    fetch('/logout')
  };

  getUser = () => {
    fetch('/api/whoami')
      .then(res => res.json())
      .then(
        userObj => {
          console.log(userObj)
          if (userObj._id !== undefined) {
            this.setState({
              userInfo: userObj,
              id: userObj._id,
            });
          } else {
            this.setState({
              userInfo: {
                name: "Guest" + ((Math.random() * 100000) | 0).toString()
              }
            });
          }
        }
      );
  }
  render() {

    return (
      <div>
          <div className="head">
            <div className="headerobjectswrapper">
              <header>News Racer</header>
            </div>

          </div>
          <div>
            <NavBar userInfo={this.state.userInfo}
              logout={this.logout} />
          </div>
          <Switch>
            <Route exact path='/' render={(props) => <HomePage {...props} userInfo={this.state.userInfo} logout={this.logout} />} />
            <Route exact path='/profile/:id/' component={UserProfile} />
            <Route exact path='/race' render={(props) => <GameContainer {...props} username={this.state.userInfo.name} />} />
            <Route exact path='/solorace' render={(props) => <SoloGame {...props} username={this.state.userInfo.name} />} />
            <Route exact path='/ranking' component={Ranking} />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);