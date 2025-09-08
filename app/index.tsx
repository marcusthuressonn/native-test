import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link, Redirect } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'


export default function LandingPage() {
  return (
    <View style={styles.container}>
      <SignedIn>
        {/* Redirect signed-in users to the main app */}
        <Redirect href="/(app)/(tabs)" />
      </SignedIn>
      
      <SignedOut>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Your App</Text>
          <Text style={styles.subtitle}>Get started by signing in or creating an account</Text>
          
          <View style={styles.buttonContainer}>
            <Link href="/(auth)/sign-in" style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </Link>
            
            <Link href="/(auth)/sign-up" style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
