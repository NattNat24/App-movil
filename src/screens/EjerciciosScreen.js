import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Pantalla Principal de Ejercicios
const EjerciciosScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejercicios de Relajación</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RespiracionProfunda')}>
        <Ionicons name="cloud-outline" size={30} color="#FFF" />
        <Text style={styles.buttonText}>Respiración Profunda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MeditacionGuiada')}>
        <Ionicons name="flower-outline" size={30} color="#FFF" />
        <Text style={styles.buttonText}>Meditación Guiada</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RelaxMuscular')}>
        <Ionicons name="body-outline" size={30} color="#FFF" />
        <Text style={styles.buttonText}>Relajación Muscular</Text>
      </TouchableOpacity>
    </View>
  );
};

// Pantallas individuales para cada ejercicio
const RespiracionProfundaScreen = () => (
  <View style={styles.exerciseContainer}>
    <Ionicons name="cloud-outline" size={80} color="#6A994E" />
    <Text style={styles.title}>Respiración Profunda</Text>
    <Text style={styles.description}>Inhala por 4 segundos, retén el aire y exhala lentamente.</Text>
  </View>
);

const MeditacionGuiadaScreen = () => (
  <View style={styles.exerciseContainer}>
    <Ionicons name="flower-outline" size={80} color="#D81159" />
    <Text style={styles.title}>Meditación Guiada</Text>
    <Text style={styles.description}>Relaja tu mente siguiendo un ritmo tranquilo de respiración.</Text>
  </View>
);

const RelaxMuscularScreen = () => (
  <View style={styles.exerciseContainer}>
    <Ionicons name="body-outline" size={80} color="#FF8FAB" />
    <Text style={styles.title}>Relajación Muscular</Text>
    <Text style={styles.description}>Tensa y relaja los músculos de tu cuerpo en ciclos de 10 segundos.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF7EE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C6E5AD',
    padding: 15,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  exerciseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF7EE',
    padding: 20,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export { EjerciciosScreen, RespiracionProfundaScreen, MeditacionGuiadaScreen, RelaxMuscularScreen };





