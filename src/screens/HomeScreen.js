import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        setUsuario(JSON.parse(usuarioGuardado));
      }
    };
    obtenerUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    Alert.alert('Sesión cerrada');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenida, {usuario?.nombre || 'Usuaria'}</Text>
        <Icon name="heart" size={24} color="#D81159" style={styles.heartIcon} />
      </View>
      <Image source={require('../../assets/flower-logo.png')} style={styles.logo} />

      <View style={styles.gridContainer}>
        <TouchableOpacity style={[styles.featureButton, { backgroundColor: '#FF8FAB' }]} onPress={() => navigation.navigate('Ejercicios')}>
          <Icon name="meditation" size={40} color="#FFF" />
          <Text style={styles.buttonText}>Ejercicios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.featureButton, { backgroundColor: '#F4A7C1' }]} onPress={() => navigation.navigate('Consejos')}>
          <Icon name="heart" size={40} color="#FFF" />
          <Text style={styles.buttonText}>Bienestar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.featureButton, { backgroundColor: '#C6E5AD' }]} onPress={() => navigation.navigate('Diario')}>
          <Icon name="notebook" size={40} color="#FFF" />
          <Text style={styles.buttonText}>Diario</Text>
        </TouchableOpacity>

  
        <TouchableOpacity style={[styles.featureButton, { backgroundColor: '#A1D6E2' }]} onPress={() => navigation.navigate('Usuarios')}>
          <Ionicons name="person-circle-outline" size={28} color="#FFF" />
          <Text style={styles.buttonText}>Ver Usuarios - Datos dinámicos desde la API</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color="#FFF" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEF7EE',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D81159',
    textAlign: 'center',
  },
  heartIcon: {
    marginLeft: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureButton: {
    width: 120,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1BEE1',
    padding: 12,
    borderRadius: 25,
    width: '60%',
    justifyContent: 'center',
    marginTop: 25,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;



