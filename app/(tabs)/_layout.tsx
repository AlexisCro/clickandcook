import { Tabs } from "expo-router";
import { View } from "react-native";
import style from "../../assets/stylesheet/style.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Account"  />
      <Tabs.Screen name="index" />
    </Tabs>
  );
}
