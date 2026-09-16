import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { getUserProfile, updateUserProfile } from '../services/firestoreServices.js';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { CustomCard } from '../components/CustomCard';
import { colors } from '../theme';
 
export default function DashboardScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const data = await getUserProfile(user.uid);
          setUserData(data);
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
 
  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await updateUserProfile(auth.currentUser.uid, userData);
      Alert.alert('Éxito', 'Información actualizada');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setUpdating(false);
    }
  };
 
  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {userData?.profilePicUrl ? <Image source={{ uri: userData.profilePicUrl }} style={styles.avatar} /> : null}
      
      <CustomCard>
        <CustomInput label="Nombre Completo" value={userData?.fullName || ''} onChangeText={(t) => setUserData({ ...userData, fullName: t })} />
        <CustomInput label="Fecha de Nacimiento" value={userData?.birthDate || ''} onChangeText={(t) => setUserData({ ...userData, birthDate: t })} />
        <CustomInput label="Carnet Institucional" value={userData?.studentId || ''} onChangeText={(t) => setUserData({ ...userData, studentId: t })} />
        <CustomInput label="URL de Imagen" value={userData?.profilePicUrl || ''} onChangeText={(t) => setUserData({ ...userData, profilePicUrl: t })} />
      </CustomCard>
 
      <CustomButton title="Guardar Cambios" onPress={handleUpdate} loading={updating} />
      <CustomButton title="Cerrar Sesión" variant="secondary" onPress={() => signOut(auth)} />
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 20, alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 16 },
  avatar: { width: 110, height: 110, borderRadius: 55, marginBottom: 12, borderWidth: 3, borderColor: colors.primary }
});
 