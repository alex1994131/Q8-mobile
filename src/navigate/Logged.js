import SideMenu from './SideMenu';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../containers/MainScreens/HomeScreen';
import CategoriesScreen from '../containers/MainScreens/CategoriesScreen';
import OffersScreen from '../containers/MainScreens/OffersScreen';
import MyOffersScreen from '../containers/MainScreens/MyOffersScreen';
import DetailScreen from '../containers/MainScreens/DetailScreen';
import LocationScreen from '../containers/MainScreens/LocationScreen';
import MembershipScreen from '../containers/MainScreens/MembershipScreen';
import MyProfileScreen from '../containers/MainScreens/MyProfileScreen';
import PrivacyPolicyScreen from '../containers/MainScreens/PrivacyPolicyScreen';
import CreateScreen from '../containers/MainScreens/CreateScreen';
import { LAYOUT } from '../constants';

const HomeNavigator = createStackNavigator(
{
	HomeScreen: {
		screen: HomeScreen,
		navigationOptions: { header: null },
	},
	CategoriesScreen: {
		screen: CategoriesScreen,
		navigationOptions: { header: null },
	},
	OffersScreen: {
		screen: OffersScreen,
		navigationOptions: { header: null },
	},
	MyOffersScreen: {
		screen: MyOffersScreen,
		navigationOptions: { header: null },
	},
	DetailScreen: {
		screen: DetailScreen,
		navigationOptions: { header: null },
	},
	LocationScreen: {
		screen: LocationScreen,
		navigationOptions: { header: null },
	},
	MembershipScreen: {
		screen: MembershipScreen,
		navigationOptions: { header: null },
	},
	MyProfileScreen: {
		screen: MyProfileScreen,
		navigationOptions: { header: null },
	},
	PrivacyPolicyScreen: {
		screen: PrivacyPolicyScreen,
		navigationOptions: { header: null },
	},
	CreateScreen: {
		screen: CreateScreen,
		navigationOptions: { header: null },
	},
});

const RootStack = createDrawerNavigator({
Home: {
    screen: HomeNavigator,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: LAYOUT.window.width * .7,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default createAppContainer(RootStack)