/**
 * LostItemScreen — Report & Recover Lost Belongings
 *
 * Trip selection, lost item category & description, direct driver contact,
 * and dispatch ticket submission.
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

const ITEM_TYPES = ['Phone / Tablet', 'Keys', 'Bag / Backpack', 'Wallet / Cards', 'Clothing', 'Other'];

const LostItemScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const trip = route?.params?.trip || {
    id: 'TRIP-9842',
    date: '10 Sep 2026',
    driver: 'Musa Ssebufu',
    destination: 'Entebbe International Airport',
  };

  const [selectedType, setSelectedType] = useState('Phone / Tablet');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('0772 123 456');

  const handleSubmit = () => {
    Alert.alert(
      'Lost Item Report Filed',
      `Reference: LOST-${trip.id}\nWe have alerted driver ${trip.driver} and our Kampala operations team.\nYou will receive a callback within 30 minutes.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Find Lost Item" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Trip Associated */}
        <View style={styles.tripCard}>
          <Text style={styles.cardSectionTitle}>SELECTED TRIP</Text>
          <View style={styles.tripRow}>
            <View style={styles.carIconBg}>
              <Icon name="car" size={20} color={colors.dark} />
            </View>
            <View style={styles.tripCol}>
              <Text style={styles.tripDest} numberOfLines={1}>{trip.destination}</Text>
              <Text style={styles.tripSub}>
                {trip.date} • Driver: {trip.driver}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Driver Contact */}
        <View style={styles.callDriverCard}>
          <View style={styles.callDriverIcon}>
            <Icon name="call" size={20} color={colors.primary} />
          </View>
          <View style={styles.callDriverTextCol}>
            <Text style={styles.callDriverTitle}>Call Driver Directly</Text>
            <Text style={styles.callDriverSub}>
              Call Musa Ssebufu using secure masked phone relay.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Alert.alert('Calling Driver', 'Connecting to driver Musa Ssebufu...')}
          >
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* Item Category */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>WHAT WAS LEFT BEHIND?</Text>
          <View style={styles.chipsGrid}>
            {ITEM_TYPES.map((type) => {
              const isSelected = selectedType === type;
              return (
                <TouchableOpacity
                  key={type}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardSectionTitle}>DETAILED DESCRIPTION</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Color, brand, distinguishing marks, where in the car it was left..."
            placeholderTextColor={colors.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Alternative Phone */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>BEST NUMBER TO REACH YOU</Text>
          <TextInput
            style={styles.phoneInput}
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
            placeholder="Enter active phone number"
          />
        </View>

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Submit Lost Item Report"
            variant="primary"
            onPress={handleSubmit}
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
  tripCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  cardSectionTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tripCol: {
    flex: 1,
  },
  tripDest: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tripSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  callDriverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 14,
    borderRadius: radius.md,
    marginBottom: 14,
  },
  callDriverIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,204,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  callDriverTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  callDriverTitle: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.white,
  },
  callDriverSub: {
    fontSize: 11,
    color: colors.textOnDarkSecondary,
  },
  callBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.xs,
  },
  callBtnText: {
    color: colors.dark,
    fontWeight: '700',
    fontSize: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.dark,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },
  textArea: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.xs,
    padding: 10,
    fontSize: 13,
    color: colors.textPrimary,
    minHeight: 70,
    textAlignVertical: 'top',
  },
  phoneInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.xs,
    paddingHorizontal: 12,
    height: 46,
    fontSize: 14,
    color: colors.textPrimary,
  },
  ctaWrapper: {
    marginTop: 6,
  },
});

export default LostItemScreen;
