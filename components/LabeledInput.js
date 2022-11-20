import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function LabeledInput(props) {
    const {
      onChange,
      label,
    } = props;

  return (
    <View style={styles.wrapper}>
        <Text>{label}</Text>
        <TextInput style={styles.input} onChange={onChange}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 5
  },
});
