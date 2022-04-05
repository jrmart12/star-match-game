import React, { useState, useEffect } from "react";
import { utils, colors } from "../utils/utils";

export const useGameState = () => {
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

  const setGameState = (newCandidatesNums) => {
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
  return { stars, availabeNums, candidateNums, secondsLeft, setGameState };
};
