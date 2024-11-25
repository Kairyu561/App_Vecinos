import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Animated,
  ImageBackground,
  Dimensions
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navegador';
import { useNavigation } from '@react-navigation/native';

// Asume que tienes la imagen en esta ruta - ajusta según tu estructura de proyecto
const backgroundImage = require('../assets/logo.png');

type FormularioScreenProp = NativeStackNavigationProp<RootStackParamList, 'Formulario'>;
const FormularioReporte = () => {
  const navigation = useNavigation<FormularioScreenProp>();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Mantencion de Calles');
  const [imagen, setImagen] = useState<string | null>(null);

  const [uploadButtonScale] = useState(new Animated.Value(1));
  const [submitButtonScale] = useState(new Animated.Value(1));
const animateButton = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const seleccionarImagen = () => {
    animateButton(uploadButtonScale);
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response && response.assets && response.assets.length > 0) {
        setImagen(response.assets[0].uri ?? null);
      }
    });
  };

  const obtenerIdCategoria = (categoria: string) => {
    const categorias: { [key: string]: number } = {
      'Mantencion de Calles': 1,
      'Areas Verdes': 2,
      'Asistencia Social': 3,
      'Seguridad': 4,
    };
    return categorias[categoria] || 0;
  };

  const enviarFormulario = async () => {
    animateButton(submitButtonScale);
const formData = new FormData();
    const fechaPublicacion = new Date().toISOString();
    const categoriaId = obtenerIdCategoria(categoria);

    formData.append('usuario', '1');
    formData.append('junta_vecinal', '1');
    formData.append('categoria', categoriaId.toString());
    formData.append('situacion', categoriaId.toString());
    formData.append('departamento', '1');
    formData.append('descripcion', descripcion);
    formData.append('fecha_publicacion', fechaPublicacion);
    formData.append('titulo', titulo);
    formData.append('latitud', '-22.459850');
    formData.append('longitud', '-68.933800');

    if (imagen) {
      formData.append('imagen', {
        uri: imagen,
        type: 'image/jpeg',
        name: 'reporte.jpg',
      });
    }

    try {
      const response = await fetch('https://optimistic-strength-production.up.railway.app/api/publicaciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Reporte enviado', 'Su reporte ha sido enviado con éxito');
        setTitulo('');
        setDescripcion('');
        setCategoria('Mantencion de Calles');
        setImagen(null);
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        Alert.alert('Error', 'Hubo un problema al enviar el reporte');
      }
    } catch (error) {
      console.error('Error de red:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };
return (
    <View style={styles.container}>
      <Image 
        source={backgroundImage}
        style={[styles.backgroundImage, { opacity: 0.5 }]}
      />
      <View style={styles.content}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Atrás</Text>
        </TouchableOpacity>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el título"
            value={titulo}
            onChangeText={setTitulo}
            placeholderTextColor="#666"
          />
<Text style={styles.label}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ingrese la descripción"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Categoría</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={categoria}
              style={styles.picker}
              onValueChange={(itemValue) => setCategoria(itemValue)}
            >
              <Picker.Item label="Mantención de Calles" value="Mantencion de Calles" />
              <Picker.Item label="Áreas Verdes" value="Areas Verdes" />
              <Picker.Item label="Asistencia Social" value="Asistencia Social" />
              <Picker.Item label="Seguridad" value="Seguridad" />
            </Picker>
          </View>

          <Animated.View style={{ transform: [{ scale: uploadButtonScale }] }}>
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={seleccionarImagen}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Subir Evidencia Fotográfica</Text>
            </TouchableOpacity>
          </Animated.View>

          {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

          <Animated.View style={{ transform: [{ scale: submitButtonScale }] }}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={enviarFormulario}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Enviar Reporte</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View style={styles.footer} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    padding: 15,
    paddingBottom: 5,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#14A199',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },
  input: {
    borderColor: '#14A199',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#14A199',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
  },
  uploadButton: {
    backgroundColor: '#14A199',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#EB7722',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  footer: {
    height: 60,
    backgroundColor: '#14A199',
  },
});

export default FormularioReporte;