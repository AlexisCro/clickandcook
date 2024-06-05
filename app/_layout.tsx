import { Stack } from "expo-router";
import Auth from "../components/Auth";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import styles from "../assets/stylesheet/style.js";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      ) : (
        <Auth />
      )}
    </View>
  );
}
