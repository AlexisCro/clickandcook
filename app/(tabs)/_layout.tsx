import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Pizza", tabBarIcon: ({ color }) => <Ionicons name="pizza-sharp" size={28} color={color} /> }} />
      <Tabs.Screen name="CreatePizza" options={{ title: "create pizza", tabBarIcon: ({ color }) => <Ionicons size={28} name="add" color={color} /> }} />
      <Tabs.Screen name="Restaurants" options={{ title: "Restaurants", tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={28} color={color} /> }} />
      <Tabs.Screen name="Account" options={{ title: "Account", tabBarIcon: ({ color }) => <MaterialIcons name="account-circle" size={24} color={color} /> }} />
    </Tabs>
  );
}
