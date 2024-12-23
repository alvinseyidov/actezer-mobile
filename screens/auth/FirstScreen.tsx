import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/AppNavigator'; 

type FirstScreenNavigationProp = StackNavigationProp<StackParamList, 'First'>;
const FirstScreen: React.FC = () => {
   

  const navigation = useNavigation<FirstScreenNavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login'); // Redirects to the Login screen
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/logo.png')} // Replace with your logo
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>Acteezer</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
        İnsanları bir araya gətirən, birlikdə unudulmaz anlar yaşadacaq platforma!
        </Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.googleButton} onPress={() => console.log('Google Login')}>
          <Image source={require('../../assets/google.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Google ilə giriş</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.facebookButton}
          onPress={() => console.log('Facebook Login')}
        >
          <Image source={require('../../assets/facebook.png')} style={styles.buttonIcon} />
          <Text style={[styles.buttonText, styles.facebookButtonText]}>Facebook ilə giriş</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton} onPress={() => console.log('Apple Login')}>
          <Image source={require('../../assets/apple.png')} style={[styles.buttonIcon, { tintColor: 'black' }]} />
          <Text style={[styles.buttonText, styles.appleButtonText]}>Apple ilə giriş</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.phoneButton} onPress={handleLogin}>
          <Image source={require('../../assets/sms.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Telefon nömrəsi ilə giriş</Text>
        </TouchableOpacity>

        {/* Terms and Conditions */}
        <Text style={styles.terms}>
        Davam etməklə, <Text style={styles.link}>razılaşmalarımızı</Text> qəbul etdiyinizi təsdiqləyirsiniz.
        </Text>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1877F2', // Facebook blue
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  facebookButtonText: {
    color: '#fff', // White text for Facebook button
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  appleButtonText: {
    color: 'black', // Black text for Apple button
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  terms: {
    marginTop: 20,
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  link: {
    color: '#fff', // White text
    textDecorationLine: 'none', // No underline
  },
});

export default FirstScreen;

