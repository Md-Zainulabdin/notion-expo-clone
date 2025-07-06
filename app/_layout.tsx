import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import "./globals.css";

import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(tabs)";

    if (isSignedIn && !inTabsGroup) {
      // Redirect to home if user is signed in but not in tabs
      router.replace("/(tabs)");
    } else if (!isSignedIn && inTabsGroup) {
      // Redirect to sign in if user is not signed in but in tabs
      router.replace("/sign-in");
    }
  }, [isSignedIn, segments, isLoaded]);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <>
      {/* Status Bar */}
      <StatusBar style="auto" />

      {/* Safe Area View */}
      <ClerkProvider tokenCache={tokenCache}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <InitialLayout />
          </SafeAreaView>
        </SafeAreaProvider>
      </ClerkProvider>
    </>
  );
}
