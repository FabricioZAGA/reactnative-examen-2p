import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { validateEmail } from "../utils/validation";
import firebase from "../utils/firebase";
import colors from "../utils/colors"

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});
  const register = () => {
    console.log("registrando...");
    let error = {};

    if (!formData.email || !formData.password || !formData.confirmPass) {
      if (!formData.email) error.email = true;
      if (!formData.password) error.password = true;
      if (!formData.confirmPass) error.confirmPass = true;
    } else if (!validateEmail(formData.email)) {
      error.email = true;
    } else if (formData.password !== formData.confirmPass) {
      error.password = true;
      error.confirmPass = true;
    } else if (formData.password.length < 6) {
      error.password = true;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("cuenta creada");
        })
        .catch(() => {
          setFormError({
            email: true,
            password: true,
            confirmPass: true,
          });
        });
    }
    setFormError(error);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.errorInput]}
        placeholder="Correo electrónico"
        placeholderTextColor="#969696"
        onChange={(e) =>
          setFormData({ ...formData, email: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.password && styles.errorInput]}
        placeholder="Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, password: e.nativeEvent.text })
        }
      />
      <TextInput
        style={[styles.input, formError.confirmPass && styles.errorInput]}
        placeholder="Repetir Contraseña"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={(e) =>
          setFormData({ ...formData, confirmPass: e.nativeEvent.text })
        }
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText} onPress={register}>
          Registrate
        </Text>
      </TouchableOpacity>

      <View style={styles.login}>
        <TouchableOpacity onPress={changeForm}>
          <Text style={styles.btnText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function defaultValue() {
  return {
    email: {},
    password: {},
    confirmPass: {},
  };
}

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
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
