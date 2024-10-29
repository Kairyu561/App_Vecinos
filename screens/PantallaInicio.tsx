import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navegador';

type InicioScreenProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

const PantallaInicio = () => {
  const navigation = useNavigation<InicioScreenProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Pantalla de Inicio</Text>
      <Button 
        title="Ir al Formulario" 
        onPress={() => navigation.navigate('Formulario')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default PantallaInicio;