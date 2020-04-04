import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer"

import AuthLoadingScreen from "./components/auth/AuthLoadingScreen";

import HomeScreen from "./components/app/HomeScreen";
import EventDetailScreen from "./components/app/EventDetailScreen";
import CustomDrawerContentComponent from "./components/common/CustomDrawerContentComponent";
import { width, scaledSize } from "./helpers/utils";



const AppStack = createStackNavigator({
    Home: HomeScreen,
    EventDetail: EventDetailScreen
});

const DrawerStack = createDrawerNavigator({
    Drawer: AppStack,
}, {
    drawerPosition: 'right',
    drawerWidth: width - scaledSize(70),
    contentComponent: CustomDrawerContentComponent
})

const Main = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: DrawerStack,
        },
        {
            initialRouteName: "AuthLoading"
        }
    )
);

export default Main;
