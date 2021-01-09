import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import { AuthenticationRoutes } from "../components/Navigation"
import Onboarding, { assets as onBoardingAssets } from "./Onboarding"
import Welcome, { assets as welcomeAssets } from "./Welcome"
import Login from "./Login"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"
import PasswordChanged from "./PasswordChanged"
export const assets = [...onBoardingAssets, ...welcomeAssets]

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>()
export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen 
        name="Onboarding" 
        component={Onboarding}
        options={{
          headerTitleAlign:"center"
        }}
      />
      <AuthenticationStack.Screen 
        name="Welcome" 
        component={Welcome}
        options={{
          headerTitleAlign:"center"
        }}
      />
      <AuthenticationStack.Screen 
        name="Login" 
        component={Login}
        options={{
          headerTitleAlign:"center"
        }}
      />
      <AuthenticationStack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{
          headerTitleAlign:"center"
        }}
      />
      <AuthenticationStack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword}
        options={{
          headerTitleAlign:"center"
        }}
      />
      <AuthenticationStack.Screen 
        name="PasswordChanged" 
        component={PasswordChanged}
        options={{
          headerTitleAlign:"center"
        }}
      />
    </AuthenticationStack.Navigator>
  )
}