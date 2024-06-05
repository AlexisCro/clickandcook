import { ScrollView, Text, View, Image, TextInput, StyleSheet, Button } from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

export default function CreatePizza() {
  const [namePizza, setNamePizza] = useState("");
  const [pricePizza, setPricePizza] = useState("");
  const [ingredientsPizza, setIngredientsPizza] = useState("");

  async function createPizza() {
    const { data, error } = await supabase.from("pizzas").insert({ pizza: namePizza, price: pricePizza, ingredients: ingredientsPizza.split(", ") });

    if (error) {
      console.error("Error creating pizza:", error);
      alert("Erreur lors de la création de la pizza, veuillez réessayer ultérieurement.");
      return;
    }
    alert("Pizza créée avec succès");
  }

  return (
    <ScrollView>
      <View style={styles.content}>
        <Text style={styles.title}>Créer une Pizza</Text>
        <View style={styles.pizzaContainer}>
          <TextInput style={styles.input} placeholder="Nom de la pizza" value={namePizza} onChangeText={setNamePizza} />
          <TextInput style={styles.input} placeholder="prix" value={pricePizza} keyboardType="numeric" onChangeText={setPricePizza} />
          <TextInput style={styles.input} placeholder="ingredient" value={ingredientsPizza} onChangeText={setIngredientsPizza} />
        </View>
        <Button title="Créer la pizza" onPress={createPizza} />
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
    marginBottom: 10,
    fontSize: 18,
    marginHorizontal: 15,
  },
});
