import { NotionFile } from "@/lib/types";
import { Text, TouchableOpacity } from "react-native";
import { RenderItemParams } from "react-native-draggable-flatlist";

export default function DraggableNotionListItem({
  drag,
  isActive,
  item,
}: RenderItemParams<NotionFile>) {
  return (
    <TouchableOpacity disabled={isActive} onLongPress={drag}>
      <Text className="text-black font-bold">{item.title}</Text>
      <Text className="text-gray">{item.description}</Text>
    </TouchableOpacity>
  );
}
