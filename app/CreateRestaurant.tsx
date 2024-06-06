import { ScrollView, Text, View, Image, TextInput, StyleSheet, Button } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export default function CreateRestaurant() {
  const [nameRestaurant, setNameRestaurant] = useState("");
  const [manager, setManager] = useState("");
  const [addressRestaurant, setAddressRestaurant] = useState("");
  const [session, setSession] = useState<Session | null>(null);

  async function getManager() {
    if (session?.user.id != undefined) {
      const { data, error } = await supabase.from("profiles").select("username").eq("id", session?.user.id);

      if (error) {
        console.error("Error fetching manager:", error);
        return;
      }

      setManager(data[0]["username"]);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    getManager();
  }, [session]);

  async function createRestaurant() {
    if (session?.user.id != undefined) {
      const { data, error } = await supabase.from("restaurants").insert({ name: nameRestaurant, address: addressRestaurant, manager_id: session?.user.id});

      if (error) {
        console.error("Error creating restaurant:", error);
        alert("Erreur lors de la création du restaurant, veuillez réessayer ultérieurement.");
        return;
      }
      alert("Restaurant créé avec succès");
    }
  }

  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>Créer un Restaurant</Text>
        <View style={styles.restaurantContainer}>
          <TextInput style={styles.input} placeholder="Nom" value={nameRestaurant} onChangeText={setNameRestaurant} />
          <TextInput style={styles.input} placeholder="Adresse" value={addressRestaurant} onChangeText={setAddressRestaurant} />
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
            Manager: {manager}
          </Text>
        </View>
        <Button title="Créer le restaurant" onPress={createRestaurant} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  restaurantContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 18,
    marginHorizontal: 15,
  }
});
