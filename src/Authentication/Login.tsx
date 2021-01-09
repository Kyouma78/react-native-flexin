import React, { useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextInput as RNTextInput } from 'react-native'

import { Box, Button, Container, Text } from '../components'
import TextInput from '../../src/components/Form/TextInput'
import Checkbox from '../../src/components/Form/Checkbox'
import Footer from './components/Footer'
import { AuthNavigationProps } from '../components/Navigation'
import { BorderlessButton } from 'react-native-gesture-handler'
import { CommonActions } from '@react-navigation/native'

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const Login = ({
  navigation,
}: AuthNavigationProps<"Login">) => {
  const password = useRef<RNTextInput>(null)
  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  )

  const {
    handleChange, handleBlur, handleSubmit, errors, touched, values, setFieldValue
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", remember: false },
    onSubmit: () =>
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }]
        })
      ),
  })
  return (
    <Container pattern={0} {...{footer}}>
      <Text variant="title1" textAlign="center" marginBottom="l">
        Welcome back
      </Text>
      <Text variant="body" textAlign="center"  marginBottom="l">
        Use your credentials below and login to your account
      </Text>
      <Box>
        <Box marginBottom="m">
          <TextInput
            icon="mail"
            placeholder="Enter your Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
          />
        </Box>
        <TextInput
          ref={password}
          icon="lock"
          placeholder="Enter your Password"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors.password}
          touched={touched.password}
          secureTextEntry
          autoCompleteType="password"
          autoCapitalize="none"
          returnKeyType="go"
          returnKeyLabel="go"
          onSubmitEditing={() => handleSubmit()}
        />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginVertical="m"
          alignItems="center"
        >
          <Checkbox
            label="Remember me"
            checked={values.remember}
            onChange={() => setFieldValue("remember", !values.remember)}
          />
          <BorderlessButton onPress={() => navigation.navigate("ForgotPassword")}>
            <Text variant="button" color="primary">Forgot password</Text>
          </BorderlessButton>
        </Box>
        <Box alignItems="center" marginTop="m">
          <Button
            variant="primary"
            onPress={handleSubmit}
            label="Log into your account"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Login