import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index"   options={{ title: "Pizza", tabBarIcon: ({ color }) => <Ionicons name="pizza-sharp" size={28} color={color} /> }} />
      <Tabs.Screen name="Account" options={{ title: "Account", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
    </Tabs>
  );
}