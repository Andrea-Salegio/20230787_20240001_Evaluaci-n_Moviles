import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { colors } from '../theme';
 
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Completa los campos');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <CustomInput label="Correo Electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <CustomInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomButton title="Ingresar" onPress={handleLogin} loading={loading} />
      <CustomButton title="Crear cuenta" variant="secondary" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 24, textAlign: 'center' }
});
 