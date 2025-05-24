import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const SignupScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: '',
    age: '',
    nationality: '',
  });
  const [gender,setGender] = useState('')

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setErrors({ ...errors, [key]: '' }); // Clear error when typing
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Required check
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = `${key.replace('_', ' ')} is required`;
        valid = false;
      }
    });

    // Specific validations
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (form.password && form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (form.age && (isNaN(form.age) || parseInt(form.age) <= 0)) {
      newErrors.age = 'Age must be a positive number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = async () => {
    if (!validate()) {
      return; // Stop if validation fails
    }
    try {
      const response = await fetch('http://192.168.2.103:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        navigation.navigate('Login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error signing up.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Signup</Text>
      {['email', 'password', 'first_name', 'last_name',  'age', 'nationality'].map((field) => (
        <View key={field} style={{ width: '100%', marginBottom: 15 }}>
          <TextInput
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={form[field]}
            onChangeText={(value) => handleChange(field, value)}
            style={styles.input}
            secureTextEntry={field === 'password'}
            keyboardType={field === 'age' ? 'numeric' : 'default'}
          />
          {errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null}
        </View>
      ))}
    <View style={{   width: '100%',

    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderColor: '#0277bd',
    fontSize: 18, 
    marginBottom : 16}}>
  <RNPickerSelect
        onValueChange={(val) => handleChange('gender', val)}
        value={form.gender}
        placeholder={{ label: 'Select Gender', value: null }}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
       
      
    
  />
  {errors.gender ? <Text style={styles.errorText}>{errors.gender}</Text> : null}
</View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 280,
    height: 280,
    marginBottom: -80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#0277bd',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
  },
  signupButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0277bd',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#0277bd',
  },
  loginLink: {
    fontSize: 16,
    color: '#0277bd',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen;
