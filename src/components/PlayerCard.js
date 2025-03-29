import React from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
function PlayerCard(props) {
  const { type, editable, onPress, blocks = 10 } = props;
  const current = useSelector((state) => state.current);
  const playerData = useSelector((state) => state.playerData[type]);
  const turn = current === type;

  let { width, height } = useWindowDimensions();
  const block = height / blocks;
  const dynamicAvatarStyle = {
    width: block,
    height: block,
    borderRadius: block / 2,
  };

  return (
    <Clickable clickable={editable} onPress={onPress}>
      <View>
        <View
          style={[
            styles.container,
            type === 1 ? styles.player1 : styles.player2,
          ]}
        >
          <View
            style={[
              styles.avatar,
              turn && !editable ? styles.selected : styles.notselected,
              dynamicAvatarStyle,
            ]}
          >
            <View
              style={type === 1 ? styles.player1Avatar : styles.player2Avatar}
            />
          </View>
          <View style={styles.names}>
            <Text style={styles.labelText}>Player {type}</Text>
            <Text style={styles.playerName} numberOfLines={2}>{playerData.name}</Text>
          </View>
          {!editable && (
            <View style={styles.score}>
              <Text style={styles.labelText}>Score</Text>
              <Text>{playerData.score}</Text>
            </View>
          )}
        </View>
      </View>
    </Clickable>
  );
}

const Clickable = ({ children, clickable, onPress }) => {
  if (clickable) {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
  }
  return <View>{children}</View>;
};

export default React.memo(PlayerCard);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "lightgrey",
    width: "100%",
    flexDirection: "row",
    borderWidth: 2,
  },
  player1: { backgroundColor: "lightgreen" },
  player2: { backgroundColor: "lightyellow" },
  player1Avatar: {
    borderWidth: 4,
    flex: 1,
    borderRadius: 40,
    borderColor: "green",
  },
  player2Avatar: {
    borderWidth: 4,
    flex: 1,
    borderRadius: 40,
    borderColor: "yellow",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "lightgrey",
    marginRight: 15,
  },
  labelText: {
    fontSize: 12,
    color: "black",
  },
  selected: {
    borderWidth: 5,
    borderColor: "orange",
  },
  notselected: {},
  names: {
    marginRight: 10,
    paddingRight: 2
  },
  score: {
    alignItems: "flex-end",
    marginLeft: 'auto'
  },
  playerName:{
    width: 100,
    fontWeight: 'bold',
    fontSize: 12,
  }
});
