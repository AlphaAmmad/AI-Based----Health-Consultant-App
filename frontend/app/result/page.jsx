import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ResultScreen = () => {
  const { analysis } = useLocalSearchParams();
  const router = useRouter();

  const formatAnalysis = (text) => {
    if (!text) return null;
    
    // Split by bullet points or dashes
    const points = text.split(/\n-|\n•|\n\*|\n\d+\./).filter(point => point.trim());
    
    return points.map((point, index) => (
      <View key={index} style={styles.pointContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.pointText}>{point.trim()}</Text>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Health Analysis Report</Text>
      
      <View style={styles.resultContainer}>
        {analysis ? (
          formatAnalysis(analysis)
        ) : (
          <Text style={styles.noResults}>No analysis results available.</Text>
        )}
      </View>

     <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('login/login')} 
      >
        <Text style={styles.buttonText}>Exit app</Text>
      </TouchableOpacity>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a4d8e',
    marginBottom: 30,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#d0d9e8',
    marginBottom: 20,
  },
  pointContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
    color: '#3a7bd5',
  },
  pointText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3a7bd5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#3a7bd5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;