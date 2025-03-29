import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/game';
import GameController from './src/screens/GameController';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <GameController />
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "lightgrey",
  }
});
