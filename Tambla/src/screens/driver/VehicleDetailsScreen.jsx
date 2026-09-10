/**
 * VehicleDetailsScreen — Driver Vehicle Specifications
 *
 * Registration, model, inspection, capacity, and insurance details.
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import StatusBadge from '../../components/common/StatusBadge';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const VehicleDetailsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Vehicle Details" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Car Hero Card */}
        <View style={styles.carHeroCard}>
          <View style={styles.carIconContainer}>
            <Icon name="car-sport" size={48} color={colors.primary} />
          </View>
          <Text style={styles.carName}>Toyota Corolla (2018)</Text>
          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>UAX 123Z</Text>
          </View>
          <View style={styles.statusRow}>
            <StatusBadge status="verified" label="Approved for Tambla Standard" />
          </View>
        </View>

        {/* Specifications List */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>VEHICLE SPECIFICATIONS</Text>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Category</Text>
            <Text style={styles.specValue}>Tambla Standard</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Color</Text>
            <View style={styles.colorVal}>
              <View style={styles.whiteColorDot} />
              <Text style={styles.specValue}>White</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Capacity</Text>
            <Text style={styles.specValue}>4 Passenger Seats</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Fuel Type</Text>
            <Text style={styles.specValue}>Petrol</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Registration City</Text>
            <Text style={styles.specValue}>Kampala, Uganda</Text>
          </View>
        </View>

        {/* Inspections & Permits */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SAFETY & REGISTRATION</Text>

          <View style={styles.specRow}>
            <View>
              <Text style={styles.specLabel}>SGS Inspection</Text>
              <Text style={styles.specSub}>Valid until 18 Dec 2026</Text>
            </View>
            <StatusBadge status="verified" label="Passed" />
          </View>
          <View style={styles.divider} />

          <View style={styles.specRow}>
            <View>
              <Text style={styles.specLabel}>Sanlam Insurance</Text>
              <Text style={styles.specSub}>Policy #SN-8924-UG</Text>
            </View>
            <StatusBadge status="warning" label="Renew Soon" />
          </View>
        </View>

        {/* Manage / Update Vehicle */}
        <View style={styles.btnWrapper}>
          <TamblaButton
            title="Update Vehicle Details"
            variant="outline"
            onPress={() => Alert.alert('Update Vehicle', 'Submit request to add or change vehicle.')}
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
  carHeroCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    ...shadows.sm,
  },
  carIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  carName: {
    ...typography.heading,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  plateContainer: {
    backgroundColor: colors.dark,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: radius.xs,
    marginBottom: 12,
  },
  plateText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusRow: {
    marginTop: 2,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    ...shadows.xs,
  },
  cardTitle: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  specLabel: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  specSub: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  specValue: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  colorVal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  whiteColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderDarker,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },
  btnWrapper: {
    marginTop: 8,
  },
});

export default VehicleDetailsScreen;
