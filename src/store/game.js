import { createSlice, configureStore } from "@reduxjs/toolkit";
import { cloneDeep, omit } from "lodash";
import { checkWin, emptyBoard } from "../utilities/utils";

const BOARD_SIZE = 8;

export const STATUS = {
  NO_RESULT: 0,
  DRAW: 1,
  WIN: 2,
};

const initialState = {
  value: 0,
  board: emptyBoard(BOARD_SIZE),
  firstMove: 1,
  current: 1,
  filled: 0,
  size: BOARD_SIZE,
  result: 0,
  winningPlayer: 0,
  currentGame: 0,
  totalGames: 3,
  drawCount: 0,
  playerData: {
    1: {
      name: "Player 1 Name",
      score: 0,
    },
    2: {
      name: "Player 2 Name",
      score: 0,
    },
  },
  lastMove: {},
  turnLabel: "Always Player 1",
  alternate: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    fillDot: (state, action) => {
      state.lastMove = cloneDeep(state);

      const { x, y } = action.payload;
      state.board[x][y] = state.current;
      if (checkWin(state.board, x, y)) {
        state.result = STATUS.WIN;
        state.playerData[state.current].score += 1;
        return;
      }
      state.filled += 1;
      if (state.filled === state.size * state.size) {
        state.result = STATUS.DRAW;
        state.drawCount += 1;
        return;
      }
      state.current == 1 ? (state.current = 2) : (state.current = 1);
    },
    undo: (state) => {
      if (Object.keys(state.lastMove).length === 0) return;
      const lastMove = state.lastMove;
      Object.assign(state, lastMove);
    },
    reset: () => initialState,
    nextGame: (state) => {
      const firstMove = state.alternate
        ? state.firstMove === 1
          ? 2
          : 1
        : state.firstMove;

      Object.assign(state, {
        ...initialState,
        playerData: state.playerData,
        firstMove: firstMove,
        current: firstMove,
        currentGame: state.currentGame + 1,
        totalGames: state.totalGames,
        drawCount: state.drawCount,
        playerData: state.playerData,
        alternate: state.alternate,
      });
    },
    updateName: (state, action) => {
      const { name, player } = action.payload;
      state.playerData[player].name = name;
    },
    startGame: (state) => {
      state.currentGame = 1;
    },
    setTotalGames: (state, action) => {
      const totalGames = action.payload.val;
      state.totalGames = totalGames;
    },
    setTurn: (state, action) => {
      const { turn, label } = action.payload;
      if (turn === "alternate") {
        state.alternate = true;
        state.turnLabel = label;
        return;
      }
      state.current = turn;
      state.firstMove = turn;
      state.turnLabel = label;
    },
  },
});

export const {
  fillDot,
  undo,
  reset,
  nextGame,
  updateName,
  startGame,
  setTotalGames,
  setTurn,
} = gameSlice.actions;

export const store = configureStore({
  reducer: gameSlice.reducer,
});
