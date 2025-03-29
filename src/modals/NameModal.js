import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, TextInput, Button } from "react-native";
import { store, updateName } from "../store/game";

function NameModal(props) {
  const { visible, setVisible, player } = props;

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const onSave = () => {
    if (name.length < 3) {
      setError("Minimum 3 chars required");
      return;
    }
    store.dispatch(updateName({ name, player }));
    setVisible(false);
  };

  const onCancel = () => setVisible(false);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeader}>
              Enter your name Player {player}
            </Text>
          </View>

          <TextInput style={styles.input} onChangeText={setName} />
          {!isEmpty(error) && <Text style={styles.error}>{error}</Text>}
          <View style={styles.btnLayout}>
            <Button title={"Cancel"} color="darkred" onPress={onCancel} />
            <Button title={"Save"} color="green" onPress={onSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default NameModal;

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
  input: {
    borderWidth: 0.5,
    height: 35,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  btnLayout: {
    flexDirection: "row",
    paddingHorizontal: 20,
    margin: 10,
  },
  error:{
      color: 'darkred',

  }
});
