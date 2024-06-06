import { ScrollView, Text, View, SafeAreaView, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Restaurants() {
  const [session, setSession] = useState<Session | null>(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function fetchRestaurants() {
    console.log(session?.user.id);
    if (session?.user.id != undefined) {
      const { data: restaurants, error } = await supabase.from("restaurants").select("*").eq("manager_id", session?.user.id).order("name", { ascending: true });
      if (error) {
        console.error(error);
        return;
      }
      setRestaurants(restaurants);
      console.log(restaurants);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchRestaurants();
    }, [session])
  );

  useEffect(() => {
    fetchRestaurants();
  }, [session]);

  const buttonAlert = (id) => {
    Alert.alert(
      "Suppression",
      "Voulez-vous vraiment supprimer ce restaurant ?",
      [
        { text: "Annuler", onPress: () => console.log("action unconfirmed"), style: "cancel" },
        { text: "Supprimer", onPress: () => deleteRestaurant(id) },
      ],
      { cancelable: false }
    );
  };

  async function deleteRestaurant(id) {
    const { data: restaurant, error } = await supabase.from("restaurants").delete().eq("id", id);

    if (error) {
      console.error(error);
      alert("Une erreur est survenue");
      return;
    } else {
      alert("Restaurant supprimée");
      fetchRestaurants();
    }
  }

  return (
    <View>
      <Text style={restaurantStyles.title}>Restaurants</Text>
      <Link
        href={{
          pathname: "/CreateRestaurant",
        }}
        asChild
      >
        <Pressable style={restaurantStyles.addButton}>
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </Link>

      <SafeAreaView>
        <ScrollView>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <View key={restaurant.id} style={restaurantStyles.card}>
                <Text style={restaurantStyles.cardHeader}>{restaurant.name}</Text>
                <View style={restaurantStyles.cardBody}>
                  <Text style={restaurantStyles.price}>{restaurant.address}</Text>
                </View>
                <View style={restaurantStyles.cardFooter}>
                  <Link
                    style={restaurantStyles.linkEdit}
                    href={{
                      pathname: "/Restaurant/[id]",
                      params: { id: restaurant.id },
                    }}
                    asChild
                  >
                    <Pressable>
                      <FontAwesome name="edit" size={30} color="white" />
                    </Pressable>
                  </Link>
                  <View>
                    <Pressable style={restaurantStyles.pressableDelete} onPress={() => buttonAlert(restaurant.id)}>
                      <FontAwesome name="trash" size={30} color="white" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={restaurantStyles.loadingContainer}>
              <Text>
                <ActivityIndicator size="large" color="#0000ff" style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }], height: 200, width: 200 }} />
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const restaurantStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
  },
  card: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    marginHorizontal: "10%",
  },
  cardHeader: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
  },
  ingredients: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  linkEdit: {
    backgroundColor: "#3a9df5",
    padding: 10,
    borderRadius: 10,
  },
  pressableEdit: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a9df5",
    padding: 10,
    borderRadius: 10,
  },
  pressableDelete: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f53a3a",
    padding: 10,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    textAlign: "center",
    marginHorizontal: "42%",
    marginVertical: 15,
    backgroundColor: "#3a9df5",
    padding: 10,
    width: 50,
    borderRadius: 50,
  },
});
