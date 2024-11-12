import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// You can use icons from a library like @expo/vector-icons or react-native-vector-icons
// Import the icons you need for the status indicators and menu

const denuncias = [
  { id: '1', codigo: 'NK#0678', titulo: 'Poste caido', estado: 'urgente' },
  { id: '2', codigo: 'NK#0679', titulo: 'Ventana Mal..', estado: 'pendiente' },
  { id: '3', codigo: 'NK#0676', titulo: 'Persona ro...', estado: 'completado' },
  { id: '4', codigo: 'NK#0680', titulo: 'Persona ro...', estado: 'completado' },
  { id: '5', codigo: 'NK#0673', titulo: 'Colision e...', estado: 'urgente' },
  { id: '6', codigo: 'NK#0674', titulo: 'Persona...', estado: 'pendiente' },
  { id: '7', codigo: 'NK#0673', titulo: 'Persona ro...', estado: 'completado' },
];

const getStatusColor = (estado: string) => {
  switch (estado) {
    case 'urgente':
      return '#FFD5D5';
    case 'pendiente':
      return '#FFE9D5';
    case 'completado':
      return '#D5FFD8';
    default:
      return '#FFFFFF';
  }
};

const getStatusIcon = (estado: string) => {
  switch (estado) {
    case 'urgente':
      return '⚠️';
    case 'pendiente':
      return '⚠️';
    case 'completado':
      return '✓';
    default:
      return '';
  }
};

const HistorialDenuncias = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>REGISTRO DENUNCIAS</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.columnHeader}>Estado</Text>
        <Text style={styles.columnHeader}>Código</Text>
        <Text style={styles.columnHeader}>Título</Text>
      </View>

      <FlatList
        data={denuncias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.item,
            { backgroundColor: getStatusColor(item.estado) }
          ]}>
            <View style={styles.itemContent}>
              <Text style={styles.statusIcon}>{getStatusIcon(item.estado)}</Text>
              <Text style={styles.codigo}>{item.codigo}</Text>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuIcon}>☰</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#E67E22',
  },
  headerTitle: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E67E22',
    textAlign: 'center',
    marginRight: 40, 
  },
  listHeader: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  columnHeader: {
    color: '#666',
    fontSize: 14,
    marginRight: 20,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  statusIcon: {
    fontSize: 18,
    marginRight: 10,
    width: 20,
  },
  codigo: {
    fontSize: 14,
    color: '#333',
    width: 80,
  },
  titulo: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  menuButton: {
    padding: 5,
  },
  menuIcon: {
    fontSize: 20,
    color: '#14A199',
  },
});

export default HistorialDenuncias;
