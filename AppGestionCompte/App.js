import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import Accueil from "./Components/Accueil";
import Contants from "expo-constants";

export default function App() {

  return (
    <View style={styles.container}>
      <Accueil/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEEDAC',
    marginTop:Contants.statusBarHeight,
  },
});
