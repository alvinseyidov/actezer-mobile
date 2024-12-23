import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/AppNavigator'; 

type FirstScreenNavigationProp = StackNavigationProp<StackParamList, 'First'>;
const FirstStep: React.FC = () => {
   

  const navigation = useNavigation<FirstScreenNavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login'); // Redirects to the Login screen
  };

  return (
    <View style={styles.container}>
       
      <Text style={styles.welcomeText}>User Detail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default FirstStep;
