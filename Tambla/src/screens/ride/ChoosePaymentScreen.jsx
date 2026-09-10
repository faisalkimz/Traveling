/**
 * ChoosePaymentScreen — Select payment method.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ScreenHeader from '../../components/common/ScreenHeader';
import PaymentMethodRow from '../../components/wallet/PaymentMethodRow';
import TamblaButton from '../../components/common/TamblaButton';
import colors from '../../theme/colors';
import spacing from '../../theme/spacing';
import mockPayments from '../../data/mockPayments';

const ChoosePaymentScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('pm1');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScreenHeader title="Payment Method" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        {mockPayments.methods.map((method) => (
          <PaymentMethodRow
            key={method.id}
            type={method.type}
            label={method.label}
            detail={method.detail}
            isDefault={method.isDefault}
            selected={selected === method.id}
            onPress={() => setSelected(method.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.cta}>
        <TamblaButton title="Confirm" onPress={() => navigation.goBack()} variant="primary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { paddingBottom: 24 },
  cta: { paddingHorizontal: spacing.screenHorizontal, paddingBottom: 24 },
});

export default ChoosePaymentScreen;
