import { ScrollView, Text, View, Image, SafeAreaView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Index() {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetchPizzas()
  }, [])

  async function fetchPizzas() {
    const { data: pizzas, error } = await supabase.from('pizzas').select('*')
    if (error) {
      console.error(error)
      return
    }
    setPizzas(pizzas)
  }

  return (
    <>
      <View>
          <Text style={pizzaStyles.title}>Commande</Text>
      </View>

      <SafeAreaView style={pizzaStyles.container}>
        <ScrollView>
          {   
            pizzas.length > 0 ? (
              pizzas.map(pizza => (
                <View key={pizza.id} style={pizzaStyles.card}>
                  <Text style={pizzaStyles.cardHeader}>{pizza.pizza}</Text>
                  <View style={pizzaStyles.cardBody}>
                    <Text style={pizzaStyles.price}>{pizza.price} €</Text>
                    <View>
                      <Text style={pizzaStyles.ingredients}>Ingrédients</Text>
                      {
                        pizza.ingredients.map(ingredient => (
                          <Text>{ingredient}</Text>
                        ))
                      }
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text>Loading...</Text>
            )
          }
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const pizzaStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15
  },
  card: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    marginHorizontal: '10%',
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  price:{
    fontSize: 30,
    fontWeight: 'bold',
  },
  ingredients: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  }
})
