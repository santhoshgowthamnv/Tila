import SafeAreaView from 'react-native-safe-area-view';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    AsyncStorage,
    Image,
} from 'react-native';
import React from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { setTrackedEvents } from '../../actions';
import { scaledSize } from '../../helpers/utils';
import { commonStyles, commonColors } from './styles/miscStyles';
import { STRINGS, SCREENS } from '../../constants/StringConstants';

class CustomDrawerContentComponent extends React.Component {
    state = { trackedList: [] };

    componentDidMount() {
        const { trackingEvents } = this.props;

        if (trackingEvents && trackingEvents.length > 0) {
            this.setState({ trackedList: trackingEvents });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.trackingEvents !== this.state.trackedList) {
            this.setState({ trackedList: nextProps.trackingEvents });
        }
    }

    onDragEnd = async (data) => {
        const { userName } = this.props;

        this.setState({ trackedList: data }, () => {
            this.props.setTrackedEvents(data);
        });

        try {
            await AsyncStorage.setItem(userName, JSON.stringify(data));
        } catch (error) {
            alert(STRINGS.SOMETHING_WRONG);
        }
    };

    removeTrackedItem = async (data) => {
        const { trackedList } = this.state;
        const filteredTrackEvents = trackedList.filter(
            (item) => item.id !== data.id,
        );
        this.setState({ trackedList: filteredTrackEvents }, () => {
            this.props.setTrackedEvents(filteredTrackEvents);
        });

        const { userName } = this.props;
        try {
            await AsyncStorage.setItem(userName, JSON.stringify(filteredTrackEvents));
        } catch (error) {
            alert(STRINGS.SOMETHING_WRONG);
        }
    };

    infoBtnPressed = (item) => {
        this.props.navigation.navigate(SCREENS.EVENT_DETAIL, { event: item });
        this.props.navigation.closeDrawer();
    };

    renderItem = ({ item, index, drag, isActive }) => {
        const {
            topContentContainer,
            bottomContentContainer,
            eventNameText,
            placeText,
            entryTypeText,
            linkText,
            placeContainer,
        } = styles;
        return (
            <View style={{ margin: commonStyles.px_5 }}>
                <TouchableOpacity onLongPress={drag}>
                    <View style={topContentContainer}>
                        <View style={{ left: commonStyles.px_5 }}>
                            <Text style={eventNameText}>{item.eventName}</Text>
                        </View>
                        <TouchableOpacity
                            style={{ right: commonStyles.px_5, padding: scaledSize(5) }}
                            onPress={() => this.removeTrackedItem(item)}>
                            <Icon
                                name={'close'}
                                size={scaledSize(18)}
                                color={commonColors.color_white}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={bottomContentContainer}>
                        <View style={placeContainer}>
                            <View style={{ flex: 3 }}>
                                <Text style={placeText}>{item.place}</Text>
                                <TouchableOpacity
                                    style={{ width: scaledSize(50) }}
                                    onPress={() => this.infoBtnPressed(item)}>
                                    <Text style={entryTypeText}>Details</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ right: commonStyles.px_5, flex: commonStyles.flex_1 }}>
                                <Text
                                    style={[
                                        linkText,
                                        {
                                            color:
                                                item.entryType === STRINGS.PAID_ENTRY
                                                    ? commonColors.color_primary_orange
                                                    : commonColors.color_strong_blue,
                                        },
                                    ]}>
                                    {item.entryType}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderNoTrackingText() {
        if (this.props.trackingEvents.length < 1) {
            return (
                <View
                    style={{
                        flex: commonStyles.flex_1,
                        justifyContent: commonStyles.center,
                        alignItems: commonStyles.center,
                    }}>
                    <Text
                        style={{
                            fontSize: scaledSize(10),
                            textAlign: commonStyles.center,
                            margin: scaledSize(20),
                        }}>
                        {STRINGS.NO_EVENTS_TEXT}
                    </Text>
                </View>
            );
        }
    }

    render() {
        const { container, imageConatiner, imageInnerContainer, image } = styles;
        return (
            <SafeAreaView style={container}>
                <View style={imageConatiner}>
                    <View style={imageInnerContainer}>
                        <Image
                            style={image}
                            source={{ uri: 'https://i.picsum.photos/id/145/400/200.jpg' }}
                        />
                    </View>
                    <Text
                        style={{
                            marginTop: scaledSize(10),
                            color: commonColors.color_strong_blue,
                            fontSize: scaledSize(12),
                        }}>
                        {this.props.userName}
                    </Text>
                </View>
                {this.renderNoTrackingText()}
                <View style={{ flex: 2 }}>
                    {this.props.trackingEvents.length > 0 && (
                        <Text
                            style={{
                                fontSize: scaledSize(16),
                                margin: scaledSize(10),
                                fontWeight: commonStyles.fontWeight_bold,
                            }}>
                            {STRINGS.EVENTS_TRACKING_TEXT}
                        </Text>
                    )}
                    <DraggableFlatList
                        data={this.state.trackedList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => `draggable-item-${item.id}`}
                        onDragEnd={({ data }) => this.onDragEnd(data)}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: commonStyles.flex_1,
    },
    topContentContainer: {
        height: scaledSize(35),
        backgroundColor: commonColors.color_strong_blue,
        flexDirection: commonStyles.row,
        justifyContent: commonStyles.space_between,
        alignItems: commonStyles.center,
        borderTopRightRadius: scaledSize(5),
        borderTopLeftRadius: scaledSize(5),
    },
    bottomContentContainer: {
        height: scaledSize(65),
        backgroundColor: commonColors.color_grey_02,
        flexDirection: commonStyles.row,
        justifyContent: commonStyles.space_between,
        alignItems: commonStyles.center,
        borderBottomLeftRadius: scaledSize(5),
        borderBottomRightRadius: scaledSize(5),
    },
    eventNameText: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_14,
        fontWeight: commonStyles.fontWeight_bold,
    },
    cancelBtnText: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_14,
        fontWeight: commonStyles.fontWeight_bold,
        padding: scaledSize(5),
        right: scaledSize(2),
    },
    placeText: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_14,
        fontWeight: commonStyles.fontWeight_bold,
    },
    entryTypeText: {
        color: commonColors.color_strong_blue,
        fontSize: commonStyles.fontSize_12,
        marginTop: scaledSize(4),
    },
    linkText: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_14,
        fontWeight: commonStyles.fontWeight_bold,
        right: scaledSize(2),
    },
    placeContainer: {
        left: commonStyles.px_5,
        flexDirection: commonStyles.row,
        justifyContent: commonStyles.space_between,
    },
    imageConatiner: {
        flex: commonStyles.flex_1,
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
        backgroundColor: commonColors.color_aliceblue,
    },
    imageInnerContainer: {
        width: scaledSize(120),
        height: scaledSize(120),
        borderRadius: scaledSize(120 / 2),
        backgroundColor: commonColors.color_white,
        justifyContent: commonStyles.center,
        alignItems: commonStyles.center,
    },
    image: {
        width: scaledSize(120),
        height: scaledSize(120),
        borderRadius: scaledSize(120 / 2),
    },
});

mapStateToProps = ({ auth }) => {
    const { trackingEvents, userName } = auth;
    return { trackingEvents, userName };
};

export default connect(mapStateToProps, { setTrackedEvents })(
    CustomDrawerContentComponent,
);
