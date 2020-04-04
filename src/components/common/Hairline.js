import React from 'react';
import { View, StyleSheet } from 'react-native';
import { commonColors } from './styles/miscStyles';

const Hairline = () => {
    const { hairLineStyle } = styles;
    return <View style={hairLineStyle} />

}

const styles = StyleSheet.create({
    hairLineStyle: {
        borderBottomWidth: 1,
        borderBottomColor: commonColors.color_grey_hex
    }
});

export default Hairline;
