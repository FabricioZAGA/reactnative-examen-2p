import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../utils/colors';

export default function Form({ setSueldo, setCantidad, setMeses, mesesItems }) {

  return (
    <View style={styles.viewForm}>
      <View style={styles.viewInput}>
        <TextInput
          placeholder="Sueldo"
          keyboardType="numeric"
          style={styles.input}
          onChange={(e) => setSueldo(e.nativeEvent.text)} />
      </View>
      <View style={styles.viewInput}>
        <TextInput
          placeholder="Cantidad Solicitada"
          keyboardType="numeric"
          style={styles.input}
          onChange={(e) => setCantidad(e.nativeEvent.text)} />
      </View>
      <View style={styles.viewPicker}>
      <RNPickerSelect style={customPickerStyles}
      useNativeAndroidPickerStyle={true}
          onValueChange={(value) => setMeses(value)}
          placeholder={{
            label: 'Cantidad de Meses',
            value: 0,
          }}
          items={mesesItems}
        />
      </View>
      
      
      

    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    top: 30,
    width: '90%',
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 10,
    height: 300,
    alignItems: "center",
    justifyContent: 'center'
  },
  viewInput: {
    flexDirection: 'row',
  },
  input: {
    height: 60,
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
  viewPicker: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    marginHorizontal: 5,
    height: 60,
    borderColor: colors.PRIMARY_COLOR_DARK,
    justifyContent: "center",
  },
  textPicker: {
    marginLeft: 10,
    marginBottom: 5
  }

});

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});