import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../config/axiosConfig'; // Import Axios instance
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AppNavigator';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { setUser } from '../../store/slices/userSlice';
type LoginCodeScreenNavigationProp = StackNavigationProp<StackParamList, 'LoginCodeScreen'>;
interface Props {
    route: {
      params: {
        username: string;
      };
    };
  }
  const LoginCodeScreen: React.FC = ({ route }: any) => {
    const { username } = route.params; // Phone number passed from LoginScreen
  const navigation = useNavigation<LoginCodeScreenNavigationProp>();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '']); // State for 4-digit OTP
  const [resendCooldown, setResendCooldown] = useState(30); // Countdown timer state

  // Refs for inputs
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [resendCooldown]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if available
    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit OTP.');
      return;
    }

    try {
        const response = await api.post('/account/login/', { username:username, password: code }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
          const { token, id, first_name, last_name, country, city } = response.data.data;
  
          // Store the token securely
          await AsyncStorage.setItem('token', token);
  
          // Update the Redux store with user data
          dispatch(setUser({ id, username, first_name, last_name, token, country, city }));
  
          // Redirect based on first_name
          if (!first_name) {
            navigation.navigate('CountrySelectScreen');
          } else {
            navigation.navigate('DashboardScreen');
          }
        } else {
          Alert.alert('Error', response.data.message || 'Something went wrong.');
        }
      } catch (error: any) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to connect to the server.');
      }
  };

  const resendOtp = async () => {
    if (resendCooldown > 0) return; // Prevent resend during cooldown

    const headers = {
        'Content-Type': 'application/json',
      };
      if (username){
    try {
        const response = await api.post('/account/register/', { username }, { headers });
  
        if (response.status === 200) {
            Alert.alert('Resent', `OTP has been sent again to ${username}.`);
            setResendCooldown(30); // Reset cooldown timer
        } else {
          Alert.alert('Error', response.data.message || 'Something went wrong.');
        }
      } catch (error) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to connect to the server.');
      }}

    
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>OTP Yoxlama</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{username} nömrəsinə kod göndərildi.</Text>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
          />
        ))}
      </View>

      <View style={styles.inlineContainer}>
  <Text style={styles.infoText}>Kod gəlmədi? </Text>
  <TouchableOpacity onPress={resendOtp} disabled={resendCooldown > 0}>
    <Text style={[styles.resendText, resendCooldown > 0 && styles.resendTextDisabled]}>
      {resendCooldown > 0
        ? `${resendCooldown} san sonra yenidən göndər`
        : 'Yenidən göndər'}
    </Text>
  </TouchableOpacity>
</View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleOtpSubmit}>
        <Text style={styles.continueButtonText}>Davam Et</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    inlineContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10, // Spacing from the next element
      },
      infoText: {
        fontSize: 14,
        color: '#999',
        marginRight: 5, // Space between the small text and the resend link
      },
      resendText: {
        fontSize: 14,
        color: '#5DD3BE',
        textAlign: 'center',
        textDecorationLine: 'underline',
      },
      resendTextDisabled: {
        color: '#ccc',
      },
      
      
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 70,
    paddingHorizontal: 20,  
  },
  otpInput: {
    width: 60,
    height: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
    backgroundColor: '#f9f9f9',
  },
  
  continueButton: {
    backgroundColor: '#5DD3BE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 100
  },
  continueButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default LoginCodeScreen;
