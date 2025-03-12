import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConsejosScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Consejos de Bienestar</Text>

      <Text style={styles.advice}>
        <Icon name="sleep" size={20} color="#5A3E36" /> Mantén una rutina de sueño saludable.
      </Text>
      <Text style={styles.advice}>
        <Icon name="water" size={20} color="#5A3E36" /> Hidrátate adecuadamente todos los días.
      </Text>
      <Text style={styles.advice}>
        <Icon name="food-apple" size={20} color="#5A3E36" /> Come alimentos ricos en vitaminas y minerales.
      </Text>
      <Text style={styles.advice}>
        <Icon name="yoga" size={20} color="#5A3E36" /> Practica ejercicios de relajación regularmente.
      </Text>
      <Text style={styles.advice}>
        <Icon name="book-open-variant" size={20} color="#5A3E36" /> Dedica tiempo para actividades que disfrutes.
      </Text>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#8B0000" />
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF7EE',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF0080',
    marginBottom: 20,
    textAlign: 'center',
  },
  advice: {
    fontSize: 18,
    color: '#333',
    backgroundColor: '#C1BEE1',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    textAlign: 'center',
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#8B0000',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ConsejosScreen;


