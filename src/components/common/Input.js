import React from "react";
import { StyleSheet, TextInput, Platform } from "react-native";
import { commonStyles, commonColors } from "./styles/miscStyles";

const Input = ({ placeholder, onChangeText, onSubmitEditing, value, underlineColorAndroid }) => {
    const { inputStyles } = styles;
    return (
        <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            underlineColorAndroid={underlineColorAndroid}
            onSubmitEditing={onSubmitEditing}
            value={value}
            style={inputStyles}
            multiline
        />
    )
}

const styles = StyleSheet.create({
    inputStyles: {
        fontSize: commonStyles.fontSize_18,
        color: commonColors.color_black,
        borderBottomColor: commonColors.color_grey_03,
        borderBottomWidth: Platform.OS === "ios" ? 1 : 0
    },

})

export default Input;