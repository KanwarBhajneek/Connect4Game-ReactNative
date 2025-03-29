import { isEmpty } from "lodash";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { store, updateName } from "../store/game";

function SelectorModal(props) {
  const { visible, setVisible, title, options, onSelection } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      supportedOrientations={["portrait", "landscape"]}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeader}>{title}</Text>
          </View>

          {options.map((option, index) => {
            return (
              <View style={styles.btn} key={"btn" + index}>
                <Button
                  title={option.label}
                  onPress={() => {
                    onSelection?.(option.val, option.label);
                    setVisible(false);
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

export default SelectorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  modal: {
    backgroundColor: "white",
    paddingHorizontal: 45,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "lightgrey",
  },
  modalHeader: {
    padding: 5,
  },
  btn: {
    margin: 4,
  },
});
