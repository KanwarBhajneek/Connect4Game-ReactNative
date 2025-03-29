import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { fillDot, store } from "../store/game";

function GameBoard(props) {
  const board = useSelector((state) => state.board);
  const gameOver = useSelector((state) => state.result);

  let { width, height } = useWindowDimensions();
  height = Math.min(width, height) - 80;
  const dotSize = Math.floor(height / board.length);
  const dynamicSize = { height, widht: height };

  const createDots = () => {
    let viewBoard = [];
    for (let i = 0; i < board.length; i++) {
      let row = [];
      for (let j = 0; j < board[0].length; j++) {
        row.push(
          <Dot
            key={i + "-" + j}
            x={i}
            y={j}
            selected={board[i][j]}
            size={dotSize}
          />
        );
      }
      viewBoard.push(
        <View key={"row" + i} style={styles.row}>
          {row}
        </View>
      );
    }

    return (
      <View style={[styles.dotContainer, dynamicSize]}>
        <View style={[styles.dotBackground, dynamicSize]} />
        {viewBoard}
      </View>
    );
  };

  return (
    <View style={styles.board}>
      {createDots()}
      {gameOver !== 0 && <View style={styles.mask} />}
    </View>
  );
}

const Dot = React.memo(({ x, y, selected, size }) => {
  const onPress = () => {
    if (selected) return;
    store.dispatch(fillDot({ x, y }));
  };

  const selectedStyle = () => {
    switch (selected) {
      case 1:
        return styles.player1;
      case 2:
        return styles.player2;
      default:
        return styles.unselected;
    }
  };

  const dotSizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.dot, selectedStyle(), dotSizeStyle]}></View>
    </TouchableOpacity>
  );
});

export default React.memo(GameBoard);

const styles = StyleSheet.create({
  dot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderColor: "cornflowerblue",
    borderWidth: 4,
  },
  dotBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderWidth: 10,
    borderColor: "white",
    backgroundColor: "cornflowerblue",
    borderRadius: 25,
  },
  dotContainer: {
    position: "relative",
    margin: 20,
  },
  row: {
    flexDirection: "row",
  },
  board: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  player1: {
    backgroundColor: "darkgreen",
  },
  player2: {
    backgroundColor: "yellow",
  },
  mask: {
    position: "absolute",
    top: 0,
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    opacity: 0.3,
    borderRadius: 20,
  },
});
