import React, { useState } from "react";
import {
Modal,
View,
Text,
StyleSheet,
Pressable
} from "react-native";
import colors from "../utils/colors";

export default function ResultModal({ modalVisible, setModalVisible, email, cantidad, totalInteres, totalIva, pagosMensuales, }) {
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextTitle}>{email}</Text>
          <Text style={styles.modalText}>Cantidad: {cantidad}</Text>
          <Text style={styles.modalText}>Intereses: {totalInteres}</Text>
          <Text style={styles.modalText}>IVA: {totalIva}</Text>
          <Text style={styles.modalText}>Pago Mensual: {pagosMensuales}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Aceptar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonClose: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }
});