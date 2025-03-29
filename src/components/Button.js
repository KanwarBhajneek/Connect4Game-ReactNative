import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

function Button(props) {
  const { label = "Button", type, onPress, width } = props;

  const backgroundColorStyle =
    type === "WHITE" ? { backgroundColor: "white" } : {};

  const labelColorStyle = type === "WHITE" ? { color: "darkred" } : {};

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, backgroundColorStyle, { width }]}>
        <Text style={[styles.label, labelColorStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(Button);

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "cornflowerblue",
    borderRadius: 15,
    elevation: 5,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowColor: "lightgrey",
    shadowOpacity: 0.3,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5
  },
  label: {
    fontWeight: "bold",
    color: "white",
    fontSize: 13,
  },
});
