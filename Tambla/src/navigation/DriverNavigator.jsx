/**
 * Tambla — Driver Navigator
 *
 * Bottom tab navigation for driver mode: Home, Earnings, Trips, Wallet, Profile.
 * Nested stack navigators for incoming dispatches, navigation, active trips,
 * vehicle specs, documents, weekly subscriptions, and fund cashouts.
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import typography from '../theme/typography';

// Driver Screens
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import DriverEarningsScreen from '../screens/driver/DriverEarningsScreen';
import DriverTripsScreen from '../screens/driver/DriverTripsScreen';
import OfflineScreen from '../screens/driver/OfflineScreen';
import IncomingRequestScreen from '../screens/driver/IncomingRequestScreen';
import DriverNavigatingScreen from '../screens/driver/DriverNavigatingScreen';
import DriverActiveTripScreen from '../screens/driver/DriverActiveTripScreen';
import DriverDocumentsScreen from '../screens/driver/DriverDocumentsScreen';
import VehicleDetailsScreen from '../screens/driver/VehicleDetailsScreen';
import DriverSubscriptionScreen from '../screens/driver/DriverSubscriptionScreen';
import WithdrawFundsScreen from '../screens/driver/WithdrawFundsScreen';

// Shared & Support Screens
import DriverProfileScreen from '../screens/driver/DriverProfileScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import SafetyToolkitScreen from '../screens/ride/SafetyToolkitScreen';
import HelpCenterScreen from '../screens/support/HelpCenterScreen';
import SupportChatScreen from '../screens/support/SupportChatScreen';
import EdgeStatesScreen from '../screens/common/EdgeStatesScreen';
import DeliveryHomeScreen from '../screens/delivery/DeliveryHomeScreen';
import DeliveryTrackingScreen from '../screens/delivery/DeliveryTrackingScreen';
import SavedPlacesScreen from '../screens/profile/SavedPlacesScreen';
import LostItemScreen from '../screens/support/LostItemScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const EarningsStack = createStackNavigator();
const TripsStack = createStackNavigator();
const WalletStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="DriverHome" component={DriverHomeScreen} />
    <HomeStack.Screen name="Offline" component={OfflineScreen} />
    <HomeStack.Screen name="IncomingRequest" component={IncomingRequestScreen} />
    <HomeStack.Screen name="DriverNavigating" component={DriverNavigatingScreen} />
    <HomeStack.Screen name="DriverActiveTrip" component={DriverActiveTripScreen} />
    <HomeStack.Screen name="SafetyToolkit" component={SafetyToolkitScreen} />
    <HomeStack.Screen name="DriverDocuments" component={DriverDocumentsScreen} />
    <HomeStack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
    <HomeStack.Screen name="DriverSubscription" component={DriverSubscriptionScreen} />
    <HomeStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
    <HomeStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <HomeStack.Screen name="SupportChat" component={SupportChatScreen} />
    <HomeStack.Screen name="EdgeStates" component={EdgeStatesScreen} />
    <HomeStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <HomeStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
  </HomeStack.Navigator>
);

const EarningsStackScreen = () => (
  <EarningsStack.Navigator screenOptions={{ headerShown: false }}>
    <EarningsStack.Screen name="EarningsMain" component={DriverEarningsScreen} />
    <EarningsStack.Screen name="DriverSubscription" component={DriverSubscriptionScreen} />
    <EarningsStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
  </EarningsStack.Navigator>
);

const TripsStackScreen = () => (
  <TripsStack.Navigator screenOptions={{ headerShown: false }}>
    <TripsStack.Screen name="DriverTripsList" component={DriverTripsScreen} />
    <TripsStack.Screen name="SafetyToolkit" component={SafetyToolkitScreen} />
  </TripsStack.Navigator>
);

const WalletStackScreen = () => (
  <WalletStack.Navigator screenOptions={{ headerShown: false }}>
    <WalletStack.Screen name="DriverWallet" component={WithdrawFundsScreen} />
    <WalletStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
    <WalletStack.Screen name="DriverSubscription" component={DriverSubscriptionScreen} />
  </WalletStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="DriverProfile" component={DriverProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    <ProfileStack.Screen name="DriverDocuments" component={DriverDocumentsScreen} />
    <ProfileStack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
    <ProfileStack.Screen name="DriverSubscription" component={DriverSubscriptionScreen} />
    <ProfileStack.Screen name="WithdrawFunds" component={WithdrawFundsScreen} />
    <ProfileStack.Screen name="EarningsMain" component={DriverEarningsScreen} />
    <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    <ProfileStack.Screen name="HelpCenter" component={HelpCenterScreen} />
    <ProfileStack.Screen name="SupportChat" component={SupportChatScreen} />
    <ProfileStack.Screen name="SafetyToolkit" component={SafetyToolkitScreen} />
    <ProfileStack.Screen name="EdgeStates" component={EdgeStatesScreen} />
    <ProfileStack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
    <ProfileStack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} />
    <ProfileStack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
    <ProfileStack.Screen name="LostItem" component={LostItemScreen} />
  </ProfileStack.Navigator>
);

const TAB_ICONS = {
  Home: { active: 'home', inactive: 'home-outline' },
  Earnings: { active: 'trending-up', inactive: 'trending-up-outline' },
  Trips: { active: 'time', inactive: 'time-outline' },
  Payouts: { active: 'cash', inactive: 'cash-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
};

const DriverNavigator = () => {
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
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textOnDarkSecondary,
        tabBarStyle: {
          height: barHeight,
          paddingBottom: bottomPadding,
          paddingTop: 8,
          backgroundColor: colors.dark,
          borderTopWidth: 0.5,
          borderTopColor: '#222',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Earnings" component={EarningsStackScreen} />
      <Tab.Screen name="Trips" component={TripsStackScreen} />
      <Tab.Screen name="Payouts" component={WalletStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
};

export default DriverNavigator;
