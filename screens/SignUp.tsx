import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {useFormik}from 'formik';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import {Button, Datepicker, IndexPath, Input, Select, SelectItem} from '@ui-kitten/components';
import {useState} from "react";
import {signUp, SignUpBody} from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const genders = ['Men', 'Women'];

export default function SignUp({ navigation }: RootStackScreenProps<'Login'>) {
  const {values, setFieldValue,handleChange} = useFormik({
    onSubmit:  async (values: SignUpBody) => {
      const userResponse = await signUp({...values, gender: genders[selectedIndex.row]});
      await AsyncStorage.setItem('AUTH_TOKEN', userResponse.data.token);
      navigation.replace('Root');
    }, initialValues: {}}
  );

    const [selectedIndex, setSelectedIndex] = useState([
      new IndexPath(0),
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.logInText}>Sign Up</Text>
      <Input onChangeText={handleChange('email')} style={styles.textField}  placeholder={'Login'}/>
        <Input onChangeText={handleChange('password')}  style={styles.textField} placeholder={'Password'}/>
        <Input  onChangeText={handleChange('name')}  style={styles.textField} placeholder={'Name'}/>
        <Datepicker
            style={styles.textField}
            placeholder={'Birth Day'}
            date={values.birthday}
            onSelect={nextDate => setFieldValue('birthday', nextDate)}
        />
      <Select
          style={styles.textField}
          value={genders[selectedIndex.row || 0]}
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}>
        {genders.map(gender=> <SelectItem title={gender} key={gender}/> )}
      </Select>

        <Button onPress={() => navigation.replace('Root')}>
            Sign Up
        </Button>

      <Button appearance={'ghost'} onPress={() => navigation.replace('Login')}>
        Log In
      </Button>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textField: {width: '100%', borderRadius: 4, padding: 8,  fontSize: 14, marginBottom: 12},
  logInText: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 36,
  },
  logInButton:
{width: '100%', borderRadius: 4, padding: 8, borderWidth:1, backgroundColor: 'blue', color: 'white', fontSize: 14, marginBottom: 12},
  logInButtonText: {
    color:'white',
    textAlign: 'center'
  }
});


const customPickerStyles = StyleSheet.create({
  inputAndroidContainer: {width: 370},
    inputAndroid: {width: '100%', borderRadius: 4, padding: 8, borderWidth:1, borderColor: 'black', fontSize: 14, marginBottom: 12},
});