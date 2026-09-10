/**
 * ProfileAvatar — Circular avatar with fallback initials.
 */
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import { getInitials } from '../../utils/helpers';

const ProfileAvatar = ({ name, imageUri, size = 48, style }) => {
  const initials = getInitials(name);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  initials: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default ProfileAvatar;
