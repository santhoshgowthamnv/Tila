import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { commonStyles, commonColors } from './styles/miscStyles';
import { scaledSize, width } from '../../helpers/utils';

const Box = ({ onPress, bgSource, text }) => {

    const { container, textStyle, textContainer, image } = styles;
    return (
        <TouchableOpacity style={container} onPress={onPress}>
            <ImageBackground style={image} source={bgSource}>
                <View style={textContainer}>
                    <Text style={textStyle}>{text}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        width: width / 3,
        height: width / 3,
        backgroundColor: commonColors.color_white,
        borderWidth: scaledSize(0.2),
        borderColor: commonColors.color_grey_05,
    },
    textContainer: {
        flex: commonStyles.flex_1,
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
    },
    textStyle: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_14,
        fontWeight: commonStyles.fontWeight_bold,
        textAlign: commonStyles.center,
    },
    image: {
        width: width / 3,
        height: width / 3,
    }
});

export default Box;
