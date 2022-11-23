import axios from 'axios';
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import {
  View,
  StyleSheet,
 } from 'react-native';

 const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});

export default function PokemonsScreen() {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () => {
		try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=251&offset=0');
      setPokemons(res.data.results);
		} catch (err) {
			console.log(err);
		}
	};

  useEffect(() => fetchPokemons(), []);

  return (
    <View style={styles.container}>
      { pokemons && pokemons.map((pokemon, index) => (
        <PokemonCard
          key={index}
          name={pokemon.name}
          img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${(index + 1).toString()}.png`}
        />
      )) }
    </View>
  );
}

