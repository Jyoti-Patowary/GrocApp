import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors } from '@utils/Constants';
import { screenHeight, screenWidth } from '@utils/Scaling';
import Logo from '@assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
})

const SplashScreen: FC = () => {
    const {user, setUser} = useAuthStore();

    const tokenCheck = async() => {
        const accessToken = tokenStorage.getString('access_token') as string;
        const refreshToken = tokenStorage.getString('refresh_token') as string;

        if(accessToken){
            
        }
        resetAndNavigate("CustomerLogin")
        return false;
    }
    useEffect(() =>{
    const fetchUserLocation = async() => {
        try {
            GeoLocation.requestAuthorization();
            tokenCheck()
        } catch (error) {
            Alert.alert('We need location services to give you better results');
        } 
    }
    const time = setTimeout(fetchUserLocation, 1000)
    return () => clearTimeout(time)
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>GROCAPP</Text>
      {/* <Image source={Logo} style={styles.logoImage} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  text: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoImage: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain', 
  }
});

export default SplashScreen;
