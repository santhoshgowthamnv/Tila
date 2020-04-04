import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  AsyncStorage,
  Image,
} from 'react-native';
import { commonColors, commonStyles } from '../common/styles/miscStyles';
import InfoText from '../common/InfoText';
import Hairline from '../common/Hairline';
import FloatButton from '../common/FloatButton';
import { connect } from 'react-redux';
import { setTrackedEvents, nameChanged, setToken } from '../../actions';
import { scaledSize } from '../../helpers/utils';
import PopUp from '../common/PopUp';
import { STRINGS } from '../../constants/StringConstants';
import StatusHeader from '../common/StatusHeader';

class EventDetailScreen extends Component {
  constructor(props) {
    super(props);
    const {
      event: { eventName },
    } = this.props.navigation.state.params;
    this.props.navigation.setParams({ title: eventName });

    this.state = {
      event: this.props.navigation.state.params.event,
      isTracked: false,
      errorMessage: '',
      visible: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: navigation.getParam('Event Detail', params.title),
      headerStyle: {
        backgroundColor: commonColors.color_strong_blue,
      },
      headerTintColor: commonColors.color_white,
      headerTitleStyle: {
        color: commonColors.color_white,
      },
    };
  };

  componentDidMount() {
    const { trackingEvents } = this.props;
    const { event } = this.state;

    trackingEvents &&
      trackingEvents.length > 0 &&
      trackingEvents.map(val => {
        if (val.id === event.id) {
          this.setState({
            isTracked: !this.state.isTracked,
          });
        }
      });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { event } = this.state;
    if (nextProps.trackingEvents !== this.props.trackingEvents) {
      nextProps.trackingEvents.map(val => {
        if (
          JSON.stringify(val) ===
          JSON.stringify(this.props.navigation.state.params.event)
        ) {
          this.setState({ isTracked: true });
        } else {
          this.setState({ isTracked: false });
        }
      });
    }
    if (nextProps.navigation.state.params.event !== event) {
      this.props.navigation.setParams({
        title: nextProps.navigation.state.params.event.eventName,
      });
      this.setState({ event: nextProps.navigation.state.params.event });
    }
  }

  trackEventPressed = async () => {
    if (this.props.userName) {
      let trackedList = [];
      const { trackingEvents, userName } = this.props;
      const { event } = this.state;
      if (trackingEvents && trackingEvents.length > 0) {
        trackingEvents.map(val => {
          trackedList.push(val);
        });
      }
      trackedList.push(event);
      this.props.setTrackedEvents(trackedList);
      this.setState({ isTracked: true });

      try {
        await AsyncStorage.setItem(userName, JSON.stringify(trackedList));
      } catch (error) {
        alert(STRINGS.SOMETHING_WRONG);
      }
    } else {
      this.setState({ visible: !this.state.visible });
    }
  };

  onNameChange = name => {
    const { errorMessage } = this.state;
    this.props.nameChanged(name);
    if (errorMessage.length > 0) this.setState({ errorMessage: '' });
  };

  enterPressed = () => {
    const { name } = this.props;
    if (name.length < 1) {
      this.setState({ errorMessage: STRINGS.NAME_ERROR_MESSAGE });
    } else {
      this.setState({ visible: !this.state.visible }, () => {
        this.props.setToken(name);
      });
      AsyncStorage.setItem('id_token', name);
    }
  };

  onModalBack = () => {
    this.setState({ visible: !this.state.visible });
    this.props.nameChanged('');
  };

  render() {
    const { container, textContainer, disclaimerText, bgContainer, floatContainer } = styles;
    const {
      eventName,
      entryType,
      thumbnailIcon,
      place,
    } = this.props.navigation.state.params.event;
    return (
      <View style={{ flex: commonStyles.flex_1 }}>
        <StatusHeader />
        <Image style={bgContainer} source={{ uri: thumbnailIcon }} />
        <View
          style={container}>
          <View style={textContainer}>
            <InfoText label={STRINGS.EVENT_NAME} text={eventName} />

            <View style={textContainer}>
              <Hairline />
            </View>
          </View>

          <View style={textContainer}>
            <InfoText label={STRINGS.LOCATION} text={place} />

            <View style={textContainer}>
              <Hairline />
            </View>
          </View>

          <View style={textContainer}>
            <InfoText label={STRINGS.ENTRY_TYPE} text={entryType} />

            <View style={textContainer}>
              <Hairline />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={disclaimerText}>
              {this.state.isTracked
                ? STRINGS.TRACK_TEXT1
                : STRINGS.TRACK_TEXT2}
            </Text>
          </View>

          <View style={floatContainer}>
            <FloatButton
              disabled={this.state.isTracked}
              size={scaledSize(24)}
              name={this.state.isTracked ? 'event-available' : 'event'}
              color={
                this.state.isTracked
                  ? commonColors.color_green
                  : commonColors.color_red
              }
              onPress={this.trackEventPressed}
            />
          </View>
        </View>
        <PopUp
          animationType={'slide'}
          transparent={true}
          visible={this.state.visible}
          onRequestClose={this.onModalBack}
          title={STRINGS.NEED_NAME}
          tag={STRINGS.WHATS_YOUR_NAME}
          onChangeText={this.onNameChange}
          value={this.props.name}
          onPress={this.enterPressed}
          btnText={STRINGS.CONTINUE}
          errorText={this.state.errorMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: commonStyles.flex_2,
    backgroundColor: commonColors.width,
    padding: scaledSize(20),
  },

  textContainer: {
    marginTop: scaledSize(15),
  },
  disclaimerText: {
    color: commonColors.color_grey,
    fontSize: Platform.OS === 'ios' ? scaledSize(10) : scaledSize(11),
    textAlign: commonStyles.center,
  },
  floatContainer: {
    position: 'absolute',
    bottom: scaledSize(30),
    right: scaledSize(15),
    zIndex: scaledSize(1),
  },
  iconContainer: {
    width: scaledSize(150),
    height: scaledSize(150),
    justifyContent: commonStyles.center,
    alignItems: commonStyles.center,
    backgroundColor: commonColors.color_white,
    borderRadius: scaledSize(150 / 2),
  },
  bgContainer: {
    flex: commonStyles.flex_1,
    justifyContent: commonStyles.center,
    alignItems: commonStyles.center,
  },
});

mapStateToProps = ({ auth, home }) => {
  const { trackingEvents, userName } = auth;
  const { name } = home;
  return { trackingEvents, userName, name };
};

export default connect(mapStateToProps, {
  setTrackedEvents,
  nameChanged,
  setToken,
})(EventDetailScreen);
