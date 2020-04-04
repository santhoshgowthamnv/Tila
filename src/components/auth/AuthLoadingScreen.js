import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';
import { commonColors, commonStyles } from '../common/styles/miscStyles';
import { setModal, setToken, setTrackedEvents } from "../../actions"
import { connect } from 'react-redux';
import StatusHeader from '../common/StatusHeader';

class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('id_token');
        if (userToken) {
            this.props.setToken(userToken);
            const events = await AsyncStorage.getItem(userToken);
            if (events) {
                this.props.setTrackedEvents(JSON.parse(events));
            }
        } else {
            this.props.setModal();
        }
    };

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (nextProps.modalVisible || nextProps.userName) {
            this.props.navigation.navigate("App");
        }
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <ActivityIndicator color={commonColors.color_strong_blue} size="large" />
                <StatusHeader />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: commonStyles.flex_1,
        alignItems: commonStyles.center,
        justifyContent: commonStyles.center,
        width: '100%',
        height: '100%',
    },
});

mapStateToProps = ({ auth }) => {
    const { modalVisible, userName } = auth;
    return { modalVisible, userName }
}

export default connect(mapStateToProps, { setModal, setToken, setTrackedEvents })(AuthLoadingScreen)
