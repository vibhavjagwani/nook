import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { masterStyles, loginStyles } from '../styles/master';
import { useHistory } from "react-router-native";

interface Props {}

const Signup: React.FC<Props> = (props) => {
    const [emailValue, setEmailValue] = React.useState<string>('');
    const [passwordValue, setPasswordValue] = React.useState<string>('');
    const [optionValue, setOptionValue] = React.useState<string>('email');

  return (
    <View style={loginStyles.loginContainer}>
        <View style={[loginStyles.loginView, loginStyles.logoView]}>
            <Text style={[loginStyles.loginText, loginStyles.logoText]}>
                FIESTA
            </Text>
        </View>
        <View style={[loginStyles.loginView]}>
            <Text style={[loginStyles.loginText,loginStyles.sloganText]}>
                Make memories. Publish 24 hours later.
            </Text>
        </View>
        <View style={[loginStyles.loginView, loginStyles.optionsView]}>
            <TouchableOpacity style={[loginStyles.optionsButton, optionValue === 'email' ? loginStyles.optionsButtonSelected : null]}>
                <Text style={loginStyles.loginText} onPress={() => setOptionValue('email')}>
                    Email
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[loginStyles.optionsButton, optionValue === 'phone' ? loginStyles.optionsButtonSelected : null]}>
                <Text style={loginStyles.loginText} onPress={() => setOptionValue('phone')}>
                    Phone
                </Text>
            </TouchableOpacity>
        </View>
        <View style={[loginStyles.loginView]}>
            <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                        placeholder={"email"}
                        placeholderTextColor='lightgrey'
                        value={emailValue}
                        onChangeText={setEmailValue}/>
        </View>
        <View style={[loginStyles.loginView]}>
            <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                        placeholder={"password"}
                        placeholderTextColor='lightgrey'
                        value={passwordValue}
                        onChangeText={setPasswordValue}/>
        </View>
        <View style={[loginStyles.loginView, loginStyles.actionView]}>
            <TouchableOpacity style = {loginStyles.loginButton}>
                <Text style={loginStyles.loginButtonText}>
                    Sign up
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {loginStyles.loginButton}>
                <Text style={loginStyles.loginButtonText}>
                    Log in
                </Text>
            </TouchableOpacity>
        </View>
        <View style={[loginStyles.loginView]}>
            <Text style={loginStyles.loginButtonText}>
                Don't have an account? Sign up here.
            </Text>
        </View>
        <View style={[loginStyles.loginView, loginStyles.termsView]}>
            <Text style={loginStyles.loginText}>
                By signing up, you agree to the Terms and Conditions and Privacy Policy.
            </Text>
        </View>
    </View>
  );
}

export default Signup;
