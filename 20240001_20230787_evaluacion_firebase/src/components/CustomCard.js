import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme';
 
// CustomCard component to wrap content in a styled card
export const CustomCard = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);
 
const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 16, padding: 20, width: '100%', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, marginVertical: 10 }
});
 