import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreen, RegisterScreen } from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { EjerciciosScreen, RespiracionProfundaScreen, MeditacionGuiadaScreen, RelaxMuscularScreen } from './src/screens/EjerciciosScreen';
import ConsejosScreen from './src/screens/ConsejosScreen';
import DiarioScreen from './src/screens/DiarioScreen';
import UserListScreen from "./src/screens/UserListScreen";



const Stack = createStackNavigator();

const App = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verificarSesion = async () => {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
      setLoading(false);
    };

    verificarSesion();
  }, []);

  if (loading) return null; 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={usuario ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Ejercicios" component={EjerciciosScreen} />
        <Stack.Screen name="RespiracionProfunda" component={RespiracionProfundaScreen} />
        <Stack.Screen name="MeditacionGuiada" component={MeditacionGuiadaScreen} />
        <Stack.Screen name="RelaxMuscular" component={RelaxMuscularScreen} />
        <Stack.Screen name="Consejos" component={ConsejosScreen} />
        <Stack.Screen name="Diario" component={DiarioScreen} />
        <Stack.Screen name="Usuarios" component={UserListScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


