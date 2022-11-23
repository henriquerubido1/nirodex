import { StatusBar } from 'expo-status-bar';
import LabeledInput from '../components/LabeledInput';
import image from '../assets/bg.jpg';
import pokedexLogo from '../assets/pokedex.png';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ImageBackground,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Image,
} from 'react-native';

export default function LoginScreen({navigation}) {

  const [login, setLogin] = useState({
    nome: '',
    senha: ''
  });
  const [cadastro, setCadastro] = useState({
    nome: '',
    senha: ''
  });

  const [open, setOpen] = useState(false);

  const [logins, setLogins] = useState([
    {
      nome: 'Lais',
      senha: 'roma'
    },
    {
      nome: 'admin',
      senha: 'admin'
    },
    {
      nome: 'ash',
      senha: 'pikachu'
    },
  ]);

  const [erro, setErro] = useState('');

  const onPressEntrar = () => {
    let achou = false, valido = false;
    logins.map((value) => {
      if(value.nome == login.nome){
        achou = true;
        if(value.senha == login.senha){
          valido = true
          AsyncStorage.setItem('user', { logged: true, username: login.nome})
          navigation.navigate('Pokemons');
        }
      }
    })
    if(!achou){
      setErro('Usuário não cadastrado')
      return;
    }
    if(!valido){
      setErro('Senha inválida')
      return;
    }
  }

  const onPressCadastrar = () => {
    setLogin({
      nome: '',
      senha: '',
    })
    setOpen(true);
  }

  return (
    <>
      <View style={styles.pageContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Image
              style={styles.logo}
              source={pokedexLogo}
          />
          <View style={styles.loginPanel}>
            <TextInput placeholder='login' onChange={(e) => setLogin(prev => ({
                ...prev, nome: e.target.value
              }))}
            />
            <TextInput placeholder='senha' onChange={(e) => setLogin(prev => ({
                ...prev, senha: e.target.value
              }))}
            />
            <TouchableHighlight onPress={onPressEntrar}>
              <Text>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={onPressCadastrar}>
              <Text>Cadrastrar-se</Text>
            </TouchableHighlight>
            { erro != '' &&
              <Text style={styles.erro}>{erro}</Text>
            }
          </View>
        </ImageBackground>
      </View>
      <Modal 
        visible={open}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.shadow}>
          <View style={styles.modalView}>
          <TextInput placeholder='login' onChange={(e) => setCadastro(prev => ({
                ...prev, nome: e.target.value
              }))}
            />
            <TextInput placeholder='senha' onChange={(e) => setCadastro(prev => ({
                ...prev, senha: e.target.value
              }))}
            />
            <TouchableHighlight onPress={() => {
              let arr = logins;
              logins.push(cadastro);
              setLogins(arr);
              setOpen(false)
            }}>
              <Text>Cadastrar-se</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {setOpen(false)}}>
            <Text>Cancelar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    width: '100vw',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: 'center'
  },
  loginPanel: {
    backgroundColor: '#fefefe',
    width: '80%',
    borderRadius: '10px',
    maxWidth: '350px',
    padding: 10,
    gap: 15
  },
  erro: {
    color: 'red',
    textAlign: 'center'
  },
  shadow: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalView: {
    backgroundColor: '#fefefe',
    width: '80%',
    borderRadius: '10px',
    maxWidth: '350px',
    padding: 10,
    gap: 15
  },
  logo: {
    width: '80%',
    height: '8%',
    marginBottom: '15%',
    marginTop: '-30%',
  },
});
