import React from 'react';
import { } from 'react-native';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesCliente from './views/DetallesCliente';
import BarraSuperior from './components/ui/Barra';

const Stack = createNativeStackNavigator();

//Definir tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

const App = () => {

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Inicio'
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: theme.colors.primary
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}
        >

          <Stack.Screen
            name='Inicio'
            component={Inicio}
          />

          <Stack.Screen
            name='NuevoCliente'
            component={NuevoCliente}
            options={{title: "Nuevo Cliente"}}
          />

          <Stack.Screen
            name='DetallesCliente'
            component={DetallesCliente}
            options={{
              title: "Detalles Cliente"
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
