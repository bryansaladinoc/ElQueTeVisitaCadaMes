import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';

const Animacion2 = () => {
  const [animacion] = useState(new Animated.Value(0));
  
  useEffect(() =>{
    Animated.timing(
      animacion,{
        toValue: 450, // valor que llega
        duration: 1000, // cantidad de tiempo en llegar
        useNativeDriver: false
      }
    ).start();
  },[]);

  return (
    <Animated.View
      style={[styles.caja,{width: animacion, height: animacion}]}
    > 
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'cornflowerblue'
  }
});

export default Animacion2;