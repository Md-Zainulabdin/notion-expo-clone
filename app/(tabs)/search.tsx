// import DraggableNotionList from "@/components/DraggableNotionList";
import { useNotionFiles } from "@/hooks/useNotionFiles";
import { FlatList, Text, View } from "react-native";

const Search = () => {
  const { files } = useNotionFiles();
  return (
    <View>
      <Text>Notion List</Text>
      {/* <DraggableNotionList /> */}

      <FlatList
        data={files}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default Search;
