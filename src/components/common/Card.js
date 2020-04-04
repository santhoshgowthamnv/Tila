import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { commonStyles, commonColors } from './styles/miscStyles';
import { scaledSize } from '../../helpers/utils';

const Card = ({ titleText, placeText, entryText, onPress, bgColor, imgSource }) => {
    const { container, iconContainer, title, entryContainer, place, icon, entryTypeText, textContainer } = styles;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <View style={iconContainer}>
                    <Image source={imgSource} style={icon} />
                </View>
                <View style={textContainer}>
                    <Text numberOfLines={1} style={title}> {titleText} </Text>
                    <Text numberOfLines={1} style={place}> {placeText} </Text>
                </View>
                <View style={[entryContainer, { backgroundColor: bgColor }]}>
                    <Text style={entryTypeText}> {entryText} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: scaledSize(10),
        margin: scaledSize(10),
        marginTop: scaledSize(8),
        marginBottom: scaledSize(8),
        flexDirection: commonStyles.row,
        justifyContent: commonStyles.space_between,
        alignItems: commonStyles.center,
        backgroundColor: commonColors.color_white,
        height: scaledSize(70),
    },
    iconContainer: {
        height: scaledSize(50),
        width: scaledSize(50),
        borderRadius: scaledSize(50 / 2),
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
        backgroundColor: commonColors.color_orange,
    },
    entryContainer: {
        borderRadius: scaledSize(14),
        width: scaledSize(88),
        padding: scaledSize(2),
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
        shadowColor: commonColors.color_black,
        shadowOffset: {
            width: scaledSize(0),
            height: scaledSize(1),
        },
        shadowOpacity: scaledSize(0.20),
        shadowRadius: scaledSize(1.41),

        elevation: scaledSize(2),
    },
    title: {
        fontSize: commonStyles.fontSize_16,
        fontWeight: commonStyles.fontWeight_bold,
        color: commonColors.color_black,
        textAlign: commonStyles.left,

    },
    place: {
        fontSize: commonStyles.fontSize_14,
        color: commonColors.color_black,
        textAlign: commonStyles.left
    },
    icon: {
        height: scaledSize(50),
        width: scaledSize(50),
        borderRadius: scaledSize(50 / 2),
    },
    entryTypeText: {
        fontSize: commonStyles.fontSize_14,
        color: commonColors.color_white,
    },
    textContainer: {
        flex: commonStyles.flex_1,
        marginLeft: scaledSize(15),
    }
});

export default Card;
