/**
 * DestinationSearchScreen — Passenger Flow
 *
 * Pickup/destination inputs, current location, Home/Work shortcuts,
 * recent places, search results.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import mockPlaces from '../../data/mockPlaces';

const DestinationSearchScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [pickup, setPickup] = useState('Current location');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setDestination(text);
    if (text.length > 1) {
      const filtered = mockPlaces.popular.filter(p =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectPlace = (place) => {
    navigation.navigate('RequestRide', { destination: place });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header with inputs */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.inputsContainer}>
          {/* Pickup */}
          <View style={styles.inputRow}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <TextInput
              style={styles.input}
              value={pickup}
              onChangeText={setPickup}
              placeholder="Pickup location"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputDivider} />

          {/* Destination */}
          <View style={styles.inputRow}>
            <View style={[styles.dot, { backgroundColor: colors.danger }]} />
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={handleSearch}
              placeholder="Where to?"
              placeholderTextColor={colors.textTertiary}
              autoFocus
            />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Current location */}
        <TouchableOpacity style={styles.locationRow} activeOpacity={0.6}>
          <View style={styles.locationIcon}>
            <Icon name="navigate-outline" size={18} color={colors.primary} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Current location</Text>
            <Text style={styles.locationAddress}>Use your current GPS location</Text>
          </View>
        </TouchableOpacity>

        {/* Choose on map */}
        <TouchableOpacity style={styles.locationRow} activeOpacity={0.6}>
          <View style={styles.locationIcon}>
            <Icon name="map-outline" size={18} color={colors.textSecondary} />
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationName}>Choose on map</Text>
            <Text style={styles.locationAddress}>Tap a point on the map</Text>
          </View>
        </TouchableOpacity>

        {/* Saved places */}
        {searchResults.length === 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Saved places</Text>
            </View>
            {mockPlaces.savedPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.locationRow}
                onPress={() => handleSelectPlace(place)}
                activeOpacity={0.6}
              >
                <View style={styles.locationIcon}>
                  <Icon
                    name={place.type === 'home' ? 'home-outline' : 'briefcase-outline'}
                    size={18}
                    color={colors.textSecondary}
                  />
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{place.name}</Text>
                  <Text style={styles.locationAddress}>{place.address}</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Recent */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent</Text>
            </View>
            {mockPlaces.recentSearches.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.locationRow}
                onPress={() => handleSelectPlace(place)}
                activeOpacity={0.6}
              >
                <View style={styles.locationIcon}>
                  <Icon name="time-outline" size={18} color={colors.textSecondary} />
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{place.name}</Text>
                  <Text style={styles.locationAddress}>{place.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Search results */}
        {searchResults.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Results</Text>
            </View>
            {searchResults.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={styles.locationRow}
                onPress={() => handleSelectPlace(place)}
                activeOpacity={0.6}
              >
                <View style={styles.locationIcon}>
                  <Icon name="location-outline" size={18} color={colors.textSecondary} />
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{place.name}</Text>
                  <Text style={styles.locationAddress}>{place.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backBtn: {
    width: 36,
    height: 44,
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 8,
  },
  inputsContainer: {
    flex: 1,
    backgroundColor: colors.offWhite,
    borderRadius: radius.input,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  inputDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: 20,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  sectionHeader: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 18,
    paddingBottom: 6,
  },
  sectionTitle: {
    ...typography.secondary,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  locationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.offWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    ...typography.body,
    color: colors.textPrimary,
  },
  locationAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
});

export default DestinationSearchScreen;
