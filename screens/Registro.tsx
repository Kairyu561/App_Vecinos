import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navegador';
import { useNavigation } from '@react-navigation/native';

type RegistroNavigationProp = NativeStackNavigationProp<RootStackParamList,'Registro'>
const Registro = () => {
  const navigation = useNavigation<RegistroNavigationProp>()  
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  

  const handleRegister = () => {
    if (!nombre || !rut || !contrasena || !correo || !telefono) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!/^[0-9]+-[0-9kK]$/.test(rut)) {
      Alert.alert('Error', 'El RUT no tiene el formato correcto');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(correo)) {
      Alert.alert('Error', 'El correo no es válido');
      return;
    }
    if (!/^\d+$/.test(telefono)) {
      Alert.alert('Error', 'El número de teléfono debe contener solo números');
      return;
    }
    
    Alert.alert('Registro exitoso', 'El usuario ha sido registrado correctamente');
  };

  return (
    <ImageBackground
      source={require('../assets/Registro.png')}
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>

          <Text style={styles.slogan}>Por un calama mas seguro</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresar nombre"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.flex1]}>
              <Text style={styles.label}>Rut</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresar rut"
                placeholderTextColor="#999"
                value={rut}
                onChangeText={setRut}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>N° telefono</Text>
            <TextInput
              style={styles.input}
              placeholder="Agregar telefono"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="ingresar correo"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={correo}
              onChangeText={setCorreo}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="ingrese una contraseña"
              placeholderTextColor="#999"
              secureTextEntry
              value={contrasena}
              onChangeText={setContrasena}
            />
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    color: '#14A199',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 24,
    color: '#E67E22',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  flex1: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    backgroundColor: '#1a237e',
    padding: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  input: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Registro;
