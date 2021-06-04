import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { loginRoute } from '../routes';
import { masterStyles, loginStyles } from '../styles/master';
import { useHistory } from "react-router-native";

interface Props {}

const Login: React.FC<Props> = (props) => {
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [passwordValue, setPasswordValue] = React.useState<string>('');
    const [optionValue, setOptionValue] = React.useState<string>('email');

    let history = useHistory();

    const loginClick = () => {
        // let result = loginRoute(emailValue, passwordValue);
        // if (result == 1) {
        history.push('/shuffle')
        // }
    }

    const loginHeaderView = (
    <>
        <View style={[loginStyles.loginView, loginStyles.logoView]}>
            <Text style={[loginStyles.loginText, loginStyles.logoText]}>
                nook
            </Text>
        </View>
        <View style={[loginStyles.loginView]}>
            <Text style={[loginStyles.loginText,loginStyles.sloganText]}>
                Rediscover New York
            </Text>
        </View>
    </>)

  return (
    <View style={loginStyles.loginContainer}>
        {loginHeaderView}
        {/* <View style={[loginStyles.loginView, loginStyles.optionsView]}>
            <TouchableOpacity style={[loginStyles.optionsButton, optionValue === 'email' ? loginStyles.optionsButtonSelected : null]}
                              onPress={() => setOptionValue('email')}>
                <Text style={loginStyles.loginText}>
                    Email
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[loginStyles.optionsButton, optionValue === 'phone' ? loginStyles.optionsButtonSelected : null]}
                              onPress={() => setOptionValue('phone')}>
                <Text style={loginStyles.loginText}>
                    Phone
                </Text>
            </TouchableOpacity>
        </View> */}
        {/* <View style={[loginStyles.loginView]}>
            <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                        placeholder={"email or username"}
                        placeholderTextColor='lightgrey'
                        value={emailValue}
                        onChangeText={setEmailValue}
                        autoCompleteType={"email"}
                        keyboardType={"email-address"}
                        textContentType={"emailAddress"}/>
        </View> */}
        <View style={[loginStyles.loginView, loginStyles.loginInput]}>
            <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                        placeholder={"phone number"}
                        placeholderTextColor='grey'
                        value={emailValue}
                        onChangeText={setEmailValue}
                        autoCompleteType={"email"}
                        keyboardType={"email-address"}
                        textContentType={"emailAddress"}/>
        </View>
        <View style={[loginStyles.loginView]}>
            <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                        placeholder={"password"}
                        placeholderTextColor='grey'
                        textContentType="password"
                        secureTextEntry={true}
                        value={passwordValue}
                        onChangeText={setPasswordValue}/>
        </View>
        <View style={[loginStyles.loginView, loginStyles.actionView]}>
            {/* <TouchableOpacity style = {loginStyles.loginButton}>
                <Text style={loginStyles.loginButtonText}>
                    Sign up
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style = {loginStyles.loginButton} onPress={loginClick}>
                <Text style={loginStyles.loginButtonText}>
                    Log in
                </Text>
            </TouchableOpacity>
        </View>
        <View style={[loginStyles.loginView]}>
            <Text style={loginStyles.loginText}>
                Don't have an account? Sign up here.
            </Text>
        </View>
        <View style={[loginStyles.loginView, loginStyles.termsView]}>
            <Text style={[loginStyles.loginText, loginStyles.loginInfoText]}>
                By signing up, you agree to the Terms and Conditions and Privacy Policy.
            </Text>
        </View>
    </View>
  );
}

export default Login;
