/**
 * Tambula — Passenger Navigator
 *
 * Bottom tab navigation: Home, Trips/History, Wallet, Profile.
 * Comprehensive nested stack navigators for all Passenger and Ride flows.
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import typography from '../theme/typography';

// Core Screens
import PassengerHomeScreen from '../screens/passenger/PassengerHomeScreen';
import DestinationSearchScreen from '../screens/passenger/DestinationSearchScreen';
import TripsScreen from '../screens/passenger/TripsScreen';
import TripDetailsScreen from '../screens/passenger/TripDetailsScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import TopUpWalletScreen from '../screens/wallet/TopUpWalletScreen';
import TransactionHistoryScreen from '../screens/wallet/TransactionHistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SavedPlacesScreen from '../screens/profile/SavedPlacesScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

// Ride Journey Screens
import RequestRideScreen from '../screens/ride/RequestRideScreen';
import SelectLocationMapScreen from '../screens/ride/SelectLocationMapScreen';
import FareBreakdownScreen from '../screens/ride/FareBreakdownScreen';
import ChoosePaymentScreen from '../screens/ride/ChoosePaymentScreen';
import SearchingDriverScreen from '../screens/ride/SearchingDriverScreen';
import DriverFoundScreen from '../screens/ride/DriverFoundScreen';
import DriverArrivedScreen from '../screens/ride/DriverArrivedScreen';
import TrackDriverScreen from '../screens/ride/TrackDriverScreen';
import TripInProgressScreen from '../screens/ride/TripInProgressScreen';
import TripCompletedScreen from '../screens/ride/TripCompletedScreen';
import RateDriverScreen from '../screens/ride/RateDriverScreen';
import SafetyToolkitScreen from '../screens/ride/SafetyToolkitScreen';
import ShareTripScreen from '../screens/ride/ShareTripScreen';
import ScheduleRideScreen from '../screens/ride/ScheduleRideScreen';

// Driver Screens (shared into wallet / profile)
import WithdrawFundsScreen from '../screens/driver/WithdrawFundsScreen';
import DriverDocumentsScreen from '../screens/driver/DriverDocumentsScreen';
import VehicleDetailsScreen from '../screens/driver/VehicleDetailsScreen';
import DriverSubscriptionScreen from '../screens/driver/DriverSubscriptionScreen';

// Delivery Flow
import DeliveryHomeScreen from '../screens/delivery/DeliveryHomeScreen';
import DeliveryTrackingScreen from '../screens/delivery/DeliveryTrackingScreen';

// Support & Edge
import HelpCenterScreen from '../screens/support/HelpCenterScreen';
import SupportChatScreen from '../screens/support/SupportChatScreen';
import LostItemScreen from '../screens/support/LostItemScreen';
import EdgeStatesScreen from '../screens/common/EdgeStatesScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const TripsStack = createStackNavigator();
const WalletStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="PassengerHome" component={PassengerHomeScreen} />
    <HomeStack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
    <HomeStack.Screen name="SelectLocationMap" component={SelectLocationMapScreen} />
    <HomeStack.Screen name="RequestRide" component={RequestRideScreen} />
    <HomeStack.Screen name="FareBreakdown" component={FareBreakdownScreen} />
    <HomeStack.Screen name="ChoosePayment" component={ChoosePaymentScreen} />
    <HomeStack.Screen name="SearchingDriver" component={SearchingDriverScreen} />
    <HomeStack.Screen name="DriverFound" component={DriverFoundScreen} />
    <HomeStack.Screen name="DriverArrived" component={DriverArrivedScreen} />
    <HomeStack.Screen name="TrackDriver" component={TrackDriverScreen} />
    <HomeStack.Screen name="TripInProgress" component={TripInProgressScreen} />
    <HomeStack.Screen name="TripCompleted" component={TripCompletedScreen} />
    <HomeStack.Screen name="RateDriver" component={RateDriverScreen} />
    <HomeStack.Screen name="SafetyToolkit" component={SafetyToolkitScreen} />
    <HomeStack.Screen name="ShareTrip" component={ShareTripScreen} />
    <HomeStack.Screen name="ScheduleRide" component={ScheduleRideScreen} />
    <HomeStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <HomeStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    <HomeStack.Screen name="EdgeStates" component={EdgeStatesScreen} />
    <HomeStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <HomeStack.Screen name="SupportChat" component={SupportChatScreen} />
    <HomeStack.Screen name="LostItem" component={LostItemScreen} />
    <HomeStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
  </HomeStack.Navigator>
);

const TripsStackScreen = () => (
  <TripsStack.Navigator screenOptions={{ headerShown: false }}>
    <TripsStack.Screen name="TripsList" component={TripsScreen} />
    <TripsStack.Screen name="TripDetails" component={TripDetailsScreen} />
    <TripsStack.Screen name="RequestRide" component={RequestRideScreen} />
    <TripsStack.Screen name="RateDriver" component={RateDriverScreen} />
    <TripsStack.Screen name="PassengerHome" component={PassengerHomeScreen} />
    <TripsStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <TripsStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    <TripsStack.Screen name="LostItem" component={LostItemScreen} />
    <TripsStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <TripsStack.Screen name="SupportChat" component={SupportChatScreen} />
    <TripsStack.Screen name="ChoosePayment" component={ChoosePaymentScreen} />
    <TripsStack.Screen name="FareBreakdown" component={FareBreakdownScreen} />
  </TripsStack.Navigator>
);

const WalletStackScreen = () => (
  <WalletStack.Navigator screenOptions={{ headerShown: false }}>
    <WalletStack.Screen name="WalletMain" component={WalletScreen} />
    <WalletStack.Screen name="PassengerHome" component={PassengerHomeScreen} />
    <WalletStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <WalletStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    <WalletStack.Screen name="TopUpWallet" component={TopUpWalletScreen} />
    <WalletStack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    <WalletStack.Screen name="ChoosePayment" component={ChoosePaymentScreen} />
    <WalletStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
  </WalletStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="PassengerHome" component={PassengerHomeScreen} />
    <ProfileStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <ProfileStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="DriverDocuments" component={DriverDocumentsScreen} />
    <ProfileStack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
    <ProfileStack.Screen name="DriverSubscription" component={DriverSubscriptionScreen} />
    <ProfileStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
    <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <ProfileStack.Screen name="SupportChat" component={SupportChatScreen} />
    <ProfileStack.Screen name="LostItem" component={LostItemScreen} />
    <ProfileStack.Screen name="SafetyToolkit" component={SafetyToolkitScreen} />
    <ProfileStack.Screen name="EdgeStates" component={EdgeStatesScreen} />
    <ProfileStack.Screen name="SelectLocationMap" component={SelectLocationMapScreen} />
  </ProfileStack.Navigator>
);

const TAB_ICONS = {
  Home: { active: 'home', inactive: 'home-outline' },
  History: { active: 'time', inactive: 'time-outline' },
  Wallet: { active: 'wallet', inactive: 'wallet-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const PassengerNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 8 : 14;
  const barHeight = 56 + bottomPadding;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return <Icon name={iconName} size={23} color={color} />;
        },
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          height: barHeight,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          backgroundColor: colors.white,
          borderTopWidth: StyleSheet.hairlineWidth || 0.5,
          borderTopColor: colors.border,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="History" component={TripsStackScreen} />
      <Tab.Screen name="Wallet" component={WalletStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default PassengerNavigator;
