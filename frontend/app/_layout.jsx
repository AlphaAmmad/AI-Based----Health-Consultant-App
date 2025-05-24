import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* All your screens like login, signup, form, result will automatically show here */}
    </Stack>
  );
}
