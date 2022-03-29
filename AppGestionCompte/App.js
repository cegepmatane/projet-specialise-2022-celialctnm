import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import Accueil from "./Components/Accueil";
import Add from "./Components/Add";
import Contants from "expo-constants";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Modifier from "./Components/Modifier";
import Appareil from "./Components/Appareil";
import Depenses from "./Components/Depenses";

const Stack = createStackNavigator();

function App() {

  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen options={{
            title: 'Accueil',
            headerStyle: {
                backgroundColor: '#c7ccfc',
            },
            headerTintColor: '#030303',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} name="Accueil" component={Accueil}/>
        <Stack.Screen options={{
            title: 'Ajouter une dépense',
            headerStyle: {
                backgroundColor: '#c7ccfc',
            },
            headerTintColor: '#030303',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }} name="Ajouter" component={Add}/>


          <Stack.Screen options={{
              title: 'Modifier une dépense',
              headerStyle: {
                  backgroundColor: '#c7ccfc',
              },
              headerTintColor: '#030303',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }} name="Modifier" component={Modifier}/>

          <Stack.Screen options={{
              title: 'Prendre une photo',
              headerStyle: {
                  backgroundColor: '#c7ccfc',
              },
              headerTintColor: '#030303',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }} name="Appareil" component={Appareil}/>


          <Stack.Screen options={{
              title: 'Récapitulatif',
              headerStyle: {
                  backgroundColor: '#c7ccfc',
              },
              headerTintColor: '#030303',
              headerTitleStyle: {
                  fontWeight: 'bold',
              },
          }} name="Depenses" component={Depenses}/>
      </Stack.Navigator>
    </View>
  );
}

export default()=>{
  return(
          <NavigationContainer style={{backgroundColor: 'black'}}>
            <App/>
          </NavigationContainer>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:Contants.statusBarHeight,
      backgroundColor: 'black'
  },
});
