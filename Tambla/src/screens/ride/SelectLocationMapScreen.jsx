/**
 * SelectLocationMapScreen — Select precise location on map.
 * Full screen map simulation, central pin, address card, and confirmation CTA.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const { width } = Dimensions.get('window');

const SelectLocationMapScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const initialType = route?.params?.type || 'pickup';
  const [address, setAddress] = useState(
    initialType === 'pickup'
      ? 'Acacia Avenue 14, Kololo, Kampala'
      : 'Entebbe International Airport, Entebbe'
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Simulated Map Background */}
      <View style={styles.mapContainer}>
        {/* Map grid lines & roads */}
        <View style={styles.mapRoadHorizontal1} />
        <View style={styles.mapRoadHorizontal2} />
        <View style={styles.mapRoadDiagonal} />
        <View style={styles.mapRoadVertical1} />
        <View style={styles.mapRoadVertical2} />

        {/* Lake Victoria hint */}
        <View style={styles.waterFeature} />

        {/* Central Pin */}
        <View style={styles.pinWrapper} pointerEvents="none">
          <View style={styles.pinTooltip}>
            <Text style={styles.pinTooltipText}>
              {initialType === 'pickup' ? 'Set pickup point' : 'Set destination'}
            </Text>
          </View>
          <View style={styles.pinIconContainer}>
            <Icon
              name="location"
              size={36}
              color={initialType === 'pickup' ? colors.primary : colors.dark}
            />
          </View>
          <View style={styles.pinDotShadow} />
        </View>

        {/* Recenter button */}
        <TouchableOpacity
          style={[styles.recenterBtn, { bottom: insets.bottom + 210 }]}
          activeOpacity={0.8}
          onPress={() => {
            setAddress('Acacia Mall, Kisementi, Kololo');
          }}
        >
          <Icon name="locate" size={22} color={colors.dark} />
        </TouchableOpacity>
      </View>

      {/* Top Header Bar */}
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={20} color={colors.dark} />
        </TouchableOpacity>
        <View style={styles.titleBadge}>
          <Text style={styles.titleText}>
            {initialType === 'pickup' ? 'Choose Pickup Point' : 'Choose Destination'}
          </Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Bottom Address Confirmation Card */}
      <View style={[styles.bottomCard, { paddingBottom: Math.max(insets.bottom + 16, 24) }]}>
        <View style={styles.sheetHandle} />

        <View style={styles.addressRow}>
          <View
            style={[
              styles.markerDot,
              { backgroundColor: initialType === 'pickup' ? colors.primary : colors.dark },
            ]}
          />
          <View style={styles.addressInfo}>
            <Text style={styles.addressTitle} numberOfLines={1}>
              {address}
            </Text>
            <Text style={styles.addressSubtitle}>
              Move pin or tap to adjust exact building entrance
            </Text>
          </View>
        </View>

        <View style={styles.quickOptions}>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setAddress('Acacia Mall, Kisementi, Kololo')}
          >
            <Icon name="business-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.chipText}>Acacia Mall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setAddress('Makerere Main Gate, Kampala')}
          >
            <Icon name="school-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.chipText}>Makerere Univ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setAddress('Lugogo Mall, Lugogo Bypass')}
          >
            <Icon name="cart-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.chipText}>Lugogo Mall</Text>
          </TouchableOpacity>
        </View>

        <TamblaButton
          title={initialType === 'pickup' ? 'Confirm Pickup' : 'Confirm Destination'}
          variant="primary"
          onPress={() => {
            navigation.navigate('RequestRide', {
              selectedAddress: address,
              type: initialType,
            });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMap,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8ECE9',
    overflow: 'hidden',
  },
  mapRoadHorizontal1: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    height: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D4D8D5',
  },
  mapRoadHorizontal2: {
    position: 'absolute',
    top: '55%',
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: '#FFF8DE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E6DCB8',
  },
  mapRoadVertical1: {
    position: 'absolute',
    left: '35%',
    top: 0,
    bottom: 0,
    width: 16,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D4D8D5',
  },
  mapRoadVertical2: {
    position: 'absolute',
    left: '68%',
    top: 0,
    bottom: 0,
    width: 26,
    backgroundColor: '#FFF8DE',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E6DCB8',
  },
  mapRoadDiagonal: {
    position: 'absolute',
    top: '15%',
    left: '-20%',
    width: width * 1.5,
    height: 18,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '35deg' }],
  },
  waterFeature: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#CFE2FE',
    opacity: 0.6,
  },
  pinWrapper: {
    position: 'absolute',
    top: '46%',
    left: '50%',
    marginLeft: -60,
    marginTop: -48,
    width: 120,
    alignItems: 'center',
  },
  pinTooltip: {
    backgroundColor: colors.dark,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
    marginBottom: 4,
    ...shadows.sm,
  },
  pinTooltipText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
  pinIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinDotShadow: {
    width: 10,
    height: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.25)',
    marginTop: -2,
  },
  recenterBtn: {
    position: 'absolute',
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  titleBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.full,
    ...shadows.sm,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 12,
    ...shadows.lg,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.borderDarker,
    alignSelf: 'center',
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressTitle: {
    ...typography.subheading,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  addressSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  quickOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});

export default SelectLocationMapScreen;
