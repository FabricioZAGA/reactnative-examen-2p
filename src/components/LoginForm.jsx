import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { validateEmail } from "../utils/validation";
import firebase from "../utils/firebase";
import colors from "../utils/colors";
export default function LoginForm({ changeForm }) {
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});

  const login = () => {
    let error = {};
    console.log("LOGIN IN");
    if (!formData.email || !formData.password) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
    } else if (!validateEmail(formData.email)) {
      error.email = true;
    } else {
      console.log("OK");
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setFormError({
            email: true,
            password: true,
          });
        });
    }
    setFormError(error);
  };

  const onInputChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={(e) => onInputChange(e, "email")}
      />
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) => onInputChange(e, "password")}
      />
      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.btnText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Regístrate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: "white",
    fontSize: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: colors.PRIMARY_COLOR_DARK,
    borderRadius: 10,
    width: '80%',
    marginHorizontal: 5,
    marginBottom: 30,
    color: '#000',
    paddingLeft: 10,
  },
  login: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  errorInput: {
    borderColor: "#940c0c",
  },
  button: {
    backgroundColor: colors.PRIMARY_COLOR_DARK,
    padding: 5,
    borderRadius: 10,
  },
});
