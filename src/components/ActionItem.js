import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";

function ActionItem(props) {
  const { title, subtitle, onPress, blocks = 10 } = props;
  let { height } = useWindowDimensions();
  const block = height / blocks;
  const dynamicAvatarStyle = {
    width: block,
    height: block,
    borderRadius: block / 2,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.avatar, dynamicAvatarStyle]}></View>
        <View style={styles.names}>
          <Text style={styles.labelText}>{title}</Text>
          <Text>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ActionItem);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 15,
    padding: 8,
    borderWidth: 2,
    borderColor: "lightgrey",
    backgroundColor: "#eeeeff",
    flexDirection: "row",
    width: "100%",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "lightblue",
    marginRight: 15,
  },
  labelText: {
    fontSize: 12,
    color: "black",
  },
  names: {
    marginRight: 10,
  },
});
