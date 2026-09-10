/**
 * SettingsScreen — Application Preferences & Permissions
 *
 * Push notifications, language (English/Luganda), permissions, security,
 * and data privacy controls.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenHeader from '../../components/common/ScreenHeader';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';

const SettingsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsReceipts, setSmsReceipts] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [language, setLanguage] = useState('English (Uganda)');

  const handleChangeLanguage = () => {
    Alert.alert('Language', 'Choose application language', [
      { text: 'English (Uganda)', onPress: () => setLanguage('English (Uganda)') },
      { text: 'Luganda', onPress: () => setLanguage('Luganda') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Trip Updates & Alerts</Text>
              <Text style={styles.rowSub}>Driver arrival, messages, and receipt push alerts</Text>
            </View>
            <Switch
              value={pushNotifs}
              onValueChange={setPushNotifs}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>SMS Trip Receipts</Text>
              <Text style={styles.rowSub}>Send instant SMS summary on completion</Text>
            </View>
            <Switch
              value={smsReceipts}
              onValueChange={setSmsReceipts}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={handleChangeLanguage}>
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Language</Text>
              <Text style={styles.rowSub}>{language}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Security & Permissions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SECURITY & PRIVACY</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Biometric / Face ID Login</Text>
              <Text style={styles.rowSub}>Protect payments and app access</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => Alert.alert('Location Permission', 'Tambla requires background location for accurate driver pickup.')}
          >
            <View style={styles.textCol}>
              <Text style={styles.rowTitle}>Location Permissions</Text>
              <Text style={styles.rowSub}>While Using App (Granted)</Text>
            </View>
            <Icon name="checkmark-circle" size={20} color={colors.success} />
          </TouchableOpacity>
        </View>

        {/* Danger zone */}
        <TouchableOpacity
          style={styles.deleteAccountBtn}
          onPress={() => Alert.alert('Delete Account', 'Are you sure you want to permanently delete your Tambla account?')}
        >
          <Text style={styles.deleteAccountText}>Delete Tambla Account</Text>
        </TouchableOpacity>
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
    marginBottom: 8,
    marginTop: 6,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textTertiary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textCol: {
    flex: 1,
    paddingRight: 10,
  },
  rowTitle: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  rowSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  deleteAccountBtn: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  deleteAccountText: {
    ...typography.bodyBold,
    color: colors.danger,
  },
});

export default SettingsScreen;
