import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground,
  Image,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navegador';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (rut === 'admin' && password === '1234') {
      setErrorMessage('');
      navigation.navigate('Inicio');
    } else {
      setErrorMessage('Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
          
          <Text style={styles.title}>Denuncia Ciudadana</Text>

          <TextInput
            style={styles.input}
            placeholder="Rut"
            value={rut}
            onChangeText={setRut}
            placeholderTextColor="#666"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666"
          />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
              <Text style={{ color: '#000', textAlign: 'center', marginTop: 20 }}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <View style={styles.rainbowBar} />
            <Text style={styles.footerText}>ILUSTRE MUNICIPALIDAD DE CALAMA</Text>
            <Text style={styles.footerSubText}>Vicuña Mackenna N° 2001.</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#E67E22',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  rainbowBar: {
    height: 4,
    width: '100%',
    backgroundColor: '#00ff00', // You'll need to create a gradient or image for the rainbow effect
    marginBottom: 10,
  },
  footerText: {
    color: '#009688',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerSubText: {
    color: '#009688',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LoginScreen;