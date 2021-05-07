import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <View style={styles.view}>
      <Image style={styles.logo} source={require("../assets/logo.webp")} />
      {isLogin ? (
        <LoginForm changeForm={changeForm} />
      ) : (
        <RegisterForm changeForm={changeForm} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: "80%",
    height: 240,
    marginTop: 50,
    marginBottom: 50,
  },
});
