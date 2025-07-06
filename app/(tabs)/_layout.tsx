import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

interface TabIconProps {
  name: string;
  focused: boolean;
  size: number;
  color: string;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, size, color }) => {
  const iconName = focused ? name.replace("-outline", "") : name;
  return <Ionicons name={iconName as any} size={size} color={color} />;
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#888",
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 40,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name="home-outline"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name="search-outline"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <TabIcon
              name="person-circle-outline"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
