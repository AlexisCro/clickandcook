import { ScrollView, Text, View, Image, SafeAreaView, StyleSheet, Pressable } from "react-native";
import { Link } from 'expo-router';
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFocusEffect } from '@react-navigation/native';
import React from "react";


export default function Index() {
  const [pizzas, setPizzas] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      fetchPizzas();
    }, [])
  );

  async function fetchPizzas() {
    const { data: pizzas, error } = await supabase.from('pizzas').select('*').order('price', { ascending: true })
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
                        pizza.ingredients.map((ingredient, index) => (
                          <Text key={index}>{ingredient}</Text>
                        ))
                      }
                    </View>
                  </View>
                  <View style={pizzaStyles.cardFooter}>
                    <Link
                      style={pizzaStyles.linkEdit}
                      href={{
                        pathname: "/Pizza/[id]",
                        params:   { id: pizza.id }
                      }}
                      asChild
                    >
                      <Pressable>
                        <FontAwesome name="edit" size={30} color="black" />
                      </Pressable>
                    </Link>
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
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  linkEdit: {
    backgroundColor: '#3a9df5',
    padding: 10,
    borderRadius: 10,
  },
  pressableEdit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a9df5',
    padding: 10,
    borderRadius: 10,
  }
})
