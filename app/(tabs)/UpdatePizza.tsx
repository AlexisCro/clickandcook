import { ScrollView, Text, View, Image, TextInput, StyleSheet } from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

export default function Editpizza(/*idpizza: string*/) {
  const idpizza = 1;
  const [pizza, setPizza] = useState([]);

  useEffect(() => {
    fetchpizzabyid();
  }, []);

  async function fetchpizzabyid() {
    const { data, error } = await supabase.from("pizzas").select("*").eq("id", idpizza);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    setPizza(data);
  }

  const NamePizza = "";
  const PricePizza = 0;
  const IngredientsPizza = [];

  async function updatepizza() {
    const { data, error } = await supabase.from("pizzas").update({ pizza: NamePizza, price: PricePizza, ingredients: IngredientsPizza }).eq("id", idpizza);

    if (error) {
      console.error("Error updating data:", error);
      return;
    }
    console.log("Data updated successfully", data);
  }

  return (
    <ScrollView style={styles.container}>
      {pizza ? (
        <View style={styles.content}>
          <Text style={styles.title}>Editer la Pizza</Text>
          {pizza.map((pizza) => (
            <View key={pizza.id} style={styles.pizzaContainer}>
              <TextInput style={styles.input} placeholder="Nom de la pizza" value={pizza.pizza} />
              <TextInput style={styles.input} placeholder="prix" value={pizza.price.toString()} keyboardType="numeric" />
              <TextInput style={styles.input} placeholder="description" value={pizza.ingredients.join(", ")} />
            </View>
          ))}
        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pizzaContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
