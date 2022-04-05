import React from "react";
import "../App.css";
import { utils, colors } from "../utils/utils";
import PlayNumber from "../components/PlayNumber";
import StarsDisplay from "../components/StarsDisplay";
import PlayAgain from "../components/PlayAgain";
import { useGameState } from "../customHook/customHook";

const StarMatch = (props) => {
  const { stars, availabeNums, candidateNums, secondsLeft, setGameState } =
    useGameState();

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus =
    availabeNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

  const numberStatus = (number) => {
    if (!availabeNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? "wrong" : "candidate";
    }
    return "available";
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    const newCandidatesNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidatesNums);
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
      <div className="timer">Time Remaining:{secondsLeft}</div>
    </div>
  );
};

export default StarMatch;
