/**
 * RateDriverScreen — Rate & Tip Driver
 *
 * 5-star rating, feedback chips, optional tip in UGX, and submit CTA.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
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

const FEEDBACK_CHIPS = [
  'Great driving',
  'Clean car',
  'Friendly',
  'Safe driving',
  'Easy pickup',
  'Polite conversation',
];

const TIP_AMOUNTS = [
  { label: 'No Tip', value: 0 },
  { label: 'UGX 1,000', value: 1000 },
  { label: 'UGX 2,000', value: 2000 },
  { label: 'UGX 5,000', value: 5000 },
];

const RateDriverScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const driver = route?.params?.driver || {
    name: 'Musa Ssebufu',
    vehicle: 'Toyota Corolla (White)',
    plate: 'UAX 123Z',
  };

  const [rating, setRating] = useState(5);
  const [selectedChips, setSelectedChips] = useState(['Great driving', 'Safe driving']);
  const [tip, setTip] = useState(0);
  const [comment, setComment] = useState('');

  const toggleChip = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Thank You!',
      `Your feedback for ${driver.name} has been submitted.`,
      [
        {
          text: 'Done',
          onPress: () => {
            navigation.navigate('Home', { screen: 'PassengerHome' });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader
        title="Rate Your Driver"
        onBack={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home', { screen: 'PassengerHome' });
          }
        }}
      />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Profile Header */}
        <View style={styles.driverSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{driver.name?.charAt(0) || 'M'}</Text>
          </View>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.vehicleDetails}>
            {driver.vehicle} • {driver.plate}
          </Text>

          {/* Interactive Stars */}
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                activeOpacity={0.7}
                onPress={() => setRating(star)}
                style={styles.starBtn}
              >
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= rating ? colors.starYellow : colors.borderDarker}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.ratingHint}>
            {rating === 5
              ? 'Excellent trip!'
              : rating === 4
              ? 'Good ride'
              : rating === 3
              ? 'Average experience'
              : 'Had some issues'}
          </Text>
        </View>

        {/* Feedback Chips */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHAT WENT WELL?</Text>
          <View style={styles.chipsContainer}>
            {FEEDBACK_CHIPS.map((chip) => {
              const isSelected = selectedChips.includes(chip);
              return (
                <TouchableOpacity
                  key={chip}
                  activeOpacity={0.8}
                  style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleChip(chip)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected,
                    ]}
                  >
                    {chip}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Add Tip */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADD A DRIVER TIP</Text>
          <Text style={styles.sectionSub}>100% of your tip goes directly to the driver.</Text>
          <View style={styles.tipRow}>
            {TIP_AMOUNTS.map((item) => (
              <TouchableOpacity
                key={item.label}
                activeOpacity={0.8}
                style={[styles.tipBtn, tip === item.value && styles.tipBtnSelected]}
                onPress={() => setTip(item.value)}
              >
                <Text
                  style={[
                    styles.tipBtnText,
                    tip === item.value && styles.tipBtnTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Optional Comment */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LEAVE A NOTE (OPTIONAL)</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a message of appreciation..."
            placeholderTextColor={colors.textTertiary}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TamblaButton
            title="Submit Rating"
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
    paddingTop: 16,
  },
  driverSection: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    ...shadows.sm,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.dark,
  },
  driverName: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  vehicleDetails: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  starBtn: {
    padding: 4,
  },
  ratingHint: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  sectionSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 10,
    marginTop: -4,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
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
  tipRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tipBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipBtnSelected: {
    backgroundColor: colors.dark,
    borderColor: colors.dark,
  },
  tipBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  tipBtnTextSelected: {
    color: colors.white,
  },
  commentInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 80,
  },
  buttonContainer: {
    marginTop: 8,
  },
});

export default RateDriverScreen;
