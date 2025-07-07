import { useCreateNotionFile } from "@/hooks/useNotionFiles";
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

const Index = () => {
  const { createFile, isCreating, error } = useCreateNotionFile();
  const [success, setSuccess] = useState(false);

  const handleCreateDummy = async () => {
    setSuccess(false);
    try {
      await createFile({
        title: "Dummy Notion File 2",
        description: "This is a test file.",
        content: "Sample content for testing.",
        type: "page",
        cover_photo: "",
        icon: "🚀",
        parent_file_id: 1,
        order_index: 1,
      });
      setSuccess(true);
      Alert.alert("Success", "Dummy Notion file created!");
    } catch (e) {
      Alert.alert("Error", error || "Failed to create file");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#FAF9F6]">
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
        Welcome to Notion! <Text>👋</Text>
      </Text>
      <Button
        title={isCreating ? "Creating..." : "Create Dummy Notion File"}
        onPress={handleCreateDummy}
        disabled={isCreating}
      />
      {success && (
        <Text style={{ color: "green", marginTop: 16 }}>
          File created successfully!
        </Text>
      )}
      {error && <Text style={{ color: "red", marginTop: 16 }}>{error}</Text>}
    </View>
  );
};

export default Index;
