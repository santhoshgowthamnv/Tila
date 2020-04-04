import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { commonColors, commonStyles } from "./styles/miscStyles";
import { scaledSize } from "../../helpers/utils";
import Dialog from "./Dialog";
import Input from "./Input";

const PopUp = ({ animationType, transparent, visible, onRequestClose, title, tag, onChangeText, value, onPress, btnText, errorText }) => {
    const { dialogContainer, dialogInnerContainer, dialogTitleText, dialogRegText, inputContainer, btnContainer, btnTextStyle, errorTextStyle } = styles;
    return (
        <Dialog
            animationType={animationType}
            transparent={transparent}
            visible={visible}
            onRequestClose={onRequestClose}>
            <View style={dialogContainer}>
                <View style={dialogInnerContainer}>
                    <View>
                        <Text style={dialogTitleText}>{title}</Text>
                        <Text style={dialogRegText}>{tag}</Text>
                    </View>
                    <View style={inputContainer}>
                        <Input
                            underlineColorAndroid={commonColors.color_grey_03}
                            onChangeText={onChangeText}
                            value={value}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={onPress}
                        style={btnContainer}>
                        <Text style={btnTextStyle}>{btnText}</Text>
                    </TouchableOpacity>
                    <Text
                        style={errorTextStyle}>
                        {errorText}
                    </Text>
                </View>
            </View>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        flex: commonStyles.flex_1,
        backgroundColor: commonColors.transparent_black,
    },
    dialogInnerContainer: {
        backgroundColor: commonColors.color_white,
        margin: '10%',
        marginTop: '40%',
        padding: scaledSize(20),
        borderRadius: scaledSize(4),
    },
    dialogTitleText: {
        fontSize: commonStyles.fontSize_18,
        color: commonColors.color_black,
        fontWeight: commonStyles.fontWeight_bold,
    },
    dialogRegText: {
        fontSize: commonStyles.fontSize_16,
        color: commonColors.color_black,
    },
    inputContainer: {
        marginTop: Platform.OS === 'ios' ? scaledSize(10) : scaledSize(0),
    },
    btnContainer: {
        marginTop: Platform.OS === 'ios' ? scaledSize(12) : scaledSize(5),
        backgroundColor: commonColors.color_strong_blue,
        alignItems: commonStyles.center,
        justifyContent: commonStyles.center,
        height: scaledSize(40),
        borderRadius: scaledSize(5),
    },
    btnTextStyle: {
        fontSize: commonStyles.fontSize_16,
        color: commonColors.color_white,
        fontWeight: commonStyles.fontWeight_bold,
    },

    errorTextStyle: {
        color: commonColors.color_red,
        fontSize: commonStyles.fontSize_14
    }
})

export default PopUp;