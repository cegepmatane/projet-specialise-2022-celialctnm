import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import Accueil from "./Components/Accueil";

export default function App() {

  return (
    <View style={styles.container}>
      <Text> Bienvenue dans votre gestionnaire de compte </Text>
      <Accueil/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
