/**
 * TripsScreen — Uber-inspired Passenger Activity & Trip History.
 *
 * Features:
 * - Segmented status tabs (Past, Upcoming, Cancelled) with counts
 * - Quick category filter pills (All, Rides, Boda Moto, Delivery)
 * - Uber-style rich trip cards with vehicle squircle icons, route timeline, driver info, and fare
 * - 1-Tap "Ride Again" rebooking action
 * - Animated Skeleton Loading state on pull-to-refresh & filter switch
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import StatusBadge from '../../components/common/StatusBadge';
import { TripCardSkeleton } from '../../components/common/SkeletonLoader';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';
import mockTrips from '../../data/mockTrips';
import { formatUGX } from '../../utils/helpers';

const TABS = ['Past', 'Upcoming', 'Cancelled'];

const SERVICE_FILTERS = [
  { id: 'all', label: 'All Services', icon: 'apps-outline' },
  { id: 'standard', label: 'Rides', icon: 'car-sport-outline' },
  { id: 'moto', label: 'Boda', icon: 'bicycle-outline' },
  { id: 'delivery', label: 'Delivery', icon: 'cube-outline' },
];

const getServiceMeta = (rideType = 'standard') => {
  switch (rideType) {
    case 'moto':
      return {
        label: 'Tambula Boda',
        icon: 'bicycle',
        bg: '#DCFCE7',
        color: '#15803D',
      };
    case 'delivery':
      return {
        label: 'Express Courier',
        icon: 'cube',
        bg: '#E0E7FF',
        color: '#4338CA',
      };
    default:
      return {
        label: 'Tambula Ride',
        icon: 'car-sport',
        bg: '#FEF3C7',
        color: '#B45309',
      };
  }
};

const TripsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Past');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Trigger a brief skeleton shimmer on tab change for sleek feedback
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => {
      setIsLoading(false);
    }, 450);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const getFilteredTrips = () => {
    let list = [];
    if (activeTab === 'Past') {
      list = mockTrips.past.filter((t) => t.status === 'completed');
    } else if (activeTab === 'Upcoming') {
      list = mockTrips.upcoming || [];
    } else if (activeTab === 'Cancelled') {
      list = mockTrips.past.filter((t) => t.status === 'cancelled');
    }

    if (selectedFilter !== 'all') {
      list = list.filter((t) => {
        if (selectedFilter === 'standard') return t.rideType === 'standard' || !t.rideType;
        if (selectedFilter === 'moto') return t.rideType === 'moto';
        if (selectedFilter === 'delivery') return t.rideType === 'delivery';
        return true;
      });
    }

    return list;
  };

  const trips = getFilteredTrips();

  const handleTripPress = (trip) => {
    navigation.navigate('TripDetails', {
      trip: {
        id: trip.id,
        date: `${trip.date}, ${trip.time}`,
        driver: trip.driverName || 'Musa Ssebufu',
        rating: trip.rating || 4.8,
        car: trip.vehicle || 'Toyota Corolla — UAX 123Z',
        plate: trip.plate || 'UAX 123Z',
        pickup: trip.pickup?.name || 'Ntinda, Kampala',
        destination: trip.destination?.name || 'Kampala City Centre',
        distance: trip.distance ? `${trip.distance} km` : '6.4 km',
        duration: trip.duration ? `${trip.duration} mins` : '18 mins',
        fare: formatUGX(trip.fare),
        paymentMethod: trip.paymentLabel || 'MTN Mobile Money',
        status:
          trip.status === 'completed'
            ? 'Completed'
            : trip.status === 'cancelled'
            ? 'Cancelled'
            : 'Upcoming',
        rideType: trip.rideType || 'standard',
      },
    });
  };

  const handleRebook = (trip) => {
    navigation.navigate('Home', {
      screen: 'RequestRide',
      params: {
        destination: trip.destination || { name: 'Kampala City Centre' },
        initialCategory: trip.rideType === 'moto' ? 'moto' : 'ride',
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Your Activity"
        rightIcon="help-circle-outline"
        onRightPress={() => navigation.navigate('HelpCenter')}
      />

      {/* Uber-style Segmented Navigation Tabs */}
      <View style={styles.tabContainer}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          let count = 0;
          if (tab === 'Past') count = mockTrips.past.filter((t) => t.status === 'completed').length;
          if (tab === 'Upcoming') count = mockTrips.upcoming ? mockTrips.upcoming.length : 0;
          if (tab === 'Cancelled') count = mockTrips.past.filter((t) => t.status === 'cancelled').length;

          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              onPress={() => handleTabChange(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
              {count > 0 && (
                <View style={[styles.tabBadge, isActive && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, isActive && styles.tabBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Sub-Filters: All, Rides, Boda, Delivery */}
      <View style={styles.filterScrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {SERVICE_FILTERS.map((f) => {
            const isSelected = selectedFilter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => setSelectedFilter(f.id)}
                activeOpacity={0.7}
              >
                <Icon
                  name={f.icon}
                  size={14}
                  color={isSelected ? colors.dark : colors.textSecondary}
                  style={{ marginRight: 5 }}
                />
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primaryDark]}
            tintColor={colors.primaryDark}
          />
        }
      >
        {isLoading || refreshing ? (
          <View style={{ paddingHorizontal: spacing.screenHorizontal, paddingTop: 6 }}>
            <TripCardSkeleton />
            <TripCardSkeleton />
            <TripCardSkeleton />
          </View>
        ) : trips.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Icon name="car-sport-outline" size={40} color={colors.textTertiary} />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab.toLowerCase()} trips found</Text>
            <Text style={styles.emptySub}>
              {selectedFilter !== 'all'
                ? 'Try selecting "All Services" to see all your activity.'
                : 'When you take a ride or send a delivery, your receipts will appear here.'}
            </Text>
            {activeTab === 'Past' && (
              <TouchableOpacity
                style={styles.emptyCta}
                onPress={() => navigation.navigate('Home', { screen: 'PassengerHome' })}
              >
                <Text style={styles.emptyCtaText}>Book a Ride</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          trips.map((trip) => {
            const service = getServiceMeta(trip.rideType);
            const isCompleted = trip.status === 'completed';

            return (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                activeOpacity={0.85}
                onPress={() => handleTripPress(trip)}
              >
                {/* Card Top: Squircle Service Icon + Destination Header + Fare */}
                <View style={styles.cardHeader}>
                  <View style={[styles.serviceIconSquircle, { backgroundColor: service.bg }]}>
                    <Icon name={service.icon} size={20} color={service.color} />
                  </View>
                  <View style={styles.headerInfo}>
                    <Text style={styles.destinationTitle} numberOfLines={1}>
                      {trip.destination?.name || 'Destination'}
                    </Text>
                    <View style={styles.dateRow}>
                      <Text style={styles.dateText}>
                        {trip.date} • {trip.time}
                      </Text>
                      <View style={styles.dotSeparator} />
                      <Text style={styles.serviceNameTag}>{service.label}</Text>
                    </View>
                  </View>
                  <View style={styles.fareCol}>
                    <Text style={styles.tripFare}>{formatUGX(trip.fare)}</Text>
                    <StatusBadge status={trip.status} />
                  </View>
                </View>

                {/* Route Visualizer */}
                <View style={styles.routeBox}>
                  <View style={styles.routeTimeline}>
                    <View style={[styles.routeDot, { backgroundColor: colors.primary }]} />
                    <View style={styles.routeConnector} />
                    <View style={[styles.routeDot, { backgroundColor: colors.dark }]} />
                  </View>
                  <View style={styles.routeDetails}>
                    <Text style={styles.routeText} numberOfLines={1}>
                      {trip.pickup?.name || trip.pickup?.address || 'Pickup location'}
                    </Text>
                    <Text style={[styles.routeText, { marginTop: 6, fontWeight: '600' }]} numberOfLines={1}>
                      {trip.destination?.name || trip.destination?.address || 'Drop-off location'}
                    </Text>
                  </View>
                </View>

                {/* Footer: Driver / Payment details & Uber-style "Ride Again" CTA */}
                <View style={styles.cardFooter}>
                  <View style={styles.driverInfo}>
                    <Icon name="person-circle-outline" size={18} color={colors.textSecondary} />
                    <Text style={styles.driverName} numberOfLines={1}>
                      {trip.driverName || 'Verified Driver'}
                    </Text>
                    {trip.rating && (
                      <View style={styles.ratingBadge}>
                        <Icon name="star" size={11} color="#D97706" />
                        <Text style={styles.ratingText}>{trip.rating}</Text>
                      </View>
                    )}
                  </View>

                  {isCompleted && (
                    <TouchableOpacity
                      style={styles.rebookButton}
                      activeOpacity={0.7}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleRebook(trip);
                      }}
                    >
                      <Icon name="refresh-outline" size={13} color={colors.dark} style={{ marginRight: 4 }} />
                      <Text style={styles.rebookText}>Ride Again</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenHorizontal,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginRight: 8,
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.dark,
    fontWeight: '700',
  },
  tabBadge: {
    backgroundColor: '#F3F4F6',
    borderRadius: radius.pill,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  tabBadgeActive: {
    backgroundColor: colors.primary,
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tabBadgeTextActive: {
    color: colors.dark,
  },
  filterScrollWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  filtersContent: {
    paddingHorizontal: spacing.screenHorizontal,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: '#F4F5F7',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterChipTextSelected: {
    color: colors.dark,
    fontWeight: '700',
  },
  scrollContent: {
    paddingVertical: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: colors.textTertiary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  emptyCta: {
    marginTop: 18,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  emptyCtaText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.dark,
  },
  tripCard: {
    marginHorizontal: spacing.screenHorizontal,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIconSquircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
  },
  destinationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  dateText: {
    fontSize: 11,
    color: colors.textTertiary,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textTertiary,
    marginHorizontal: 5,
  },
  serviceNameTag: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  fareCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  tripFare: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  routeBox: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 10,
  },
  routeTimeline: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 14,
    marginRight: 8,
  },
  routeDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  routeConnector: {
    width: 1.5,
    height: 14,
    backgroundColor: '#D1D5DB',
    marginVertical: 2,
  },
  routeDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  routeText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#F0F0F0',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  driverName: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#B45309',
  },
  rebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  rebookText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.dark,
  },
});

export default TripsScreen;
