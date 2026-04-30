import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { MyBackButton } from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images } from '../../../constant';
import Clipboard from '@react-native-clipboard/clipboard';
import * as RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { Alert, PermissionsAndroid } from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const HelpCenterScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your shopping today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 🔥 GET YOUR FREE KEY HERE: https://aistudio.google.com/app/apikey
  const GEMINI_API_KEY = 'AIzaSyCPUMFy56kPDzrOx-DinhEi6E2M-tmLBR8';

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful customer support assistant for an E-commerce app. Help the user with their request: ${currentInput}`,
                  },
                ],
              },
            ],
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from Gemini');
      }

      // Extract text from Gemini response structure
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (botReply) {
        const botMessage: Message = {
          id: Date.now().toString(),
          text: botReply,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err: any) {
      console.log('Error calling Gemini API:', err);
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: `Error: ${
          err.message ||
          'Something went wrong. Please check your Gemini API key.'
        }`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Success', 'Message copied to clipboard!');
  };

  const exportToPDF = async (singleMessage?: Message) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to save the PDF.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot save PDF without storage access.',
          );
          return;
        }
      }

      const messagesToExport = singleMessage ? [singleMessage] : messages;

      let htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: 'Helvetica'; padding: 20px; }
              h1 { color: #2874F0; text-align: center; }
              .chat-container { border: 1px solid #eee; padding: 10px; }
              .message { margin-bottom: 15px; padding: 10px; border-radius: 5px; }
              .user { background-color: #e3f2fd; text-align: right; margin-left: 20%; }
              .bot { background-color: #f5f5f5; text-align: left; margin-right: 20%; }
              .sender { font-weight: bold; font-size: 12px; margin-bottom: 5px; display: block; }
              .timestamp { font-size: 10px; color: #888; }
            </style>
          </head>
          <body>
            <h1>${
              singleMessage ? 'Single Message Export' : 'Chat Support History'
            }</h1>
            <div class="chat-container">
              ${messagesToExport
                .map(
                  msg => `
                <div class="message ${msg.sender}">
                  <span class="sender">${
                    msg.sender === 'user' ? 'You' : 'AI Assistant'
                  }</span>
                  <div>${msg.text}</div>
                  <span class="timestamp">${msg.timestamp.toLocaleString()}</span>
                </div>
              `,
                )
                .join('')}
            </div>
          </body>
        </html>
      `;

      let options = {
        html: htmlContent,
        fileName: `${singleMessage ? 'Message' : 'Chat'}_History_${Date.now()}`,
        directory: 'Documents',
      };

      const file = await (RNHTMLtoPDF as any).convert(options);

      if (file.filePath) {
        await Share.open({
          url: `file://${file.filePath}`,
          type: 'application/pdf',
          title: singleMessage ? 'Export Message' : 'Export Chat History',
        });
      }
    } catch (error) {
      console.log('PDF Export Error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      {item.sender === 'bot' && (
        <Image source={Images.ic_chatBoat} style={styles.botAvatarImg} />
      )}
      <View style={styles.bubbleWrapper}>
        <View
          style={[
            styles.messageBubble,
            item.sender === 'user' ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              item.sender === 'user' ? styles.userText : styles.botText,
            ]}
          >
            {item.text}
          </Text>
        </View>

        {/* Individual Message Actions */}
        <View
          style={[
            styles.messageActions,
            item.sender === 'user'
              ? { alignSelf: 'flex-end' }
              : { alignSelf: 'flex-start' },
          ]}
        >
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => copyToClipboard(item.text)}
          >
            <Icon name="copy-outline" size={RFValue(12)} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionIcon}
            onPress={() => exportToPDF(item)}
          >
            <Icon name="document-outline" size={RFValue(12)} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MyBackButton title="Help Center" />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={() => copyToClipboard(item.text)}
          >
            {renderMessage({ item })}
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        ListFooterComponent={() =>
          isLoading ? (
            <View style={styles.botMessageContainer}>
              <Image source={Images.ic_chatBoat} style={styles.botAvatarImg} />
              <View style={[styles.messageBubble, styles.botBubble]}>
                <Text style={styles.botText}>AI is typing...</Text>
              </View>
            </View>
          ) : null
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="add" size={RFValue(20)} color="#666" />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Ask anything..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && { backgroundColor: '#E0E0E0' },
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <Icon name="arrow-up" size={RFValue(18)} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingRight: wp(4),
  },
  pdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#2874F0',
  },
  pdfBtnText: {
    fontSize: RFValue(12),
    color: '#2874F0',
    fontWeight: 'bold',
    marginLeft: wp(1),
  },
  chatContent: {
    padding: wp(4),
    paddingBottom: hp(2),
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  botMessageContainer: {
    flexDirection: 'row',
    marginBottom: hp(2),
  },
  botAvatarImg: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(4.5),
    marginRight: wp(2),
    backgroundColor: '#fff',
    resizeMode: 'contain',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  bubbleWrapper: {
    maxWidth: '80%',
  },
  messageActions: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(0.5),
    paddingHorizontal: wp(2),
  },
  actionIcon: {
    opacity: 0.7,
  },
  messageBubble: {
    padding: wp(3),
    borderRadius: wp(4),
    elevation: 1,
    width: '100%',
  },
  userBubble: {
    backgroundColor: '#2874F0',
    borderBottomRightRadius: wp(1),
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: wp(1),
  },
  messageText: {
    fontSize: RFValue(14),
    lineHeight: RFValue(18),
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  attachBtn: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(0.2),
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F4F4F4',
    borderRadius: wp(6),
    marginLeft: wp(2),
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    maxHeight: hp(15),
    fontSize: RFValue(14),
    color: '#333',
  },
  sendBtn: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#2874F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(0.4),
    marginRight: wp(1),
  },
});
