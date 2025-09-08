import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function ProtectedLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading or empty state while auth is loading
  if (!isLoaded) {
    return null; // You could show a loading spinner here
  }

  // Redirect to landing page if not signed in
  if (!isSignedIn) {
    return <Redirect href="/" />;
  }

  // User is authenticated, show the app
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
      <Stack.Screen
        name="moment-detail"
        options={{
          presentation: 'modal',
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack>
  );
}
