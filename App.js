import React, { useEffect, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import Auth from "./src/views/Auth";
import Calculation from "./src/views/Calculation";
import firebase from "./src/utils/firebase";
import colors from "./src/utils/colors";
import "firebase/auth/";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });
  }, []);

  if (user === undefined) return null;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.background}>
        {user ? <Calculation email={user.email} /> : <Auth />}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.BACKGROUND_COLOR,
    height: "100%",
  },
});
