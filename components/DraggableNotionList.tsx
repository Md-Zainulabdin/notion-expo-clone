import { useNotionFiles } from "@/hooks/useNotionFiles";
import { NotionFile } from "@/lib/types";
import { ActivityIndicator, Text, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import DraggableNotionListItem from "./DraggableNotionListItem";

export default function DraggableNotionList() {
  const { files, isLoading, error } = useNotionFiles();

  const handleDragEnd = (data: NotionFile[]) => {
    // todo: sort files and update order in database
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading files...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  if (!files || files.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No files found.</Text>
      </View>
    );
  }

  return (
    <DraggableFlatList
      data={files}
      containerStyle={{ flex: 1 }}
      onDragEnd={({ data }) => handleDragEnd(data)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={DraggableNotionListItem}
    />
  );
}