import React, { useCallback } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Button from "./Button";
import PlayerCard from "./PlayerCard";
import { STATUS, store, undo, reset, nextGame } from "../store/game";
import { useSelector } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { noop } from "lodash";

function GameSideBar(props) {
  const gameOver = useSelector((state) => state.result);
  const current = useSelector((state) => state.current);
  const allPlayerData = useSelector((state) => state.playerData);
  const playerData = useSelector((state) => state.playerData[current]);
  const gameNumber = useSelector((state) => state.currentGame);
  const totalGames = useSelector((state) => state.totalGames);
  const { width } = useWindowDimensions();
  const tournamentOver =
    gameNumber === totalGames && gameOver !== STATUS.NO_RESULT;
  const winner =
    allPlayerData[1].score !== allPlayerData[2].score
      ? allPlayerData[1].score > allPlayerData[2].score
        ? allPlayerData[1]
        : allPlayerData[2]
      : false;
  const onUndo = useCallback(() => {
    store.dispatch(undo());
  }, []);

  const onEndTournament = useCallback(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    ).catch(noop);
    store.dispatch(reset());
  }, []);

  const onNextGame = useCallback(() => {
    store.dispatch(nextGame());
  }, []);

  const drawCondition =
    (!tournamentOver && gameOver === STATUS.DRAW) ||
    (tournamentOver && !winner);

  const extended = width > 600 ? { width: 350 } : {};

  return (
    <View style={[styles.sidebar, extended]}>
      <Text style={styles.headline}>
        {gameNumber}/{totalGames} Game
      </Text>
      {gameOver === STATUS.WIN && !tournamentOver && (
        <>
          <Text style={styles.orangeText}>Congratulations!</Text>
          <Text>
            <Text style={styles.playerName}>{playerData.name}</Text> you won
            game {gameNumber}
          </Text>
        </>
      )}
      {drawCondition && (
        <>
          <Text style={styles.orangeText}>DRAW!</Text>
          <Text>Game was a draw!</Text>
        </>
      )}

      {tournamentOver && winner && (
        <>
          <Text style={styles.orangeText}>Congratulations!</Text>
          <Text>{winner.name} you won the Tournament</Text>
        </>
      )}
      <View style={styles.playerBlock}>
        <PlayerCard type={1} />
        <PlayerCard type={2} />
      </View>
      <Divider />
      <View style={styles.buttonBlock}>
        {gameOver === STATUS.NO_RESULT && (
          <Button label={"Undo"} onPress={onUndo} />
        )}
        {gameOver !== STATUS.NO_RESULT && gameNumber !== totalGames && (
          <Button label={"Next Game"} onPress={onNextGame} />
        )}
        <Button
          label={"End Tournament"}
          type="WHITE"
          onPress={onEndTournament}
        />
      </View>
    </View>
  );
}

const Divider = React.memo(() => {
  return <View style={styles.divider} />;
});

export default React.memo(GameSideBar);

const styles = StyleSheet.create({
  sidebar: {
    padding: 25,
    alignItems: "center",
    backgroundColor: "#eeeeee",
    width: 250,
  },
  headline: {
    fontSize: 20,
    color: "grey",
  },
  orangeText: {
    fontWeight: "bold",
    color: "orange",
    fontSize: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "lightgrey",
    marginVertical: 5,
  },
  buttonBlock: {
    width: "90%",
  },
  playerBlock: {
    width: "90%",
  },
  playerName: {
    fontWeight: "bold",
  },
});
