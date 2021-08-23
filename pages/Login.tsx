import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { loginRoute } from '../routes';
import { masterStyles, loginStyles, burntOrange, lightOrange } from '../styles/master';
import { useHistory } from "react-router-native";
import { LinearGradient } from 'expo-linear-gradient';
import {useSelector, useDispatch } from 'react-redux';
import {errorMessage} from '../store/action';
import { Snackbar } from 'react-native-paper';
import BackButton from '../components/BackButton';
import AppTab from '../components/AppTab';


interface Props {}

const Login: React.FC<Props> = (props) => {
    const [nameValue, setNameValue] = React.useState<string>('');
    const [phoneValue, setPhoneValue] = React.useState<string>('');
    const [passwordValue, setPasswordValue] = React.useState<string>('');
    // const [optionValue, setOptionValue] = React.useState<string>('email');
    const [loginState, setLoginState] = React.useState<boolean>(true);
    const [hidePassState, setHidePassState] = React.useState<boolean>(true);

    let history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector(state => state);

    const loginClick = () => {
        // let result = loginRoute(phoneValue, passwordValue);
        // if (result == 1) {
        history.push('/shuffle')
        // }
    }

    const onDismissSnackBar = () => {
        dispatch(errorMessage(''))
    }

    const warningSnackbar = (<Snackbar
                            style={masterStyles.snackbarWarning}
                            visible={error != '' && error != undefined}
                            duration={5000}
                            onDismiss={onDismissSnackBar}
                            action={{
                                label: 'x',
                                onPress: onDismissSnackBar,
                                labelStyle: masterStyles.snackbarWarningText
                            }}>
                                <Text style={masterStyles.snackbarWarningText}>
                                    {error}
                                </Text>
                        </Snackbar>)

    const loginHeaderView = (
    <>
        <View style={[loginStyles.loginView, loginStyles.logoView]}>
            <Text style={[loginStyles.loginText, loginStyles.logoText, masterStyles.logo]}>
                NOOKS
            </Text>
        </View>
        {/* <View style={[loginStyles.loginView]}>
            <Text style={[loginStyles.loginText,loginStyles.sloganText]}>
            Rediscover New York
            </Text>
        </View> */}
    </>)

        if (loginState) {
            return (
                <View style={loginStyles.loginContainer}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={[burntOrange, lightOrange]}
                    style={loginStyles.linearBackground}
                    />
                {warningSnackbar}
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
                    value={phoneValue}
                    onChangeText={setPhoneValue}
                    autoCompleteType={"email"}
                    keyboardType={"email-address"}
                    textContentType={"emailAddress"}/>
                </View> */}
                <View style={[loginStyles.loginView, loginStyles.loginInput]}>
                    <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                                placeholder={"Phone number"}
                                placeholderTextColor='grey'
                                value={phoneValue}
                                onChangeText={setPhoneValue}
                                autoCompleteType={"cc-number"}
                                keyboardType={"phone-pad"}
                                textContentType={"telephoneNumber"}/>
                </View>
                <View style={[loginStyles.loginView]}>
                    <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                                placeholder={"Password"}
                                placeholderTextColor='grey'
                                textContentType="password"
                                value={passwordValue}
                                onChangeText={setPasswordValue}
                                secureTextEntry={hidePassState}/>
                </View>
                <View style={[loginStyles.loginView, loginStyles.actionView]}>
                    {/* <TouchableOpacity style = {loginStyles.loginButton}>
                        <Text style={loginStyles.loginButtonText}>
                        Sign up
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style = {loginStyles.loginButton} onPress={loginClick}>
                        <Text style={loginStyles.loginButtonText}>
                            GO
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[loginStyles.loginView]}>
                    <TouchableOpacity onPress={()=>setLoginState(false)}>
                        <Text style={[loginStyles.loginText, loginStyles.signupText]}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[loginStyles.loginView]}>
                    <TouchableOpacity onPress={()=>setLoginState(false)}>
                        <Text style={[loginStyles.loginText, loginStyles.signupText]}>
                            Sign up for an account
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    else {
        return (<View style={loginStyles.loginContainer}> 
            <LinearGradient
                // Background Linear Gradient
                colors={[burntOrange, lightOrange]}
                style={loginStyles.linearBackground}
                />
            <BackButton onPress={() => {setLoginState(true)}}/>
            {warningSnackbar}
            {loginHeaderView}
            <View style={[loginStyles.loginView, loginStyles.loginInput]}>
                    <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                                placeholder={"Name"}
                                placeholderTextColor='grey'
                                value={nameValue}
                                onChangeText={setNameValue}
                                autoCompleteType={"name"}
                                keyboardType={"default"}
                                textContentType={"telephoneNumber"}/>
            </View>
            <View style={[loginStyles.loginView, loginStyles.loginInput]}>
                    <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                                placeholder={"Phone number"}
                                placeholderTextColor='grey'
                                value={phoneValue}
                                onChangeText={setPhoneValue}
                                autoCompleteType={"cc-number"}
                                keyboardType={"phone-pad"}
                                textContentType={"telephoneNumber"}/>
            </View>
            <View style={[loginStyles.loginView]}>
                    <TextInput style={[loginStyles.loginText, loginStyles.emailInput]} 
                                placeholder={"Password"}
                                placeholderTextColor='grey'
                                textContentType="password"
                                value={passwordValue}
                                onChangeText={setPasswordValue}
                                secureTextEntry={hidePassState}/>
            </View>
            <View style={[loginStyles.loginView, loginStyles.actionView]}>
                    {/* <TouchableOpacity style = {loginStyles.loginButton}>
                        <Text style={loginStyles.loginButtonText}>
                        Sign up
                        </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style = {loginStyles.loginButton} onPress={loginClick}>
                        <Text style={loginStyles.loginButtonText}>
                            START
                        </Text>
                    </TouchableOpacity>
            </View>
            <View style={[loginStyles.loginView]} onTouchStart={()=>setLoginState(false)}>
                <Text style={[loginStyles.loginText, loginStyles.disclaimerText]}>
                    By creating an acoount you agree to the {"\n"} Terms & Conditions & Privacy Policy
                </Text>
            </View>
        </View>
        );
    }
}

export default Login;
