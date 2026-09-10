/**
 * SupportChatScreen — Human Customer Support Conversation
 *
 * Real support agent ticket interface (Brenda N. from Kampala Operations),
 * message history, and chat input.
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/Ionicons';
import colors from '../../theme/colors';
import typography from '../../theme/typography';
import spacing from '../../theme/spacing';
import radius from '../../theme/radius';
import shadows from '../../theme/shadows';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    sender: 'agent',
    text: 'Hello Patrick! Brenda from Tambula Kampala Support here. How can I help you today?',
    time: '10:40 AM',
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Hi Brenda, I had a question about my recent trip to Acacia Mall. I was charged twice on MTN MoMo.',
    time: '10:42 AM',
  },
  {
    id: 'm3',
    sender: 'agent',
    text: 'Thanks for bringing this to our attention. I checked your account for TRIP-9842. The duplicate pending hold of UGX 12,000 has been released and refunded to your Tambula Wallet balance.',
    time: '10:44 AM',
  },
  {
    id: 'm4',
    sender: 'agent',
    text: 'Please check your Wallet tab to confirm the UGX 12,000 credit. Is there anything else I can assist you with?',
    time: '10:45 AM',
  },
];

const SupportChatScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: 'Just now',
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Support Agent Header */}
      <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={22} color={colors.dark} />
        </TouchableOpacity>

        <View style={styles.agentInfo}>
          <View style={styles.agentAvatar}>
            <Text style={styles.agentAvatarText}>B</Text>
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.agentName}>Brenda N. (Tambula Support)</Text>
            <Text style={styles.agentStatus}>Kampala Operations • Active now</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ticketBadge}>
          <Text style={styles.ticketText}>Ticket #TB-94120 • Assigned to Brenda N.</Text>
        </View>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <View
              key={msg.id}
              style={[
                styles.bubbleWrapper,
                isUser ? styles.bubbleUserWrapper : styles.bubbleAgentWrapper,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isUser ? styles.bubbleUser : styles.bubbleAgent,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    isUser ? styles.messageUserText : styles.messageAgentText,
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.timeText,
                    isUser ? styles.timeUserText : styles.timeAgentText,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Input bar */}
      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom + 8, 12) }]}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor={colors.textTertiary}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Icon name="send" size={18} color={inputText.trim() ? colors.dark : colors.textTertiary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenHorizontal,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  agentAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.dark,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  agentName: {
    ...typography.bodySecondary,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  agentStatus: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  messagesContent: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: 16,
  },
  ticketBadge: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  ticketText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  bubbleWrapper: {
    marginBottom: 12,
  },
  bubbleAgentWrapper: {
    alignItems: 'flex-start',
  },
  bubbleUserWrapper: {
    alignItems: 'flex-end',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.md,
  },
  bubbleAgent: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 2,
  },
  bubbleUser: {
    backgroundColor: colors.dark,
    borderTopRightRadius: 2,
  },
  messageText: {
    ...typography.bodySecondary,
    lineHeight: 20,
  },
  messageAgentText: {
    color: colors.textPrimary,
  },
  messageUserText: {
    color: colors.white,
  },
  timeText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timeAgentText: {
    color: colors.textTertiary,
  },
  timeUserText: {
    color: colors.textOnDarkSecondary,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: radius.full,
    paddingHorizontal: 16,
    height: 42,
    fontSize: 14,
    color: colors.textPrimary,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.backgroundSecondary,
  },
});

export default SupportChatScreen;
