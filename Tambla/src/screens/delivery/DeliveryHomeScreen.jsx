/**
 * DeliveryHomeScreen — On-Demand Parcel Delivery
 *
 * Sender pickup, recipient drop-off, parcel type, fragile toggle,
 * instant pricing in UGX, and order courier CTA.
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
  Switch,
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

const PARCEL_TYPES = [
  { id: 'doc', label: 'Documents', icon: 'document-text-outline', weight: 'Up to 1 kg' },
  { id: 'box', label: 'Small Box', icon: 'cube-outline', weight: 'Up to 5 kg' },
  { id: 'food', label: 'Food / Groceries', icon: 'fast-food-outline', weight: 'Up to 8 kg' },
  { id: 'cargo', label: 'Large Item', icon: 'briefcase-outline', weight: 'Up to 15 kg' },
];

const DeliveryHomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState('box');
  const [senderAddress, setSenderAddress] = useState('Acacia Mall, Kololo');
  const [senderPhone, setSenderPhone] = useState('0772 123 456');
  const [recipientAddress, setRecipientAddress] = useState('Bugolobi Village Mall, Spring Road');
  const [recipientPhone, setRecipientPhone] = useState('0752 987 654');
  const [isFragile, setIsFragile] = useState(false);
  const [notes, setNotes] = useState('');

  const handleOrder = () => {
    navigation.navigate('DeliveryTracking', {
      delivery: {
        trackingNumber: 'DEL-UG-8821',
        sender: senderAddress,
        recipient: recipientAddress,
        recipientPhone,
        type: selectedType,
        fare: 'UGX 8,500',
        otp: '5924',
        courier: {
          name: 'Ronald Kato',
          vehicle: 'Bajaj Boxer Boda (UGX 882M)',
          rating: 4.9,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Send a Parcel" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Icon name="bicycle" size={24} color={colors.primary} />
          </View>
          <View style={styles.bannerTextCol}>
            <Text style={styles.bannerTitle}>Fast Moto Courier</Text>
            <Text style={styles.bannerDesc}>Door-to-door delivery within Kampala & Wakiso.</Text>
          </View>
        </View>

        {/* Sender & Receiver Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>ROUTE & CONTACTS</Text>

          {/* Sender */}
          <View style={styles.addressBlock}>
            <View style={[styles.dot, { backgroundColor: colors.primary }]} />
            <View style={styles.addressCol}>
              <Text style={styles.addrType}>PICKUP ADDRESS</Text>
              <TextInput
                style={styles.input}
                value={senderAddress}
                onChangeText={setSenderAddress}
              />
              <TextInput
                style={styles.phoneInput}
                value={senderPhone}
                onChangeText={setSenderPhone}
                placeholder="Sender phone"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.divider} />

          {/* Recipient */}
          <View style={styles.addressBlock}>
            <View style={[styles.dot, { backgroundColor: colors.dark }]} />
            <View style={styles.addressCol}>
              <Text style={styles.addrType}>RECIPIENT ADDRESS</Text>
              <TextInput
                style={styles.input}
                value={recipientAddress}
                onChangeText={setRecipientAddress}
              />
              <TextInput
                style={styles.phoneInput}
                value={recipientPhone}
                onChangeText={setRecipientPhone}
                placeholder="Recipient phone"
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Parcel Category */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>SELECT PARCEL CATEGORY</Text>
          <View style={styles.typesGrid}>
            {PARCEL_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeBtn, isSelected && styles.typeBtnSelected]}
                  onPress={() => setSelectedType(type.id)}
                  activeOpacity={0.8}
                >
                  <Icon
                    name={type.icon}
                    size={24}
                    color={isSelected ? colors.dark : colors.textSecondary}
                  />
                  <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>
                    {type.label}
                  </Text>
                  <Text style={styles.typeWeight}>{type.weight}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Fragile & Instructions */}
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View style={styles.switchTextCol}>
              <Text style={styles.switchTitle}>Fragile Item</Text>
              <Text style={styles.switchSub}>Driver handles package with extra care</Text>
            </View>
            <Switch
              value={isFragile}
              onValueChange={setIsFragile}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <Text style={styles.cardTitle}>DELIVERY INSTRUCTIONS</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Apartment floor, gate code, recipient instructions..."
            placeholderTextColor={colors.textTertiary}
            value={notes}
            onChangeText={setNotes}
            multiline
          />
        </View>

        {/* Price & Confirmation */}
        <View style={styles.quoteCard}>
          <View>
            <Text style={styles.quoteLabel}>ESTIMATED FARE</Text>
            <Text style={styles.quotePrice}>UGX 8,500</Text>
            <Text style={styles.quoteTime}>ETA: ~25 mins</Text>
          </View>
          <View style={styles.paymentTag}>
            <Text style={styles.paymentTagText}>MTN MoMo</Text>
          </View>
        </View>

        <View style={styles.ctaWrapper}>
          <TamblaButton
            title="Book Delivery Courier"
            variant="primary"
            onPress={handleOrder}
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark,
    padding: 14,
    borderRadius: radius.md,
    marginBottom: 16,
    ...shadows.sm,
  },
  bannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,204,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.bodyBold,
    color: colors.white,
  },
  bannerDesc: {
    ...typography.caption,
    color: colors.textOnDarkSecondary,
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
  addressBlock: {
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
    marginRight: 12,
  },
  addressCol: {
    flex: 1,
  },
  addrType: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
    marginBottom: 4,
  },
  input: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
    paddingVertical: 2,
  },
  phoneInput: {
    ...typography.caption,
    color: colors.textSecondary,
    paddingVertical: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
    marginLeft: 22,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeBtn: {
    width: '48%',
    padding: 12,
    borderRadius: radius.sm,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeBtnSelected: {
    backgroundColor: '#FFFDF5',
    borderColor: colors.primary,
  },
  typeLabel: {
    ...typography.captionBold,
    color: colors.textPrimary,
    marginTop: 6,
  },
  typeLabelSelected: {
    color: colors.dark,
  },
  typeWeight: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchTextCol: {
    flex: 1,
  },
  switchTitle: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  switchSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  notesInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.xs,
    padding: 10,
    fontSize: 13,
    color: colors.textPrimary,
    minHeight: 50,
  },
  quoteCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  quoteLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
  },
  quotePrice: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  quoteTime: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  paymentTag: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentTagText: {
    ...typography.captionBold,
    color: colors.textPrimary,
  },
  ctaWrapper: {
    marginTop: 4,
  },
});

export default DeliveryHomeScreen;
