import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  CheckBox,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
});

export default function PokemonCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();

  async function setFavorite(pokemon) {
    try {
      const favoritePokemons = await AsyncStorage.getItem('favoritePokemons');
      if (favoritePokemons === null) {
        setIsFavorite(true);
        await AsyncStorage.setItem('favoritePokemons', JSON.stringify(pokemon))
      } else {
        setIsFavorite(true);
        await AsyncStorage.setItem('favoritePokemons', [...favoritePokemons, JSON.stringify(pokemon)]);
      }
    } catch (e) {
      console.log('catch: ', e);
    }
  }

  return (
    <View>
      <TouchableHighlight
        onPress={ async () => await AsyncStorage
          .setItem('currentPokemon', JSON.stringify({ name: props.name, img: props.img }))
         .then(() => navigation.navigate("Pokemon"))
        }
      >
        <Text>{props.name}</Text>
      </TouchableHighlight>
      <Image
        style={styles.logo}
        source={props.img}
      />
      <CheckBox
        value={isFavorite}
        onValueChange={ () => setFavorite({ name: props.name, img: props.img }) }
      />
    </View>
  );
}