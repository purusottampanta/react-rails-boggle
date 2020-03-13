
import React, { Component } from "react";
import GameContainer from '../../containers/GameContainer/GameContainer';
import Layout from '../Layout/Layout';
import './Game.css';
import Board from '../Board';
import ScoreBox from '../ScoreBox';
import {
  shuffleBoard,
  copyBoard,
  isTileEqual,
  isAdjacent,
  toggleHints,
  clearHints
} from "../../constants/gameUtil";
import CurrentWord from "../CurrentWord";
import ScorCard from "../ScorCard";
import Button from "../Button";
import NavBar from "../NavBar";
import { MessageType, InGameMessageType } from "../../constants/messageType";
import { showMessage, GenerateMessage } from "../../helpers";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class Game extends Component {

  constructor(props) {
    super(props);

    let { data, boardSize, currentUser } = props;
    let board_data = data.board_data;

    this.initBoard = shuffleBoard(board_data, boardSize);

    this.state = {
      board: this.initBoard,
      currentWord: "",
      currentWordPosition: [],
      wrongCount: 0,
      wordScoreList: {},
      showingScore: false,
      currentUser: currentUser,
      timeLimit: 180
    };

    this.onEndGameClick = this.onEndGameClick.bind(this);
  }

  onTimerEnd(){
    console.log('erferewrferf');
    this.setState({
      showingScore: true
    });
  }

  handleHomeClick(){
    window.location.reload();
  }

  handleResetGame(){
    const clearedBoard = this.initBoard;
    const currentUser = this.state.currentUser;
    this.setState({
      board: clearedBoard,
      currentWord: "",
      currentWordPosition: [],
      wrongCount: 0,
      wordScoreList: {},
      showingScore: false,
      currentUser: currentUser,
      timeLimit: 180
    });
  }

  handleClick(rowId, columnId) {

    const selectedTile = this.state.board[rowId][columnId];
    const lastSelectedTile = this.state.currentWordPosition[
      this.state.currentWordPosition.length - 1
    ];

    // debugger;
    if (selectedTile.selected) {

      // Check if selectedTile is last tile
      if (isTileEqual(selectedTile, lastSelectedTile)) {

        // Unselected selectedTile and remove from currentWordPosition
        // Also update the board to set the tile to unselected
        let newBoard = copyBoard(this.state.board);

        newBoard[rowId][columnId].selected = false;


        let currentPosition = this.state.currentWordPosition.slice(0, -1);
        if (currentPosition.length <= 0) {
          newBoard = clearHints(newBoard);
        } else {
          let currentRowId = currentPosition[currentPosition.length - 1].rowId;
          let currentColId = currentPosition[currentPosition.length - 1].columnId;
          newBoard = toggleHints(newBoard, currentRowId, currentColId);
        }


        // newBoard[rowId][columnId].selected = false;

        this.setState({
          currentWord: this.state.currentWord.slice(0, -1),
          board: newBoard,
          currentWordPosition: currentPosition
        });
      }
    } else {
      if (!lastSelectedTile || isAdjacent(selectedTile, lastSelectedTile)) {
        // Select the tile
        let newBoard = copyBoard(this.state.board);

        newBoard[rowId][columnId].selected = true;

        newBoard = toggleHints(newBoard, rowId, columnId);

        this.setState({
          // update current word with selected tile
          currentWord: this.state.currentWord.concat(
            newBoard[rowId][columnId].letter
          ),
          // update board
          board: newBoard,
          // update current word position with selected tile position
          currentWordPosition: this.state.currentWordPosition.concat({
            rowId: rowId,
            columnId: columnId
          })
        });
      }
    }
  }

  clearStage = () => {
    const clearedBoard = this.initBoard;
    this.setState({
      currentWord: "",
      currentWordPosition: [],
      board: clearedBoard
    });
  };

  onEndGameClick() {
    let props = this.props;
    confirmAlert({
      title: "Quit Game",
      message: "Are you sure you want to end this game ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.setState({
              showingScore: true
            });
          }
        },
        {
          label: "Not Yet ",
          onClick: () => console.log("submission canceled")
        }
      ]
    });
  }

  handleSubmit(word) {
    let currentList = this.state.wordScoreList;
    if (word.length < 3) {
      return;
    }
    if (currentList && currentList[word]) {
      showMessage(
        MessageType.ERROR,
        GenerateMessage(InGameMessageType.EXISTS, "")
      );
      this.clearStage();
      return;
    }
    fetch(`/api/games/evaluate?word=${word}`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.data.is_correct){
          const wList = {...this.state.wordScoreList, [word]:result.data.score}
          this.setState({
            wordScoreList : wList
          })
        }else{
          showMessage(
            MessageType.ERROR,
            GenerateMessage(InGameMessageType.ERROR, "")
          );
          this.setState({
              wrongCount : this.state.wrongCount +1
            })
        }
        this.clearStage();
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.clearStage();
      }
    )
  }

  render() {
    if(this.state.showingScore){
      return (
        <div className="score-container">
          <h2>Score Card</h2>
          <br />
          <button onClick={this.handleHomeClick.bind(this)} className="btn-home">HOME</button>
          <ScorCard wordScoreList={this.state.wordScoreList} wrongCount={this.state.wrongCount} currentUser={this.state.currentUser}/>
        </div>
        );
    }else{
      return (
        <div className="game-container">
          <NavBar onClick={this.onUserAction}
            timeLimit={this.state.timeLimit}
            onTimerEnd={this.onTimerEnd.bind(this)}
            currentUser={this.state.currentUser}
            handleResetGame={this.handleResetGame.bind(this)}
            />
            <div className="game-area left-container">
              <Board board={this.state.board} handleClick={this.handleClick.bind(this)} />
              <CurrentWord
                currentWord={this.state.currentWord}
                label="Current Word"
              />
              <Button
                handleSubmit={this.handleSubmit.bind(
                  this,
                  this.state.currentWord
                )}
                label="SUBMIT WORD"
              />
          </div>
          <div className="right-container">
            <ScoreBox wordScoreList={this.state.wordScoreList}/>
            <Button
              handleSubmit={this.onEndGameClick}
              extraClass="btn-green"
              label="QUIT GAME"
            />
          </div>
        </div>
      );
    }
  }
}

export default Game;