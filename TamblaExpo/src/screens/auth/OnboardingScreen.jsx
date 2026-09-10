/**
 * OnboardingScreen — Minimalist Uber-Style Onboarding
 *
 * Clean white background with friendly cartoon illustrations and punchy copy:
 * 1. Cabs & Rides — "Request a ride in seconds"
 * 2. Tambula Boda — "Beat traffic on a Boda"
 * 3. Express Delivery — "Send packages door-to-door"
 */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ONBOARDING_STORAGE_KEY = '@tambula_onboarding_completed';

const SLIDES = [
  {
    id: '1',
    image: require('../../../assets/onboarding/ride_taxi.jpg'),
    title: 'Request a ride in seconds',
    subtitle:
      'Choose from comfortable cabs and spacious XL rides with guaranteed upfront fares and vetted drivers.',
  },
  {
    id: '2',
    image: require('../../../assets/onboarding/boda_moto.jpg'),
    title: 'Beat traffic on a Boda',
    subtitle:
      'Zip through Kampala gridlock safely with professional, background-checked riders equipped with helmets.',
  },
  {
    id: '3',
    image: require('../../../assets/onboarding/delivery_box.jpg'),
    title: 'Send packages door-to-door',
    subtitle:
      'Fast, reliable parcel delivery across town with real-time GPS tracking and secure recipient PIN verification.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleFinish = async (target = 'Passenger') => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Failed to save onboarding completion', e);
    }
    navigation.replace(target);
  };

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Failed to save onboarding completion', e);
    }
    navigation.navigate('PhoneLogin');
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleFinish('Passenger');
    }
  };

  const onScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const isLast = currentIndex === SLIDES.length - 1;

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      {/* Cartoon Illustration */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      {/* Copy Section */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Header with Brand & Skip */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.brandName}>
          Tambula<Text style={styles.brandDot}>.</Text>
        </Text>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => handleFinish('Passenger')}
          activeOpacity={0.6}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        style={styles.carousel}
      />

      {/* Footer Controls */}
      <View
        style={[
          styles.footer,
          { paddingBottom: Math.max(insets.bottom, 16) + 12 },
        ]}
      >
        {/* Minimal Dots Indicator */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => {
            const active = i === currentIndex;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  active ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>
            {isLast ? 'Get Started' : 'Continue'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={handleLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.8,
  },
  brandDot: {
    color: colors.primary,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71717A',
  },
  carousel: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 280,
  },
  textContainer: {
    paddingHorizontal: 28,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.6,
    lineHeight: 34,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: '#64748B',
    fontWeight: '400',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#000000',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#E2E8F0',
  },
  primaryButton: {
    width: '100%',
    height: 54,
    backgroundColor: '#000000',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#64748B',
  },
  loginLinkBold: {
    color: '#000000',
    fontWeight: '700',
  },
});

export default OnboardingScreen;
