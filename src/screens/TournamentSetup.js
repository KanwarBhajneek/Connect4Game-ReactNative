import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionItem from "../components/ActionItem";
import Button from "../components/Button";
import PlayerCard from "../components/PlayerCard";
import NameModal from "../modals/NameModal";
import { store, startGame, setTotalGames, setTurn } from "../store/game";
import * as ScreenOrientation from "expo-screen-orientation";
import { noop } from "lodash";
import SelectorModal from "../modals/SelectorModal";
import { NUMBER_GAME_OPTIONS, TURN_OPTIONS } from "../constants";
import { useSelector } from "react-redux";

function TournamentSetup(props) {
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [numGamesVisible, setNumGamesVisible] = useState(false);
  const [turnModalVisible, setTurnModalVisible] = useState(false);

  const totalGames = useSelector((state) => state.totalGames);
  const turnLabel = useSelector((state) => state.turnLabel);
  const [player, setPlayer] = useState(1);
  const showNameModal = (val) => {
    setPlayer(val);
    setNameModalVisible(true);
  };

  const showGamesModal = () => {
    setNumGamesVisible(true);
  };

  const showTurnModal = () => {
    setTurnModalVisible(true);
  };
  const onStartGame = useCallback(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    ).catch(noop);
    store.dispatch(startGame());
  }, []);

  const gamesSelected = (val) => {
    store.dispatch(setTotalGames({ val }));
  };
  const turnSelected = (turn, label) => {
    store.dispatch(setTurn({ turn, label }));
  };

  return (
    <View style={styles.container}>
      <PlayerCard
        type={1}
        editable={true}
        onPress={() => showNameModal(1)}
        blocks={15}
      />
      <PlayerCard
        type={2}
        editable={true}
        onPress={() => showNameModal(2)}
        blocks={15}
      />
      <ActionItem
        title={"Number of Games"}
        subtitle={totalGames}
        blocks={15}
        onPress={showGamesModal}
      />
      <ActionItem
        title={"Who starts"}
        subtitle={turnLabel}
        blocks={15}
        onPress={showTurnModal}
      />
      <Button label={"Start Game"} onPress={onStartGame} />
      {nameModalVisible && (
        <NameModal
          player={player}
          setVisible={setNameModalVisible}
          visible={nameModalVisible}
        />
      )}
      {numGamesVisible && (
        <SelectorModal
          options={NUMBER_GAME_OPTIONS}
          title={"Number of Games"}
          onSelection={gamesSelected}
          visible={numGamesVisible}
          setVisible={setNumGamesVisible}
        />
      )}
      {turnModalVisible && (
        <SelectorModal
          options={TURN_OPTIONS}
          title={"Who starts?"}
          onSelection={turnSelected}
          visible={turnModalVisible}
          setVisible={setTurnModalVisible}
        />
      )}
    </View>
  );
}

export default TournamentSetup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
});
