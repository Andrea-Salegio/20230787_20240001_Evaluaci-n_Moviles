import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme';
 
// CustomButton component with primary and secondary variants, and loading state
export const CustomButton = ({ title, onPress, variant = 'primary', loading }) => (
  <TouchableOpacity
    style={[styles.button, variant === 'secondary' ? styles.secondary : styles.primary]}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? <ActivityIndicator color={colors.white} /> : <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>{title}</Text>}
  </TouchableOpacity>
);
 
const styles = StyleSheet.create({
  button: { width: '100%', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginVertical: 8 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  text: { color: colors.white, fontSize: 16, fontWeight: '700' },
  secondaryText: { color: colors.primary }
});
 