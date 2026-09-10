/**
 * SavedPlacesScreen — Manage Favorite Locations
 *
 * Home, Work, and custom saved addresses with quick set and delete.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const INITIAL_PLACES = [
  {
    id: 'p1',
    name: 'Home',
    address: 'Tank Hill Road, Muyenga, Kampala',
    icon: 'home',
    isPreset: true,
  },
  {
    id: 'p2',
    name: 'Work',
    address: 'Nakasero Road 18, Nakasero Business Park',
    icon: 'briefcase',
    isPreset: true,
  },
  {
    id: 'p3',
    name: 'Fitness First Gym',
    address: 'Acacia Mall, 4th Floor, Kololo',
    icon: 'barbell',
    isPreset: false,
  },
  {
    id: 'p4',
    name: "Parents' House",
    address: 'Ntinda - Naalya Road, Kyambogo View',
    icon: 'heart',
    isPreset: false,
  },
];

const SavedPlacesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [places, setPlaces] = useState(INITIAL_PLACES);

  const handleDelete = (id) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

  const handleAddPlace = () => {
    Alert.alert('Add Place', 'Choose from map or search location', [
      {
        text: 'Select on Map',
        onPress: () => navigation.navigate('SelectLocationMap', { type: 'destination' }),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Saved Places" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FREQUENT DESTINATIONS</Text>
        </View>

        {places.map((place) => (
          <View key={place.id} style={styles.placeCard}>
            <View style={styles.iconContainer}>
              <Icon name={place.icon} size={20} color={colors.dark} />
            </View>
            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress} numberOfLines={1}>
                {place.address}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDelete(place.id)}
            >
              <Icon name="trash-outline" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Add New Place"
            variant="outline"
            icon={<Icon name="add" size={20} color={colors.dark} />}
            onPress={handleAddPlace}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    ...shadows.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  placeAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 8,
  },
  ctaWrapper: {
    marginTop: 12,
  },
});

export default SavedPlacesScreen;
