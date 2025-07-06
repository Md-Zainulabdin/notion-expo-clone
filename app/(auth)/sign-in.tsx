import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SignIn = () => {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
      });
      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/1024px-Notion-logo.svg.png",
        }}
        className="w-14 h-14 mb-6"
        style={{ resizeMode: "contain" }}
      />
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
        Welcome to Notion! <Text>👋</Text>
      </Text>
      <Text className="text-base text-gray-600 mb-6 text-center">
        Notion is a collaborative tool for{"\n"}notes, tasks, and wikis <Text>✍️</Text>
      </Text>
      <View className="w-full items-center">
        <TouchableOpacity
          className="flex-row items-center justify-center bg-blue-600 rounded-md py-3 px-4 w-full mb-3 shadow-sm"
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View className="mr-2">
            <Ionicons name="logo-google" size={20} color="white" />
          </View>
          <Text className="text-white font-bold text-base">Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white rounded-md py-3 px-4 w-full border border-gray-300 mb-4"
          onPress={handleAppleSignIn}
          activeOpacity={0.9}
        >
          <View className="mr-2">
            <Ionicons name="logo-apple" size={20} color="black" />
          </View>
          <Text className="text-black font-bold text-base">Continue with Apple</Text>
        </TouchableOpacity>
        <Text className="text-gray-500 text-xs text-center mt-2">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
};


export default SignIn;
