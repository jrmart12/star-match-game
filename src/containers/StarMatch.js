import React, { useState, useEffect } from "react";
import "../App.css";
import { utils, colors } from "../utils/utils";
import PlayNumber from "../components/PlayNumber";
import StarsDisplay from "../components/StarsDisplay";
import PlayAgain from "../components/PlayAgain";

const StarMatch = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availabeNums, setavailabeNums] = useState(utils.range(1, 9));
  const [candidateNums, setcandidateNums] = useState([]);
  const [secondsLeft, setsecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availabeNums.length > 0) {
      const timerId = setTimeout(() => {
        setsecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [secondsLeft, availabeNums]);

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

    if (utils.sum(newCandidatesNums) !== stars) {
      setcandidateNums(newCandidatesNums);
    } else {
      const newAvailableNums = availabeNums.filter(
        (available) => !newCandidatesNums.includes(available)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setavailabeNums(newAvailableNums);
      setcandidateNums([]);
    }
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
