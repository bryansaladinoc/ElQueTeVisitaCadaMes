import React from 'react';
import { StyleSheet,  View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './views/Inicio';
import Nosotros from './views/Nosotros';

const Stack = createNativeStackNavigator();

const App =()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Inicio'
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F4511E'
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen name='Inicio' component={Inicio} options={{title: 'Componente Principal'}}/>
        <Stack.Screen name='Nosotros' component={Nosotros} options={
          ({route}) => ({
            title: route.params.clienteId.toString()
          })
        }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
