import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  formContainer: {
    borderRadius: 15,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 300,
    zIndex: 100,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
  },
  buttonContainer: {
    width: 300,
    padding: 0,
    margin: 0,
  },
  button: {
    borderRadius: 20,
    width: "100%",
    marginVertical: 10,
  },
  profileContainer: {
    width: "80%",
  },
  avatarContainer: {
    marginHorizontal: "20%",
    marginBottom: 20,
  },
});

export default styles;
