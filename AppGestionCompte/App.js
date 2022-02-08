import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import Accueil from "./Components/Accueil";
import Add from "./Components/Add";
import Contants from "expo-constants";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil}/>
        <Stack.Screen name="Ajouter" component={Add}/>
      </Stack.Navigator>
    </View>
  );
}

export default()=>{
  return(
          <NavigationContainer>
            <App/>
          </NavigationContainer>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEEDAC',
    marginTop:Contants.statusBarHeight,
  },
});
