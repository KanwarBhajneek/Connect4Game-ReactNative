import React from "react";
import { View, StyleSheet } from "react-native";
import GameBoard from "../components/GameBoard";
import GameSideBar from "../components/GameSideBar";
function Tournament(props) {
  return (
    <View style={styles.tournament}>
      <GameBoard />
      <GameSideBar />
    </View>
  );
}

export default Tournament;

const styles = StyleSheet.create({
  tournament: {
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    overflow: 'hidden'
  },
});
