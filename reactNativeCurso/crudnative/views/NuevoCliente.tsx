import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({ navigation, route }) => {
  const { guardarConsultarApi } = route.params;

  const [nombre, guardarNomber] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  //Detectar si se esta editando o creando uno nuevo
  useEffect(() => {
    if (route.params.cliente) {
      const { nombre, telefono, correo, empresa } = route.params.cliente;

      guardarNomber(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);

  /* almacena el cliente en la BD */
  const guardarCliente = async () => {
    //Validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }

    //Generar el cliente
    const cliente = { nombre, telefono, correo, empresa };

    //Si se esta editando o creando un nuevo cliente
    if (route.params.cliente) {
      const { id } = route.params.cliente;
      cliente.id = id;
      const url = `http://192.168.71.121:3000/clientes/${id}`;

      try {
        await axios.put(url,cliente);
      } catch (error) {
        console.error(error);
      }
    }else{
      //Guardar cliente en la API
      try {
        if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/clientes', cliente);
        } else {
          await axios.post('http://192.168.71.121:3000/clientes', cliente);
        }
      } catch (error) {
        console.error(error);
      }
    }

    //redireccionar
    navigation.navigate('Inicio');

    //Limpiar formulario
    guardarNomber('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    // cambiar a true para traernos el nuevo cliente
    guardarConsultarApi(true);
  }

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder='Juan'
        onChangeText={texto => guardarNomber(texto)}
        value={nombre}
        style={styles.input}
      />

      <TextInput
        label="Telefono"
        placeholder='+52 777 000 0000'
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />

      <TextInput
        label="Correo"
        placeholder='example@example.com'
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />

      <TextInput
        label="Empresa"
        placeholder='Nombre Empresa'
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button icon="pencil-circle" mode='contained' onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent'
  }
});

export default NuevoCliente;