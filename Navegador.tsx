import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantallaInicio from './screens/PantallaInicio';  // Asegúrate de que esté exportado como default
import PantallaFormulario from './screens/PantallaFormulario';  // Asegúrate de que esté exportado como default

export type RootStackParamList = {
  Inicio: undefined;
  Formulario: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen 
        name="Inicio" 
        component={PantallaInicio} 
        options={{ title: 'Inicio' }}
      />
      <Stack.Screen 
        name="Formulario" 
        component={PantallaFormulario} 
        options={{ title: 'Formulario de Reporte' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;