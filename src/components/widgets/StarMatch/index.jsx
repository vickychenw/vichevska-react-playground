import React, { Component, useEffect, useState } from "react";

import utils from "./utils";
import colors from "./colors";

//import './styles.css';

//Colors/status of the stars are rendered based on the state of the game - StarMatch
const PlayNumber = (props) => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
  >
    {props.number}
  </button>
);

const StarsDisplay = (props) => (
  <>
    {utils.range(1, props.count).map((starId) => (
      <div key={starId} className="star" />
    ))}
  </>
);

const PlayAgain = (props) => (
  <div className="game-done">
    <div
      className="message"
      style={{ color: props.gameStatus === "lost" ? "red" : "green" }}
    >
      {props.gameStatus === "lost" ? "Game Over" : "Nice"}
    </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

// Custom hook
const useGameState = () => {
  const buttons = 9;
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [stars, setStars] = useState(utils.random(1, buttons)); //randomly pick numbers of stars to display
  const [availableNums, setAvailableNums] = useState(utils.range(1, buttons)); //start with all available numbers
  const [candidateNums, setCandidateNums] = useState([]); //list of selected numbers

  //setInterval, setTimeout

  //This will be triggered everytime the state changes and comps are re-rendered
  React.useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      //Executed everytime the comp is rendered
      console.log("Comp done rendering");

      //Executed everytime the state changes and comp re rendered
      //clean the side effect
      return () => clearTimeout(timerId);
    }
    //return  () => console.log('Comp state changed')
  });

  const setGameState = (newCandidateNums) => {
    //if the new list does not add up to the total stars count, add the new list to the session - still game on
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      //all candidates add up to the total stars, selected numbers should be marked as used, reset candidate array

      //Update the available numbers to removed those used ones
      //get all those available numbers that were not part of the candidate list
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );

      //redraw playable stars based on available numbers
      setStars(utils.randomSumIn(newAvailableNums, buttons));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

// STAR MATCH - Starting Template

const Game = (props) => {
  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

  //Computational functions
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (number) => {
    //if the current number is not in the availableNums array
    if (!availableNums.includes(number)) {
      return "used";
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  //Handlers
  const onNumberClick = (number, status) => {
    console.log(`onNumberClick stats=${status}`);

    if (gameStatus !== "active" || status === "used") {
      return;
    }

    //Add the new clicked number to the existing candidate list
    //if the currently clicked number has a status of available, add it to the candidate list
    //otherwise, keep all the candidate numbers Except the currently clicked one - this is to unmark a wrong number
    const newCandidateNums =
      status === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== "active" ? (
            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
          ) : (
            <StarsDisplay count={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);

  //Every time the key value changes, React will unmount the component and remounting to clean up all its states
  //Unmounting the game will reset all its values
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

export default StarMatch;
