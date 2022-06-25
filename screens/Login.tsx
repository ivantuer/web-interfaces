import {StyleSheet} from 'react-native';
import {useFormik}from 'formik';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import {Button, Input, } from '@ui-kitten/components';
import {logIn, LogInBody} from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: RootStackScreenProps<'Login'>) {
    const {values, handleChange,handleSubmit} = useFormik<LogInBody>({
        onSubmit: async (values: LogInBody) => {
            console.log(values)
                    const userResponse = await logIn(values);
                    console.log(userResponse)
                    await AsyncStorage.setItem('AUTH_TOKEN', userResponse.data.token);
                    navigation.replace('Root')
                },
         initialValues: {email: '', password: ''}}
    );




    return (
        <View style={styles.container}>
            <Text style={styles.logInText}>Log In</Text>
            <Input value={values.email} onChangeText={handleChange('email')} style={styles.textField}  placeholder={'Login'}/>
            <Input  value={values.password} onChangeText={handleChange('password')}  style={styles.textField} placeholder={'Password'}/>

            <Button onPress={() => handleSubmit()}>
                Log In
            </Button>

            <Button appearance={'ghost'} onPress={() => navigation.replace('SignUp')}>
                Sign Up
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