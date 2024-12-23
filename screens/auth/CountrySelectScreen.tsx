import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackParamList } from '../../navigation/AppNavigator';
import api from '../../config/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCountry } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const CountrySelectScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Get userId from Redux state
  const userId = useSelector((state: any) => state.user.id);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          console.error('No token found in AsyncStorage.');
          return;
        }

        // Make the API call with the token in the headers
        const response = await api.get('/core/country/list/', {
          headers: {
            Authorization: `Token ${token}`, // Add Token header
          },
        });

        if (response.status === 200) {
          setCountries(response.data);
          console.log('Countries:', response.data);
          setFilteredCountries(response.data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = async (country: any) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('No token found in AsyncStorage.');
        return;
      }

      const response = await api.patch(
        `/account/user/update/${userId}/`, // Use userId from Redux
        { country: country.id},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateCountry(country.id)); // Update Redux state
        navigation.navigate('FirstStep', { selectedCountry: country });
      } else {
        console.error('Error updating country:', response.data);
      }
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Country/Region</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search country"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Country List */}
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.code} // Assuming 'code' is a unique field
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.countryItem}
            onPress={() => handleCountrySelect(item)}
          >
            <Image source={{ uri: item.flag, cache: 'force-cache' }} style={styles.flag} />
            <Text style={styles.countryName}>{item.name}</Text>
            <Text style={styles.phoneCode}>{item.prefix}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
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
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flag: {
    width: 40,
    height: 30,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  phoneCode: {
    fontSize: 14,
    color: '#888',
    textAlign: 'right',
  },
});

export default CountrySelectScreen;
