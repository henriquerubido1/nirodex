import axios from 'axios';
import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
 } from 'react-native';

 const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    margin: 'auto',
    fontWeight: 'bold',

  },
});

export default function PokemonsScreen({navigation}) {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const fetched = false;
  

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=251&offset=0');
        setPokemons(res.data.results);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [fetched]);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={ () => navigation.navigate('Favoritos')}
      >
        <Text style={styles.text}>Favoritos</Text>
      </TouchableHighlight>
      <TextInput
          style={styles.input}
          value={search}
          onChangeText={ e => { setSearch(e); setPokemons(pokemons.filter((pokemon) => pokemon.name.includes(search))); } }
          placeholder="search a Pokémon"
      />
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

