import { ScrollView, Text, View, Image, TextInput, StyleSheet, Button } from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Session } from "@supabase/supabase-js";

export default function Editrestaurant() {
  const id = useLocalSearchParams().id;
  const [restaurant, setrestaurant] = useState([]);
  const [namerestaurant, setNamerestaurant] = useState("");
  const [addressrestaurant, setaddressstaurant] = useState("");

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  
  useEffect(() => {
    fetchrestaurantbyid();
  }, []);

  async function fetchrestaurantbyid() {
    const { data, error } = await supabase.from("restaurants").select("*").eq("id", id);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (data && data.length > 0) {
      setNamerestaurant(data[0].name);
      setaddressstaurant(data[0].address);
    }
    setrestaurant(data);
  }

  async function updaterestaurant() {
    const { data, error } = await supabase.from("restaurants").update({ name: namerestaurant, address: addressrestaurant, manager_id: session?.user.id }).eq("id", id);

    if (error) {
      console.error("Error updating restaurant:", error);
      alert("Erreur lors de la mise à jour de la restaurant, veuillez réessayer ultérieurement.");
      return;
    }
    alert("restaurant mise à jour avec succès");
    fetchrestaurantbyid();
  }

  return (
    <ScrollView style={styles.container}>
      {restaurant ? (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Editer la restaurant</Text>
            {restaurant.map((restaurant) => (
              <View key={restaurant.id} style={styles.restaurantContainer}>
                <TextInput style={styles.input} placeholder="Nom de la restaurant" value={namerestaurant} onChangeText={setNamerestaurant} />
                <TextInput style={styles.input} placeholder="adresse" value={addressrestaurant} onChangeText={setaddressstaurant} />
              </View>
            ))}
          </View>
          <Button title="Mettre à jour" onPress={updaterestaurant} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  },
});
