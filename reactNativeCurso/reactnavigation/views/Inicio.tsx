import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const Inicio = ({navigation}) => {

  const informacion = {
    clienteId: 20,
    totalPagar: 500
  }

  const visitarNostros = () =>{
    navigation.navigate('Nosotros', informacion);
  }

  return (
    <View style={styles.contenedor}>
      <Text>Inicio</Text>
      <Button title='Ir a Nosotros' onPress={() => visitarNostros()} />
    </View>
  );
};


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Inicio;