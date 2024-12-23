import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import api from '../../config/axiosConfig'; // Import Axios instance
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/AppNavigator';
import { Picker } from '@react-native-picker/picker';

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, 'First'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [countryPrefix, setCountryPrefix] = useState('+994'); // Default prefix
  const [phone, setPhone] = useState('');


  const countryPrefixes = [
    { label: '+1 (USA)', value: '+1' },
    { label: '+91 (India)', value: '+91' },
    { label: '+44 (UK)', value: '+44' },
    { label: '+81 (Japan)', value: '+81' },
  ];


  const handleContinue = async () => {
    const username = `${countryPrefix}${phone}`;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (phone){

    try {
      const response = await api.post('/account/register/', { username }, { headers });

      if (response.status === 200) {
        Alert.alert('Success', 'Registration request sent.');
        navigation.navigate('LoginCodeScreen', { username });
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to connect to the server.');
    }}
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('First')}>
        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Telefon nömrəsi daxil edin!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Biz hər kəsin Acteezer-də real olduğundan əmin olaraq auditoriyanı qoruyuruq.</Text>

      {/* Input with Dropdown */}
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.prefixInput}
          placeholder="+994" // Default placeholder
          value={countryPrefix}
          onChangeText={setCountryPrefix}
          keyboardType="phone-pad"
          editable={false} 
        />
        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Telefon nömrəsi"
          placeholderTextColor="#9D9FAD"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Davam Et</Text>
      </TouchableOpacity>

      {/* Small Text with Lock Icon */}
      <View style={styles.lockContainer}>
        <Image source={require('../../assets/lock.png')} style={styles.lockIcon} />
        <Text style={styles.lockText}>
        Biz sizin şəxsi məlumatlarınızı tam məxfi saxlayırıq, heç bir 3-cü tərəflə paylaşmırıq.
        </Text>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
    prefixInput: {
        flex: 0.4, // Adjust width
        fontSize: 18,
        color: '#000',
        textAlign: 'center', // Center align the text
        paddingVertical: 10,
        backgroundColor: '#f5f5f50',
        borderRadius: 8,
        width: 15,

      },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: '#ddd',
        marginHorizontal: 10,
      },
    picker: {
        width: 90,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 0,
        marginRight: 5,
      },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    marginBottom: 14,
    marginTop: 150,
    textAlign:'left'
  },
  subtitle: {
    fontSize: 15,
    color: '#9D9FAD',
    marginBottom: 24,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    width: '100%',
    paddingLeft: 15,
  },
  dropdown: {
    width: 100, // Smaller width for dropdown
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    width: 120, // Smaller dropdown menu
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    height:'100%',
    paddingLeft: 10,
  },
  continueButton: {
    backgroundColor: '#5DD3BE', // Button background color
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%', // Match input width
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Button text color
  },
  lockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  lockIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  lockText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'left',
    flexShrink: 1, // Allow text to wrap if needed
  },
  explainText: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default LoginScreen;
