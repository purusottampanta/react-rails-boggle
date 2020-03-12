import React from "react";
import ReactTooltip from "react-tooltip";
import "./NavBar.css";
import IconButton from "../IconButton";
import { NB_HOME, NB_RESET } from "../../constants/navBarAction";
import Timer from "../Timer";


class NavBar extends React.Component {
  constructor(props) {
    super(props);

     this.handler = this.handler.bind(this);

  }

  handler(){
    console.log('erfer');
  }

  render() {
    let { currentUser, timeLimit } = this.props;
    const OPTIONS = { prefix: 'seconds elapsed!', delay: 100, maxTime: 15}

    return (
      <div className="nav-bar">
        <div className="navbar-left">
          <Timer  options={OPTIONS} handler={this.handler} />
        </div>

        <div className="navbar-right">
          <span className="game-player">
            Player: {currentUser}
          </span>
        </div>
      </div>
    );
  }
}

export default NavBar;
