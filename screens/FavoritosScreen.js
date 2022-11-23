import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavoritosScreen() {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    async function getFavorites() {
      await AsyncStorage.getItem('favoritePokemons')
        .then((poke) => setPokemon(JSON.parse(poke)));
    }
    getFavorites();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ pokemon && pokemon.name }</Text>
      <Image source={ pokemon && pokemon.img } style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  logo: {
    width: 200,
    height: 200,
  },
});
