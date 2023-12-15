import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';

const DetallesCliente = ({navigation, route}) => {
  const { guardarConsultarApi } = route.params;
  const { nombre, telefono, correo, empresa, id } = route.params.item;

  const mostrarConfirmacion = () => {
    Alert.alert('¿Deseas eliminar este cliente?','Un contacto eliminado no se puede recuperar',[
      {text: 'Si eliminar', onPress: () =>{
        eliminarcontacto()
      }},
      {text: 'Cancelar', style:'cancel'}
    ]);
  }

  const eliminarcontacto = async () =>{
    const url =`http://192.168.71.121:3000/clientes/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error(error);
    }

    //redireccionar
    navigation.navigate('Inicio');

    //volver a consultar la api
    guardarConsultarApi(true)
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Empresa:
        <Subheading>{empresa}</Subheading>
      </Text>

      <Text style={styles.texto}>Correo:
        <Subheading>{correo}</Subheading>
      </Text>

      <Text style={styles.texto}>Telefono:
        <Subheading>{telefono}</Subheading>
      </Text>

      <Button mode='contained' icon='cancel' style={styles.boton} onPress={()=> mostrarConfirmacion()}> 
        Eliminar Cliente
      </Button>

      <FAB 
        icon="pencil"
        style={globalStyles.fab}
        onPress={() => navigation.navigate('NuevoCliente',{cliente: route.params.item, guardarConsultarApi})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red'
  }
});

export default DetallesCliente;