import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { commonColors, commonStyles } from './styles/miscStyles';
import { scaledSize } from '../../helpers/utils';

const InfoText = ({ label, text }) => {
    const { labelStyle, textStyle } = styles;
    return (
        <View>
            <View>
                <Text style={labelStyle}>{label}</Text>
            </View>
            <View>
                <Text style={textStyle}>{text} </Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    labelStyle: {
        color: commonColors.color_dark_grey,
        fontSize: scaledSize(12)
    },
    textStyle: {
        color: commonColors.color_black,
        fontSize: commonStyles.fontSize_14
    }
});

export default InfoText;
