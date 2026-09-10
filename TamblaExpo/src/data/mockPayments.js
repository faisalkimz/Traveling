/**
 * Tambla — Mock Payments
 *
 * Payment methods and transaction history.
 */

const mockPayments = {
  walletBalance: 45000,

  methods: [
    {
      id: 'pm1',
      type: 'mobile_money',
      provider: 'mtn',
      label: 'MTN Mobile Money',
      detail: 'MTN / Airtel',
      phone: '+256 770 ***456',
      isDefault: true,
      icon: 'phone',
    },
    {
      id: 'pm2',
      type: 'mobile_money',
      provider: 'airtel',
      label: 'Airtel Money',
      detail: '+256 752 ***654',
      phone: '+256 752 ***654',
      isDefault: false,
      icon: 'phone',
    },
    {
      id: 'pm3',
      type: 'cash',
      provider: 'cash',
      label: 'Cash',
      detail: 'Pay with cash',
      isDefault: false,
      icon: 'cash',
    },
    {
      id: 'pm4',
      type: 'wallet',
      provider: 'tambla',
      label: 'Tambla Wallet',
      detail: 'UGX 45,000',
      isDefault: false,
      icon: 'wallet',
    },
    {
      id: 'pm5',
      type: 'card',
      provider: 'visa',
      label: 'Visa',
      detail: '•••• 4521',
      isDefault: false,
      icon: 'card',
    },
  ],

  transactions: [
    {
      id: 'tx1',
      type: 'ride',
      description: 'Ntinda → Kampala City Centre',
      amount: -12000,
      date: '2025-04-15',
      time: '10:52 AM',
      status: 'completed',
      paymentMethod: 'MTN Mobile Money',
    },
    {
      id: 'tx2',
      type: 'topup',
      description: 'Wallet Top Up',
      amount: 50000,
      date: '2025-04-14',
      time: '9:30 AM',
      status: 'completed',
      paymentMethod: 'MTN Mobile Money',
    },
    {
      id: 'tx3',
      type: 'ride',
      description: 'Acacia Mall → Entebbe Airport',
      amount: -45000,
      date: '2025-04-14',
      time: '2:15 PM',
      status: 'completed',
      paymentMethod: 'Cash',
    },
    {
      id: 'tx4',
      type: 'refund',
      description: 'Trip Refund — Cancelled ride',
      amount: 7000,
      date: '2025-04-12',
      time: '9:15 AM',
      status: 'completed',
      paymentMethod: 'Tambla Wallet',
    },
    {
      id: 'tx5',
      type: 'ride',
      description: 'Makerere → Garden City',
      amount: -10000,
      date: '2025-04-11',
      time: '11:36 AM',
      status: 'completed',
      paymentMethod: 'MTN Mobile Money',
    },
  ],

  // Driver earnings data
  driverEarnings: {
    today: {
      amount: 85000,
      trips: 5,
      hours: 4.5,
    },
    thisWeek: {
      amount: 320000,
      trips: 12,
      hours: 28,
    },
    thisMonth: {
      amount: 1250000,
      trips: 48,
      hours: 112,
    },
    subscription: {
      plan: 'Weekly',
      amount: 15000,
      status: 'active',
      nextPayment: 'Mon, 15 Apr 2025',
    },
  },

  // Top-up presets
  topUpAmounts: [5000, 10000, 20000, 50000],

  // Withdrawal methods
  withdrawalMethods: [
    { id: 'w1', type: 'mtn', label: 'MTN Mobile Money', detail: '+256 770 ***456' },
    { id: 'w2', type: 'airtel', label: 'Airtel Money', detail: '+256 752 ***654' },
    { id: 'w3', type: 'bank', label: 'Bank Account', detail: 'Stanbic Bank — ***8901' },
  ],
};

export default mockPayments;
