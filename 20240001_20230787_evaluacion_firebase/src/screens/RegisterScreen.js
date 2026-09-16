import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { saveUserProfile } from '../services/firestoreServices';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme';
 
export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({ fullName: '', birthDate: '', studentId: '', profilePicUrl: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
 
  const handleRegister = async () => {
    const { fullName, birthDate, studentId, profilePicUrl, email, password } = formData;
    if (!fullName || !birthDate || !studentId || !profilePicUrl || !email || !password) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserProfile(userCredential.user.uid, { fullName, birthDate, studentId, profilePicUrl, email });
      Alert.alert('Éxito', 'Registro completado');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <CustomInput label="Nombre Completo" value={formData.fullName} onChangeText={(t) => setFormData({...formData, fullName: t})} />
      <CustomInput label="Fecha de Nacimiento" value={formData.birthDate} onChangeText={(t) => setFormData({...formData, birthDate: t})} />
      <CustomInput label="Carnet Institucional" value={formData.studentId} onChangeText={(t) => setFormData({...formData, studentId: t})} />
      <CustomInput label="URL Imagen (Avatar)" value={formData.profilePicUrl} onChangeText={(t) => setFormData({...formData, profilePicUrl: t})} />
      <CustomInput label="Correo" value={formData.email} onChangeText={(t) => setFormData({...formData, email: t})} keyboardType="email-address" />
      <CustomInput label="Contraseña" value={formData.password} onChangeText={(t) => setFormData({...formData, password: t})} secureTextEntry />
      <CustomButton title="Registrarse" onPress={handleRegister} loading={loading} />
      <CustomButton title="Volver" variant="secondary" onPress={() => navigation.navigate('Login')} />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.text, marginBottom: 20, textAlign: 'center' }
});
 