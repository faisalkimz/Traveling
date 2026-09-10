/**
 * SplashScreen — Tambula Welcome Screen
 *
 * Clean, cinematic welcome screen (reverted to original):
 * - Ambient background image with dark overlay
 * - Tambula branding & tagline & description
 * - Automatically advances to Onboarding / Passenger after 1.8s
 *   or on tap.
 */
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';

const BG_IMAGE =
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&auto=format&fit=crop&q=85';

const ONBOARDING_STORAGE_KEY = '@tambula_onboarding_completed';

const SplashScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleAdvance = () => {
    navigation.replace('Onboarding');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={handleAdvance}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ImageBackground
        source={{ uri: BG_IMAGE }}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View
          style={[
            styles.content,
            {
              paddingTop: insets.top + 24,
              paddingBottom: Math.max(insets.bottom, 16) + 32,
            },
          ]}
        >
          {/* Spacer */}
          <View style={styles.spacer} />

          {/* Branding Section */}
          <View style={styles.brandingSection}>
            <Text style={styles.appName}>
              Tambula<Text style={styles.appNameAccent}>.</Text>
            </Text>
            <Text style={styles.tagline}>Rides Made Easy</Text>
            <Text style={styles.description}>
              Safe, affordable cabs, bodas, and express delivery across Kampala, Entebbe, and Wakiso.
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1019',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 15, 26, 0.85)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    justifyContent: 'flex-end',
  },
  spacer: {
    flex: 1,
  },

  // Branding Section
  brandingSection: {
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 40,
  },
  appName: {
    fontSize: 52,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -1.5,
  },
  appNameAccent: {
    color: colors.primary,
  },
  tagline: {
    ...typography.subheading,
    color: colors.primary,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.8,
    fontSize: 18,
  },
  description: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    fontSize: 14,
    maxWidth: '90%',
  },
});

export default SplashScreen;
