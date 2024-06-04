import { useState } from "react";
import { supabase } from "./supabaseClient";
import { View, Text, TextInput, Button } from "react-native";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      alert(error.error_description || error.message);
    } else {
      alert("Check your email for the login link!");
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Supabase + React</Text>
      <Text>Sign in via magic link with your email below</Text>
      <TextInput placeholder="Your email" value={email} onChangeText={(e) => setEmail(e)} />
      <Button title={loading ? "Loading" : "Send magic link"} onPress={handleLogin} disabled={loading} />
    </View>
  );
}
