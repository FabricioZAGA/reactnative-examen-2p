import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, Button, TouchableOpacity } from "react-native";
import firebase from "../utils/firebase";
import Form from '../components/Form';
import ResultModal from "../components/ResultModal";
import colors from "../utils/colors"
import { MaterialIcons } from "@expo/vector-icons";

const _mesesI = [          
  { label: '3 meses', value: 3 },
  { label: '6 meses', value: 6 },
  { label: '9 meses', value: 9 },
  { label: '12 meses', value: 12 },
  { label: '24 meses', value: 24 },
]

export default function Calculation({ email }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidad, setCantidad] = useState(null);
  const [sueldo, setSueldo] = useState(null);
  const [interes, setInteres] = useState(null);
  const [meses, setMeses] = useState(null);
  const [mesesItems, setMesesItems] = useState([]);
  const [totalInteres, setTotalInteres] = useState(null);
  const [totalIva, setTotalIva] = useState(null);
  const [pagosMensuales, setPagosMensuales] = useState(null);

  useEffect(() => {
    setMesesItems([])
    var _mesesItems = [];
    if(sueldo >= 0 && sueldo <= 10000) {
      setInteres(0.02)
      _mesesItems = []
      _mesesItems.push(_mesesI[0], _mesesI[1])
    } else if(sueldo > 10000 && sueldo <= 20000) {
      setInteres(0.04)
      _mesesItems = []
      _mesesItems.push(_mesesI[0], _mesesI[1], _mesesI[2])
    } else if(sueldo > 20000) {
      setInteres(0.06)
      _mesesItems = []
      _mesesItems.push(_mesesI[0], _mesesI[1], _mesesI[2], _mesesI[3], _mesesI[4])
    }
    setMesesItems(_mesesItems)
  }, [sueldo]);

  const calcular = () => {
    var _totalInteres = Number(cantidad) + Number(cantidad * interes);
    var _totalIva = Number(_totalInteres) + Number(_totalInteres * 0.16);
    var _pagoMensual = Number(_totalIva) / Number(meses);
    console.log(_pagoMensual)
    setModalVisible(true);
    setTotalInteres(_totalInteres);
    setTotalIva(_totalIva);
    setPagosMensuales(_pagoMensual);
    console.log(modalVisible)
  }

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <>
      <View style={styles.logout}>
        <TouchableOpacity style={styles.buttonLogout} onPress={logout}>
          <MaterialIcons name="logout" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.email}>{email}</Text>
        <Form setSueldo={setSueldo} setCantidad={setCantidad} setMeses={setMeses} mesesItems={mesesItems} calcular={calcular}/>
        <View style={styles.calculate}>
        <TouchableOpacity style={styles.buttonCalculate} onPress={calcular}>
            <Text style={styles.textCalculate}>Calcular</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <ResultModal modalVisible={modalVisible} email={email} cantidad={cantidad} setModalVisible={setModalVisible} totalInteres={totalInteres} totalIva={totalIva} pagosMensuales={pagosMensuales}/> 
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
  },
  email: {
    color: "white",
    fontSize: 20,
  },
  calculate: {
    flex: 1,
    marginTop: 100,
  },
  buttonCalculate: {
    backgroundColor: colors.PRIMARY_COLOR_DARK,
    padding: 5,
    borderRadius: 10,
    width: "40%",
  },
  textCalculate: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  buttonLogout: {
    backgroundColor: colors.PRIMARY_COLOR_DARK,
    padding: 5,
    borderRadius: 10,
    width: 40,
    marginRight: 20,
  },
  textLogout: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
  },
  logout: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
