import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View } from 'react-native';

export default function LoginScreen({navigation}) {

  return (
    <View>
      <Text>
        Olá
      </Text>
      <Button
        title="Miguézão"
        color="#841584"
        accessibilityLabel="vem de niródex"
        onPress={ () => navigation.navigate('Pokemons') }
      />    
    </View>
  );
}

const styles = StyleSheet.create({
  
});
