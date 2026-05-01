import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

export default styles;