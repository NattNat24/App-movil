import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.58.105:8080/api/usuarios';

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(correo)) {
      Alert.alert('Error', 'Correo electrónico inválido');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña }),
      });

      const text = await response.text();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Contraseña incorrecta');
        } else if (response.status === 404) {
          throw new Error('Usuario no registrado');
        } else {
          throw new Error(text || 'Error al iniciar sesión');
        }
      }

      const data = JSON.parse(text);
      await AsyncStorage.setItem('usuario', JSON.stringify(data));
      Alert.alert(`Bienvenida, ${data.nombre}`);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/flower-logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenida a FemBalance</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico"
        placeholderTextColor="#888" 
        keyboardType="email-address" 
        value={correo} 
        onChangeText={setCorreo} 
        autoCapitalize="none"
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry 
        placeholderTextColor="#888" 
        value={contraseña} 
        onChangeText={setContraseña} 
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleRegister = async () => {
    if (!nombre || !correo || !contraseña) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!validateEmail(correo)) {
      Alert.alert('Error', 'Correo electrónico inválido');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, contraseña })
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text.includes("El correo ya está registrado") 
          ? "Este correo ya está en uso. Usa otro." 
          : `Error del servidor: ${text}`);
      }

      Alert.alert('Éxito', 'Usuario registrado correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro en FemBalance</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nombre Completo" 
        placeholderTextColor="#888" 
        value={nombre} 
        onChangeText={setNombre} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Correo electrónico" 
        placeholderTextColor="#888" 
        keyboardType="email-address" 
        value={correo} 
        onChangeText={setCorreo} 
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        secureTextEntry 
        placeholderTextColor="#888" 
        value={contraseña} 
        onChangeText={setContraseña} 
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF7EE',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#C6E5AD',
    padding: 14,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 15,
    color: '#555',
    fontSize: 16,
  },
});

export { LoginScreen, RegisterScreen };










