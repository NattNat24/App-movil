import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.58.105:8080/api/usuarios';

const DiarioScreen = () => {
  const [emocion, setEmocion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);
  const [diario, setDiario] = useState([]);

  useEffect(() => {
    const obtenerUsuario = async () => {
      const usuarioGuardado = await AsyncStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
        setUsuarioId(usuario.id);
        obtenerDiario(usuario.id);
      }
    };
    obtenerUsuario();
  }, []);

  const obtenerDiario = (id) => {
    fetch(`${API_URL}/${id}/diario`)
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setDiario(data);
        } else {
          setDiario([]); 
        }
      })
      .catch(error => {
        console.error('Error obteniendo el diario:', error);
        setDiario([]); 
      });
  };

  const guardarEntrada = () => {
    if (!emocion || !descripcion) {
      Alert.alert('Error', 'Por favor, selecciona una emoción y escribe una descripción.');
      return;
    }

    const nuevaEntrada = { emocion, descripcion, fecha: new Date().toLocaleDateString() };
    const nuevoDiario = [...diario, nuevaEntrada];

    fetch(`${API_URL}/${usuarioId}/diario`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoDiario),
    })
      .then(response => response.json())
      .then(() => {
        setDiario(nuevoDiario);
        setEmocion('');
        setDescripcion('');
        Keyboard.dismiss();
      })
      .catch(error => console.error('Error guardando entrada:', error));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
       
        <Text style={styles.label}>Selecciona tu emoción:</Text>
        <View style={styles.emojiContainer}>
          {['happy-outline', 'sad-outline', 'heart-outline', 'flash-outline', 'cloud-outline'].map((icon) => (
            <TouchableOpacity
              key={icon}
              onPress={() => setEmocion(icon)}
              style={[styles.emoji, emocion === icon && styles.selectedEmoji]}
            >
              <Ionicons name={icon} size={32} color={emocion === icon ? '#FFF' : '#6A994E'} />
            </TouchableOpacity>
          ))}
        </View>

        
        <Text style={styles.label}>Describe tu emoción:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe aquí..."
          placeholderTextColor="#888"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />

       
        <TouchableOpacity style={styles.button} onPress={guardarEntrada}>
          <Text style={styles.buttonText}>Guardar Entrada</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF7EE',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D81159',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-evenly',  
    alignItems: 'center',  
    width: '100%',  
    marginBottom: 20,  
  },
  emoji: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 50,  
    marginHorizontal: 10,  
  },
  selectedEmoji: {
    backgroundColor: '#D81159',  
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    textAlignVertical: 'top',
    height: 100,
  },
  button: {
    backgroundColor: '#C6E5AD',
    padding: 14,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DiarioScreen;






