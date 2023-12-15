import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () =>{
  const [busqueda, guardarBusqueda]= useState({ciudad: '',pais: ''});
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const {ciudad, pais} = busqueda;
  const [bgColor, guardarBgcolor] = useState('rgb(71,149,212)');
  
  useEffect(() => {
    const consultarClima = async () => {
      if(consultar){
        const appId= '3b0c7ba67fb6aa71e21aa37c95d2a8ab';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        if(resultado.cod == '404'){
          mostrarAlerta('Error', 'No hay resultados intenta con otra ciudad o país',[{text: 'Ok'}]);
        }

        guardarResultado(resultado);
        guardarConsultar(false);

        // Modifica los colores de fondo basado en la temperatura
        const kelvin= 273.15;
        const {main} = resultado;
        const actual = main.temp - kelvin;

        if(actual < 10){
          guardarBgcolor('rgb(105,108,149)');
        }else if(actual >= 10 && actual < 25){
          guardarBgcolor('rgb(71,149,212)');
        }else{
          guardarBgcolor('rgb(178,28,61)');
        }
      }
    }

    consultarClima();
  },[consultar]);

  const mostrarAlerta = (title,msj,btns) => {
    Alert.alert(title,msj,btns);
  }

  const ocultarTeclado = () => { Keyboard.dismiss(); }

  const bgColorApp = {backgroundColor: bgColor};

  return (
    <TouchableWithoutFeedback onPress={()=> ocultarTeclado()}>

      <View style={[styles.app,bgColorApp ]}>
        <View style={styles.contenido}>
          <Clima
            resultado={resultado}
          />
          <Formulario 
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsulta={guardarConsultar}
            mostrarAlerta={mostrarAlerta}
          />
        </View>
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%',

  },
});

export default App;
