import React, { Component } from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { commonColors, commonStyles } from '../common/styles/miscStyles';
import items from './data.json';
import Box from '../common/Box';
import Card from '../common/Card';
import { connect } from 'react-redux';
import { nameChanged, setToken, setModal } from "../../actions"
import { scaledSize } from '../../helpers/utils';
import PopUp from '../common/PopUp';
import { STRINGS } from '../../constants/StringConstants';
import StatusHeader from '../common/StatusHeader';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: 'Events',
      headerRight: () => <Left onPress={() => params.handleDrawer()} />,
      headerLeft: () => <Swap onPress={() => params.handleSwap()} />,
      headerStyle: {
        height: Platform.OS === "ios" ? scaledSize(100) : scaledSize(60),
        backgroundColor: commonColors.color_strong_blue,
      },
      headerTintColor: commonColors.color_white,
      headerTitleStyle: {
        color: commonColors.color_white,
        fontSize: commonStyles.fontSize_16
      },
    };
  };

  state = {
    visible: false,
    mode: false,
    errorMessage: "",
    columnCount: 3
  };

  async componentDidMount() {
    this.props.navigation.setParams({ handleSwap: this._swapList.bind(this) });
    this.props.navigation.setParams({ handleDrawer: this._openDrawer.bind(this) });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.modalVisible !== this.state.visible) {
      this.setState({ visible: !this.state.visible });
    }
  }

  _swapList = () => {
    this.setState({ mode: !this.state.mode });
  };

  _openDrawer = () => {
    this.props.navigation.toggleDrawer();
  }

  onNameChange = name => {
    const { errorMessage } = this.state;
    this.props.nameChanged(name);
    if (errorMessage.length > 0) this.setState({ errorMessage: "" });
  };

  enterPressed = () => {
    const { name } = this.props;
    if (name.length < 1) {
      this.setState({ errorMessage: "Name needed to continue" })
    } else {
      this.setState({ visible: !this.state.visible }, () => {
        this.props.setModal();
        this.props.setToken(name);
      });
      AsyncStorage.setItem('id_token', name);
    }
  };

  onItemClick(item) {
    this.props.navigation.navigate("EventDetail", { event: item })
  }

  onModalBack = () => {
    this.setState({ visible: !this.state.visible });
    this.props.setModal();
    console.log("Yes");
  }

  renderList() {
    const { mode } = this.state;
    if (mode) {
      return (
        <FlatList
          data={items}
          renderItem={({ item }) => <Box
            bgSource={{ uri: item.thumbnailIcon }}
            icon={item.thumbnailIcon}
            text={item.place}
            onPress={() => this.onItemClick(item)}
          />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={this.state.columnCount}
          key={this.state.columnCount}
        />
      );
    } else {
      return (
        <FlatList
          data={items}
          renderItem={({ item }) => <Card
            imgSource={{ uri: item.thumbnailIcon }}
            bgColor={item.entryType === "Paid Entry" ? commonColors.color_primary_orange : commonColors.color_strong_blue}
            titleText={item.eventName}
            placeText={item.place}
            entryText={item.entryType}
            onPress={() => this.onItemClick(item)}
          />}
          keyExtractor={item => item.id}
        />
      );
    }
  }

  render() {
    const {
    } = styles;
    return (
      <SafeAreaView>
        <StatusHeader />
        <View>
          {this.renderList()}
          <PopUp
            animationType={"slide"}
            transparent={true}
            visible={this.state.visible}
            onRequestClose={this.onModalBack}
            title={STRINGS.INITIAL_MODAL_TITLE}
            tag={STRINGS.WHATS_YOUR_NAME}
            onChangeText={this.onNameChange}
            value={this.props.name}
            onPress={this.enterPressed}
            btnText={STRINGS.ENTER}
            errorText={this.state.errorMessage}

          />
        </View>
      </SafeAreaView>
    );
  }
}

mapStateToProps = ({ home, auth }) => {
  const { name } = home;
  const { modalVisible } = auth;
  return { name, modalVisible }
}

const styles = StyleSheet.create({
  common: {
    padding: scaledSize(10),
  }
});

const Swap = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.common} onPress={onPress}>
      <Icon name="swap-horiz" size={scaledSize(24)} color={commonColors.color_white} />
    </TouchableOpacity>
  );
};

const Left = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.common} onPress={onPress}>
      <Icon name="menu" size={scaledSize(24)} color={commonColors.color_white} />
    </TouchableOpacity>
  );
};



export default connect(mapStateToProps, { nameChanged, setToken, setModal })(HomeScreen)