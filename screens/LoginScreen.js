import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View, Modal } from 'react-native';
import LabeledInput from '../components/LabeledInput';
import image from '../assets/bg.jpg'
import { useState } from 'react';

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
          <View style={styles.loginPanel}>
            <LabeledInput label='Nome:' onChange={(e) => setLogin(prev => ({
                ...prev, nome: e.target.value
              }))}
            />
            <LabeledInput label='Senha:' onChange={(e) => setLogin(prev => ({
                ...prev, senha: e.target.value
              }))}
            />
            <Button title="Entrar" onPress={onPressEntrar}/>
            <Button title="Cadastrar" onPress={onPressCadastrar}/>
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
          <LabeledInput label='Nome:' onChange={(e) => setCadastro(prev => ({
                ...prev, nome: e.target.value
              }))}
            />
            <LabeledInput label='Senha:' onChange={(e) => setCadastro(prev => ({
                ...prev, senha: e.target.value
              }))}
            />
            <Button title="Cadastrar" onPress={() => {
              let arr = logins;
              logins.push(cadastro);
              setLogins(arr);
              setOpen(false)
            }}/>
            <Button title="Cancelar" onPress={() => {setOpen(false)}}/>
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
});
