/**
 * DriverDocumentsScreen — Driver Document Verification Hub
 *
 * Status tracker for Uganda National ID, Driving Permit, Vehicle Logbook,
 * Insurance certificate, and SGS inspection with status badges.
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
import Icon from '@expo/vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import StatusBadge from '../../components/common/StatusBadge';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const DOCUMENTS = [
  {
    id: 'doc1',
    title: 'National Identity Card (NIRA)',
    subtitle: 'NIN: CM91024108HJ8D • Verified',
    status: 'verified',
    statusLabel: 'Verified',
    icon: 'card-outline',
  },
  {
    id: 'doc2',
    title: 'Driving Permit (Uganda)',
    subtitle: 'Class: B, CM • Valid until Nov 2027',
    status: 'verified',
    statusLabel: 'Verified',
    icon: 'car-outline',
  },
  {
    id: 'doc3',
    title: 'Vehicle Logbook',
    subtitle: 'Registration: UAX 123Z • Verified',
    status: 'verified',
    statusLabel: 'Verified',
    icon: 'document-text-outline',
  },
  {
    id: 'doc4',
    title: 'Motor Third Party / Comprehensive Insurance',
    subtitle: 'Sanlam Uganda • Expires in 14 days',
    status: 'warning',
    statusLabel: 'Expiring Soon',
    icon: 'shield-outline',
  },
  {
    id: 'doc5',
    title: 'SGS Vehicle Inspection Certificate',
    subtitle: 'Ministry of Works & Transport • Passed',
    status: 'verified',
    statusLabel: 'Verified',
    icon: 'checkmark-done-circle-outline',
  },
  {
    id: 'doc6',
    title: 'Interpol Certificate of Good Conduct',
    subtitle: 'Under review by Tambla Safety Team',
    status: 'pending',
    statusLabel: 'In Review',
    icon: 'time-outline',
  },
];

const DriverDocumentsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleDocumentPress = (doc) => {
    Alert.alert(
      doc.title,
      `Status: ${doc.statusLabel}\n${doc.subtitle}\n\nWould you like to re-upload or update this document?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upload New Copy',
          onPress: () => Alert.alert('Upload Document', 'Opening camera/document picker...'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Driver Documents" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Compliance Banner */}
        <View style={styles.complianceCard}>
          <View style={styles.complianceIconBg}>
            <Icon name="shield-checkmark" size={24} color={colors.success} />
          </View>
          <View style={styles.complianceTextCol}>
            <Text style={styles.complianceTitle}>Account Fully Approved</Text>
            <Text style={styles.complianceSub}>
              You are eligible to receive rides in Kampala, Entebbe, and Wakiso. Keep insurance renewed.
            </Text>
          </View>
        </View>

        {/* Documents List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>REQUIRED DOCUMENTS</Text>
        </View>

        {DOCUMENTS.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.docCard}
            activeOpacity={0.8}
            onPress={() => handleDocumentPress(doc)}
          >
            <View style={styles.docIconBg}>
              <Icon name={doc.icon} size={22} color={colors.dark} />
            </View>
            <View style={styles.docDetails}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docSubtitle}>{doc.subtitle}</Text>
            </View>
            <StatusBadge status={doc.status} label={doc.statusLabel} />
          </TouchableOpacity>
        ))}
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
  complianceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    ...shadows.sm,
  },
  complianceIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  complianceTextCol: {
    flex: 1,
  },
  complianceTitle: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  complianceSub: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  docCard: {
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
  docIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  docDetails: {
    flex: 1,
    paddingRight: 8,
  },
  docTitle: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  docSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});

export default DriverDocumentsScreen;
