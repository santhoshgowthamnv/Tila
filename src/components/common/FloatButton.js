import React from "react";
import { TouchableOpacity } from "react-native";
import { scaledSize } from "../../helpers/utils";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonColors, commonStyles } from "./styles/miscStyles";

const FloatButton = ({ onPress, size, name, disabled, color }) => {
    const { buttonContainer } = styles;
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={buttonContainer}>
            <Icon name={name} size={size} color={color} />
        </TouchableOpacity>
    )
}

const styles = {
    buttonContainer: {
        height: scaledSize(50),
        width: scaledSize(50),
        backgroundColor: commonColors.color_white,
        borderRadius: scaledSize(50 / 2),
        borderWidth: scaledSize(1),
        borderColor: commonColors.color_aliceblue,
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
        shadowColor: commonColors.color_black,
        shadowOffset: {
            width: scaledSize(0),
            height: scaledSize(1),
        },
        shadowOpacity: scaledSize(0.18),
        shadowRadius: scaledSize(1.0),

        elevation: scaledSize(1),
    }
};

export default FloatButton;
