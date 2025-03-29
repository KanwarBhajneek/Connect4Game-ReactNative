import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Tournament from "./Tournament";
import TournamentSetup from "./TournamentSetup";

function GameController(props) {
  const currentGame = useSelector((state) => state.currentGame);

  return (
    <View>{currentGame === 0 ? <TournamentSetup /> : <Tournament />}</View>
  );
}

export default GameController;
