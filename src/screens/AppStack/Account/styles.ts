import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../constant';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(5),
    gap: wp(4),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  avatar: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: RFValue(20),
    color: '#fff',
    fontFamily: Fonts.Bold,
  },
  userName: {
    fontSize: RFValue(18),
    fontFamily: Fonts.Bold,
  },
  userEmail: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Medium,
    marginTop: hp(0.2),
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: wp(2.5),
    justifyContent: 'space-between',
  },
  shortcutBtn: {
    width: wp(46),
    paddingVertical: hp(2.5),
    alignItems: 'center',
    borderRadius: wp(2),
    marginBottom: hp(1.5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  shortcutTitle: {
    fontSize: RFValue(12),
    fontFamily: Fonts.Medium,
    marginTop: hp(1),
  },
  sectionContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginTop: hp(1),
  },
  sectionHeading: {
    fontSize: RFValue(13),
    fontFamily: Fonts.Bold,
    marginBottom: hp(1),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(2),
    borderBottomWidth: 0.5,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  listItemText: {
    fontSize: RFValue(14),
    fontFamily: Fonts.Medium,
  },
  logoutBtn: {
    marginTop: hp(2),
    paddingVertical: hp(1.5),
    width: wp(90),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: hp(5),
    borderWidth: hp(0.2),
    borderColor: Colors.PRIMARY[600],
    borderRadius: wp(3),
    elevation: 2,
  },
  logoutText: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    padding: wp(5),
    paddingBottom: hp(5),
  },
  modalTitle: {
    fontSize: RFValue(16),
    fontFamily: Fonts.Bold,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: hp(1.5),
  },
  langText: {
    fontSize: RFValue(15),
    fontFamily: Fonts.Medium,
  },
});

export default styles;
