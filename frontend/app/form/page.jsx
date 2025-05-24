import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CheckBox, Slider } from 'react-native-elements';
import { useRouter } from 'expo-router';

const FormScreen = () => {
const stressDescriptions = {
  0: "0 - Unbelievable 😇",
  1: "1 - Excellent 😁",
  2: "2 - Very Good 😊",
  3: "3 - Good 🙂",
  4: "4 - Fair 😐",
  5: "5 - Average 😶",
  6: "6 - Slightly Stressed 😬",
  7: "7 - Stressed 😣",
  8: "8 - Very Stressed 😖",
  9: "9 - Extremely Stressed 😫",
  10: "10 - Critical 🆘"
};

  const router = useRouter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [contact, setContact] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState(5);
  const [waterIntake, setWaterIntake] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hadSurgery, setHadSurgery] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState('');

  const [consultations, setConsultations] = useState({
    cardiac: { consulted: null, details: '' },
    neuro: { consulted: null, details: '' },
    orthopedic: { consulted: null, details: '' },
    gastro: { consulted: null, details: '' },
    diabeties: { consulted: null, details: '' },
    dermatology: { consulted: null, details: '' },
  });

  const updateConsultation = (type, field, value) => {
    setConsultations(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const analyzeHealth = async () => {
    if (!name || !age || !gender || !contact || !issueDetails || !sleepHours || !mood || !waterIntake) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const OPENROUTER_API_KEY = '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';

      const consultationDetails = Object.entries(consultations)
        .map(
          ([type, data]) => `${type}: ${data.consulted || 'No response'}, Details: ${data.details || 'None'}`
        )
        .join('\n');

      const prompt = `As a health counselor, analyze this data: and also recommand a treatment plan for the patient. \n\n write name assesment is for  paitent name and instant first-aid for paitent 
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Contact: ${contact}
- Issue: ${issueDetails}
- Sleep: ${sleepHours} hours
- Mood: ${mood}
- Stress: ${stressLevel}/10
- Water: ${waterIntake} glasses
- Had Surgery: ${hadSurgery ? 'Yes' : 'No'}
- Surgery Details: ${surgeryDetails || 'N/A'}
- Consultations:
${consultationDetails}

Provide a 2-4 bullet point assessment with recommendations.`;

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const analysis = data.choices[0].message.content;

      router.push({
        pathname: '/result/page',
        params: { analysis },
      });
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Analysis Failed', error.message || 'Please check your API key and try again');
    } finally {
      setIsLoading(false);
    }
  };

  const renderConsultation = (type, label) => (
    <>
      <View style={styles.consultationRow}>
        <Text style={styles.consultationType}>{label}</Text>
        <View style={styles.consultationOptions}>
          <TouchableOpacity
            style={[styles.optionButton, consultations[type].consulted === 'yes' && styles.selectedOption]}
            onPress={() => updateConsultation(type, 'consulted', 'yes')}
          >
            <Text style={consultations[type].consulted === 'yes' ? styles.selectedOptionText : styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, consultations[type].consulted === 'no' && styles.selectedOption]}
            onPress={() => updateConsultation(type, 'consulted', 'no')}
          >
            <Text style={consultations[type].consulted === 'no' ? styles.selectedOptionText : styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={[styles.input, { marginTop: 5, marginBottom: 10 }]}
        placeholder="Details"
        value={consultations[type].details}
        onChangeText={text => updateConsultation(type, 'details', text)}
      />
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* LOGO AND TITLE */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}>Health Assessment</Text>
      </View>
      
    
      {/* Name & Age */}
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter full name" />
        </View>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Age</Text>
          <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Age" />
        </View>
      </View>

      {/* Gender & Contact */}
      <View style={styles.row}>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Gender</Text>
          {['male', 'female', 'other'].map(g => (
            <CheckBox
              key={g}
              title={g.charAt(0).toUpperCase() + g.slice(1)}
              checked={gender === g}
              onPress={() => setGender(g)}
              containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0 }}
            />
          ))}
        </View>
        <View style={[styles.inputContainer, { flex: 1 }]}>
          <Text style={styles.label}>Contact</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            placeholder="e.g. 0300-0000000"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* More Form Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Describe your issue</Text>
        <TextInput
          style={styles.input}
          value={issueDetails}
          onChangeText={setIssueDetails}
          placeholder="Symptoms, feelings, etc."
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sleep Hours</Text>
        <TextInput style={styles.input} value={sleepHours} onChangeText={setSleepHours} keyboardType="numeric" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mood</Text>
        <TextInput style={styles.input} value={mood} onChangeText={setMood} />
      </View>

 
<View style={styles.inputContainer}>
  <Text style={styles.label}>Stress Level: {stressDescriptions[stressLevel]}</Text>
  <Slider
    value={stressLevel}
    onValueChange={setStressLevel}
    maximumValue={10}
    minimumValue={0}
    step={1}
    thumbTintColor="blue"
    minimumTrackTintColor="#1E90FF"
    maximumTrackTintColor="#ccc"
  />
</View>


      <View style={styles.inputContainer}>
        <Text style={styles.label}>Water Intake (glasses)</Text>
        <TextInput style={styles.input} value={waterIntake} onChangeText={setWaterIntake} keyboardType="numeric" />
      </View>

        <View style={styles.inputContainer}>
      <CheckBox
        title="Have you had any surgery?"
        checked={hadSurgery}
        onPress={() => setHadSurgery(!hadSurgery)}
      />

      {hadSurgery && (
        <TextInput
          style={styles.dropdown}
          placeholder="Please provide surgery details"
          value={surgeryDetails}
          onChangeText={setSurgeryDetails}
          multiline
        />
      )}
    </View>

      {/* Consultations */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Have you Consulted for the following?</Text>
        {renderConsultation('cardiac', 'Cardiac')}
        {renderConsultation('neuro', 'Neuro')}
        {renderConsultation('orthopedic', 'Orthopedic')}
        {renderConsultation('gastro', 'Gastro')}
        {renderConsultation('diabeties', 'Diabeties')}
        {renderConsultation('dermatology', 'Dermatology')}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={analyzeHealth} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>CONSULT</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
   dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  consultationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consultationType: {
    fontWeight: 'bold',
    flex: 1,
  },
  consultationOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  optionButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#1E90FF',
  },
  optionText: {
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
