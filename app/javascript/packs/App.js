
import React, { Component } from "react";
import GameContainer from '../containers/GameContainer/GameContainer';
import Layout from '../components/Layout/Layout';
import Game from '../components/Game';
import Form from '../components/Form';
import Board from '../components/Board';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MessageType, InGameMessageType } from "../constants/messageType";
import { showMessage, GenerateMessage } from "../helpers";


class App extends Component {

  constructor(){
    super();
    this.state = { 
      isFormSubmitted: false,
      data: {
        board_data: ''
      },
      boardSize:4,
      userName: ''
    };
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (!this.state.userName || this.state.userName == "") {
      showMessage(
        MessageType.ERROR,
        "Please enter your name before proceeding"
      );
      return;
    }

    fetch(`/api/games/new?length=${this.state.boardSize}`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
          this.setState({
            isFormSubmitted: true,
            data: {
              board_data: result.data.board_data
            },
            boardSize:this.state.boardSize
          });

          showMessage(
            MessageType.SUCCESS,
            `Welcome! ${this.state.userName}. Let's play.`
          );
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    )

  }


  render() {
    return (
      <div className="app">
        <Layout>
          {!this.state.isFormSubmitted && <Form handleFormSubmit={this.handleFormSubmit.bind(this)} boardSize={this.state.boardSize} currentUser={this.state.userName} handleInputChange={this.handleInputChange.bind(this)}/>}

          {this.state.isFormSubmitted && <Game data={this.state.data} boardSize={this.state.boardSize} currentUser={this.state.userName}/>}
        </Layout>
        <ToastContainer />
      </div>
    );
  }
}

export default App;