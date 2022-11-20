import axios from 'axios';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default function PokemonsScreen() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
		try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
      setPokemons(res.data.results);
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => fetchPokemons(), []);

  return (
    <View style={styles.container}>
      { pokemons && pokemons.map((pokemon, index) => (
        <View>
          <Text>{pokemon.name}</Text>
          <Image
            style={styles.logo}
            source={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(index + 1).toString()}.png`}
          />
        </View>
      )) }
    </View>
  );
}

