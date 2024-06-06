import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, View, Alert, Text, ScrollView, SafeAreaView } from "react-native";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import styles from "../../assets/stylesheet/style";
import Avatar from "../../components/Avatar";

export default function AccountScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  
  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("profiles").select(`username, website, avatar_url`).eq("id", session?.user.id).single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }: { username: string; website: string; avatar_url: string }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function getManagerRestaurant() {
    if (session?.user.id != undefined) {
      const { data, error } = await supabase.from("restaurants").select("name").eq("manager_id", session?.user.id);

      if (error) {
        console.error("Error fetching manager:", error);
        return;
      }

      setRestaurants(data);
    }
  }

  useEffect(() => {
    getManagerRestaurant();
  }, [session]);

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={200}
                url={avatarUrl}
                onUpload={(url: string) => {
                  setAvatarUrl(url);
                  updateProfile({ username, website, avatar_url: url });
                }}
              />
            </View>

            <View /*style={[styles.verticallySpaced, styles.mt20]}*/>
              <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View /*style={styles.verticallySpaced}*/>
              <Input label="Username" value={username || ""} onChangeText={(text) => setUsername(text)} />
            </View>
            <View /*style={styles.verticallySpaced}*/>
              <Input label="Website" value={website || ""} onChangeText={(text) => setWebsite(text)} />
            </View>
            <View>
              <Text
                style={{textAlign: 'center', fontSize: 20}}
              >
                Mes restaurants
              </Text>
              <View style={{marginVertical: 15}}>
                {
                  restaurants.length > 0 ? (
                    restaurants.map((restaurant) => (
                      <View key={restaurant.id}>
                        <Text style={{textAlign: 'center', fontSize: 20, borderStyle: 'solid', borderWidth: 2}}>{restaurant.name}</Text>
                      </View>
                    ))
                  ) : (
                    <View>
                      <Text>Loading...</Text>
                    </View>
                  )
                }
                </View>
            </View>
            <View style={styles.button}>
              <Button title={loading ? "Loading ..." : "Update"} onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })} disabled={loading} />
            </View>
            <View style={styles.button}>
              <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
