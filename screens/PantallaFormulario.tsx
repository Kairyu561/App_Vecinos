import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navegador';  // Ajusta la ruta según tu estructura
import { useNavigation } from '@react-navigation/native';

// Definir el tipo de props de la pantalla del formulario
type FormularioScreenProp = NativeStackNavigationProp<RootStackParamList, 'Formulario'>;

const FormularioReporte = () => {
  const navigation = useNavigation<FormularioScreenProp>();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('Mantencion de Calles');
  const [imagen, setImagen] = useState<string | null>(null);

  // Función para seleccionar una imagen desde la galería
  const seleccionarImagen = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response && response.assets && response.assets.length > 0) {
        setImagen(response.assets[0].uri ?? null);
      }
    });
  };

  // Función para obtener el ID de la categoría
  const obtenerIdCategoria = (categoria: string) => {
    switch (categoria) {
      case 'Mantencion de Calles':
        return 1;
      case 'Areas Verdes':
        return 2;
      case 'Asistencia Social':
        return 3;
      case 'Seguridad':
        return 4;
      default:
        return 0;  // Valor por defecto si no hay una categoría válida
    }
  };

  // Función para enviar el formulario
  const enviarFormulario = async () => {
    const fechaPublicacion = new Date().toISOString();
    const categoriaId = obtenerIdCategoria(categoria);

    const formData = new FormData();
    formData.append('usuario', '1');  // Ajusta según el ID del usuario actual
    formData.append('junta_vecinal', '1');  // Ajusta según corresponda
    formData.append('categoria', categoriaId.toString());
    formData.append('situacion', categoriaId.toString());
    formData.append('departamento', '1');  // Ajusta según corresponda
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
        navigation.goBack();  // Volver a la pantalla anterior
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Reportar</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el título"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la descripción"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Text style={styles.label}>Categoría</Text>
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

      <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
        <Text style={styles.imageButtonText}>Subir Evidencia Fotográfica</Text>
      </TouchableOpacity>
      {imagen && <Image source={{ uri: imagen }} style={styles.imagePreview} />}

      <Button title="Enviar Reporte" onPress={enviarFormulario} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
});

export default FormularioReporte;