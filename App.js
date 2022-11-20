import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './pages/LoginScreen';
import PokemonsScreen from './pages/PokemonsScreen';
import PokemonScreen from './pages/PokemonScreen';
import FavoritosScreen from './pages/FavoritosScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Pokemons"
          component={PokemonsScreen}
          options={{ title: 'Pokemons' }}
        />
        <Stack.Screen
          name="Favoritos"
          component={FavoritosScreen}
          options={{ title: 'Favoritos' }}
        />
        <Stack.Screen
          name="Pokemon"
          component={PokemonScreen}
          options={{ title: 'Pokemon' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
