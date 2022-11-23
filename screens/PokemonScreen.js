import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

export default function PokemonScreen() {
  const [basicInfo, setBasicInfo] = useState({});
  const [pokemon, setPokemon] = useState({});
  
    async function getDetails(poke) {
      setBasicInfo(poke)
      const pokemonName = poke.name;
      const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`;
      await axios.get(url)
      .then((result) => setPokemon(result.data));
    }

  async function getCurrentPokemon() {
    await AsyncStorage.getItem('currentPokemon')
      .then((poke) => getDetails(JSON.parse(poke)));
  }

  useEffect(() => getCurrentPokemon(), []);

  return (
    <View>
      <Text>{ pokemon && pokemon.name }</Text>
      <Image style={ styles.logo } source={ pokemon && basicInfo.img } />
      <Text>{ pokemon && `capture rate: ${pokemon.capture_rate}` }</Text>
      <Text>{ pokemon && `dex number: ${pokemon.id}` }</Text>
      <Text>{ pokemon && `base happiness: ${pokemon.base_happiness}` }</Text>
    </View>
  );
}
