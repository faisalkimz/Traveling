/**
 * Tambula — Mock Places
 *
 * Popular locations in Kampala and surrounding areas with verified coordinates and clean vector icon styling.
 */

const mockPlaces = {
  popular: [
    {
      id: 'p1',
      name: 'Entebbe International Airport',
      address: 'Entebbe, Wakiso District',
      latitude: 0.0424,
      longitude: 32.4435,
      icon: 'airplane',
      iconColor: '#0284C7',
      iconBg: '#E0F2FE',
      tag: 'Airport • 42 km',
    },
    {
      id: 'p2',
      name: 'Kampala City Centre',
      address: 'Central Division, Kampala',
      latitude: 0.3136,
      longitude: 32.5811,
      icon: 'business',
      iconColor: '#D97706',
      iconBg: '#FEF3C7',
      tag: 'CBD • 4.2 km',
    },
    {
      id: 'p3',
      name: 'Acacia Mall',
      address: 'Plot 14-18 Cooper Rd, Kisementi, Kampala',
      latitude: 0.3305,
      longitude: 32.5810,
      icon: 'cart',
      iconColor: '#059669',
      iconBg: '#D1FAE5',
      tag: 'Shopping & Dining • 2.8 km',
    },
    {
      id: 'p4',
      name: 'Makerere University',
      address: 'University Rd, Kampala',
      latitude: 0.3340,
      longitude: 32.5672,
      icon: 'school',
      iconColor: '#7C3AED',
      iconBg: '#EDE9FE',
      tag: 'Campus • 3.5 km',
    },
    {
      id: 'p5',
      name: 'Ntinda Complex',
      address: 'Ntinda, Nakawa Division',
      latitude: 0.3540,
      longitude: 32.6170,
      icon: 'navigate',
      iconColor: '#2563EB',
      iconBg: '#DBEAFE',
      tag: 'Hub • 5.1 km',
    },
    {
      id: 'p6',
      name: 'Bugolobi Village Mall',
      address: 'Bugolobi, Nakawa Division',
      latitude: 0.3180,
      longitude: 32.6100,
      icon: 'bag-handle',
      iconColor: '#DC2626',
      iconBg: '#FEE2E2',
      tag: 'Mall • 6.0 km',
    },
    {
      id: 'p7',
      name: 'Muyenga Tank Hill',
      address: 'Muyenga, Makindye Division',
      latitude: 0.3000,
      longitude: 32.5970,
      icon: 'location',
      iconColor: '#475569',
      iconBg: '#F1F5F9',
      tag: 'Hill View • 7.3 km',
    },
    {
      id: 'p8',
      name: 'Kololo Airstrip & Gardens',
      address: 'Kololo, Central Division',
      latitude: 0.3330,
      longitude: 32.5930,
      icon: 'leaf',
      iconColor: '#16A34A',
      iconBg: '#DCFCE7',
      tag: 'Park • 2.1 km',
    },
  ],

  savedPlaces: [
    {
      id: 'home',
      name: 'Home',
      address: 'Ntinda, Kampala',
      latitude: 0.3540,
      longitude: 32.6170,
      type: 'home',
    },
    {
      id: 'work',
      name: 'Work',
      address: 'Kololo, Kampala',
      latitude: 0.3330,
      longitude: 32.5930,
      type: 'work',
    },
  ],

  recentSearches: [
    {
      id: 'r1',
      name: 'Garden City Mall',
      address: '64-86 Yusuf Lule Rd, Kampala',
      latitude: 0.3240,
      longitude: 32.5880,
    },
    {
      id: 'r2',
      name: 'Mulago Hospital',
      address: 'Upper Mulago Hill Rd, Kampala',
      latitude: 0.3430,
      longitude: 32.5760,
    },
    {
      id: 'r3',
      name: 'Nakasero Market',
      address: 'Market St, Kampala',
      latitude: 0.3160,
      longitude: 32.5790,
    },
  ],

  defaultRegion: {
    latitude: 0.3476,
    longitude: 32.5825,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  },
};

export default mockPlaces;
