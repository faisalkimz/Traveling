/**
 * PassengerHomeScreen — Tambula Main Dashboard
 *
 * Header greeting, Tambula branding, destination search, saved shortcuts,
 * 3 category cards (Ride, Moto, Delivery), vector-styled "Your ride, your way" hero card,
 * and clean icon-based popular destinations in Kampala. Zero stock imagery.
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockPlaces from '../../data/mockPlaces';
import { getGreeting } from '../../utils/helpers';

const CATEGORIES = [
  {
    id: 'ride',
    icon: 'car-sport',
    label: 'Ride',
    subtitle: 'Standard & XL',
    badge: 'Popular',
    badgeBg: '#FEF3C7',
    badgeColor: '#B45309',
    iconBg: '#FFFBEB',
    iconColor: '#D97706',
  },
  {
    id: 'moto',
    icon: 'bicycle',
    label: 'Boda Moto',
    subtitle: 'Beat traffic',
    badge: 'Fastest',
    badgeBg: '#DCFCE7',
    badgeColor: '#15803D',
    iconBg: '#F0FDF4',
    iconColor: '#16A34A',
  },
  {
    id: 'delivery',
    icon: 'cube',
    label: 'Delivery',
    subtitle: 'Send parcel',
    badge: 'Courier',
    badgeBg: '#E0E7FF',
    badgeColor: '#4338CA',
    iconBg: '#EEF2FF',
    iconColor: '#4F46E5',
  },
];

const PassengerHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.headline}>Where are you going?</Text>
          </View>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>
              Tambula<Text style={styles.logoDot}>.</Text>
            </Text>
          </View>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('DestinationSearch')}
          accessibilityRole="button"
          accessibilityLabel="Enter your destination"
        >
          <View style={styles.searchIconBox}>
            <Icon name="search" size={18} color={colors.dark} />
          </View>
          <Text style={styles.searchPlaceholder}>Enter your destination in Kampala...</Text>
          <View style={styles.searchSuffix}>
            <Icon name="mic-outline" size={18} color={colors.textTertiary} />
          </View>
        </TouchableOpacity>

        {/* Saved places shortcuts */}
        <View style={styles.savedPlaces}>
          {mockPlaces.savedPlaces.map((place) => (
            <TouchableOpacity
              key={place.id}
              style={styles.savedPlaceChip}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RequestRide', { destination: place })}
            >
              <View style={styles.savedIconCircle}>
                <Icon
                  name={place.type === 'home' ? 'home' : 'briefcase'}
                  size={15}
                  color={colors.dark}
                />
              </View>
              <View style={styles.savedPlaceText}>
                <Text style={styles.savedPlaceName}>{place.name}</Text>
                <Text style={styles.savedPlaceAddress} numberOfLines={1}>
                  {place.address}
                </Text>
              </View>
              <Icon name="chevron-forward" size={14} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories Section */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Choose Service</Text>
        </View>
        <View style={styles.categories}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryItem}
              activeOpacity={0.75}
              onPress={() => {
                if (cat.id === 'ride') {
                  navigation.navigate('DestinationSearch');
                } else if (cat.id === 'moto') {
                  navigation.navigate('RequestRide', { initialCategory: 'moto' });
                } else if (cat.id === 'delivery') {
                  navigation.navigate('DeliveryHome');
                }
              }}
            >
              <View style={styles.categoryTopRow}>
                <View style={[styles.categoryIconCircle, { backgroundColor: cat.iconBg }]}>
                  <Icon name={cat.icon} size={20} color={cat.iconColor} />
                </View>
                <View style={[styles.categoryBadgeRow, { backgroundColor: cat.badgeBg }]}>
                  <Text style={[styles.categoryBadgeText, { color: cat.badgeColor }]}>
                    {cat.badge}
                  </Text>
                </View>
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
              <Text style={styles.categorySubtitle} numberOfLines={1}>
                {cat.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* "Your ride, your way" Promo Card (Yellow Card) */}
        <TouchableOpacity
          style={styles.promoCard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ScheduleRide')}
        >
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Your ride,{'\n'}your way.</Text>
            <Text style={styles.promoSubtitle}>Safe, Affordable, Reliable.</Text>
          </View>
          <View style={styles.promoIconArea}>
            <Icon name="car-sport" size={48} color={colors.dark} />
          </View>
        </TouchableOpacity>

        {/* Popular destinations */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <Text style={styles.sectionSub}>Quick tap to calculate fare & request</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('DestinationSearch')}>
            <Text style={styles.viewAll}>Search all</Text>
          </TouchableOpacity>
        </View>

        {mockPlaces.popular.slice(0, 6).map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.destinationRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('RequestRide', { destination: place })}
          >
            <View style={[styles.destinationIconBox, { backgroundColor: place.iconBg }]}>
              <Icon name={place.icon} size={22} color={place.iconColor} />
            </View>
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationName} numberOfLines={1}>
                {place.name}
              </Text>
              <Text style={styles.destinationAddress} numberOfLines={1}>
                {place.address}
              </Text>
              {place.tag && (
                <View style={styles.tagBadge}>
                  <Text style={styles.tagBadgeText}>{place.tag}</Text>
                </View>
              )}
            </View>
            <View style={styles.destinationAction}>
              <Text style={styles.bookActionText}>Book</Text>
              <Icon name="chevron-forward-circle" size={20} color={colors.primaryDark} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
    paddingBottom: 8,
  },
  greeting: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: 13,
  },
  headline: {
    ...typography.title,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 2,
  },
  logoBadge: {
    backgroundColor: colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  logoText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.5,
  },
  logoDot: {
    color: colors.primary,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 14,
    borderRadius: radius.full,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...shadows.sm,
  },
  searchIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 14,
  },
  searchSuffix: {
    paddingHorizontal: 6,
  },

  // Saved places
  savedPlaces: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 14,
    gap: 10,
  },
  savedPlaceChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EFECE6',
  },
  savedIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  savedPlaceText: {
    flex: 1,
  },
  savedPlaceName: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.textPrimary,
    fontSize: 13,
  },
  savedPlaceAddress: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },

  // Categories
  categoriesHeader: {
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 18,
    marginBottom: 10,
  },
  categoriesTitle: {
    ...typography.caption,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    gap: 10,
  },
  categoryItem: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  categoryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadgeRow: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 8.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  categoryLabel: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  categorySubtitle: {
    fontSize: 10.5,
    color: colors.textTertiary,
    marginTop: 2,
    fontWeight: '500',
  },

  // Promo Card (Yellow Card)
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.screenHorizontal,
    marginTop: 20,
    borderRadius: radius.card,
    padding: spacing.cardPadding,
    overflow: 'hidden',
    ...shadows.sm,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 22,
    lineHeight: 26,
    color: colors.dark,
    fontWeight: '800',
  },
  promoSubtitle: {
    color: colors.dark,
    opacity: 0.75,
    marginTop: 4,
    fontSize: 13,
  },
  promoIconArea: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionSub: {
    fontSize: 12,
    color: colors.textTertiary,
    marginTop: 1,
  },
  viewAll: {
    ...typography.buttonSmall,
    color: colors.dark,
    fontWeight: '700',
  },

  // Destination rows
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  destinationIconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  destinationInfo: {
    flex: 1,
  },
  destinationName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  destinationAddress: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
    marginTop: 4,
  },
  tagBadgeText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  destinationAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 8,
  },
  bookActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});

export default PassengerHomeScreen;
