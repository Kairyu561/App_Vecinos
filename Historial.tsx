// HistorialDenuncias.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const denuncias = [
  { id: '1', titulo: 'Denuncia de ruido', fecha: '2024-10-01', estado: 'En proceso' },
  { id: '2', titulo: 'Basura en la vía pública', fecha: '2024-09-25', estado: 'Resuelto' },
  { id: '3', titulo: 'Vandalismo', fecha: '2024-08-15', estado: 'Pendiente' },
  // Agrega más denuncias simuladas si es necesario
];

const HistorialDenuncias = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Denuncias</Text>
      <FlatList
        data={denuncias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.detalles}>Fecha: {item.fecha}</Text>
            <Text style={styles.detalles}>Estado: {item.estado}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalles: {
    fontSize: 14,
    color: '#555',
  },
});

export default HistorialDenuncias;
