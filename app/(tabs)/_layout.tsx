import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";


export default function TabLayout() {
  return (
    <Tabs>
      {/*<Tabs.Screen name="Account" options={{ title: "Home", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />*/}
      <Tabs.Screen name="commmande" options={{ title: "Commande", tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} /> }} />
    </Tabs>
  );
}
