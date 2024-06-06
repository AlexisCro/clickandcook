import { ScrollView, Text, View, Image, TextInput, StyleSheet, Button } from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Editpizza() {
  const id = useLocalSearchParams().id;
  const [pizza, setPizza] = useState([]);
  const [namePizza, setNamePizza] = useState("");
  const [pricePizza, setPricePizza] = useState("");
  const [ingredientsPizza, setIngredientsPizza] = useState("");

  useEffect(() => {
    fetchpizzabyid();
  }, []);

  async function fetchpizzabyid() {
    const { data, error } = await supabase.from("pizzas").select("*").eq("id", id);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }
    if (data && data.length > 0) {
      setNamePizza(data[0].pizza);
      setPricePizza(data[0].price.toString());
      setIngredientsPizza(data[0].ingredients.join(", "));
    }
    setPizza(data);
  }

  async function updatepizza() {
    const { data, error } = await supabase
      .from("pizzas")
      .update({ pizza: namePizza, price: parseFloat(pricePizza.replaceAll(",", ".")), ingredients: ingredientsPizza.split(", ") })
      .eq("id", id);

    if (error) {
      console.error("Error updating pizza:", error);
      alert("Erreur lors de la mise à jour de la pizza, veuillez réessayer ultérieurement.");
      return;
    }
    alert("Pizza mise à jour avec succès");
    fetchpizzabyid();
  }

  return (
    <ScrollView style={styles.container}>
      {pizza ? (
        <>
          <View style={styles.content}>
            <Text style={styles.title}>Editer la Pizza</Text>
            {pizza.map((pizza) => (
              <View key={pizza.id} style={styles.pizzaContainer}>
                <TextInput style={styles.input} placeholder="Nom de la pizza" value={namePizza} onChangeText={setNamePizza} />
                <TextInput style={styles.input} placeholder="prix" value={pricePizza} keyboardType="numeric" onChangeText={setPricePizza} />
                <TextInput style={styles.input} placeholder="ingredient" value={ingredientsPizza} onChangeText={setIngredientsPizza} />
              </View>
            ))}
          </View>
          <Button title="Mettre à jour" onPress={updatepizza} />
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
  },
});
