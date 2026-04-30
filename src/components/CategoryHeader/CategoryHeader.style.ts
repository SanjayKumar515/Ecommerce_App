import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../constant';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    elevation: 4,
  },

  topTabScroll: {
    paddingHorizontal: 10,
  },

  topTabItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },

  catIcon: {
    width: wp(15),
    height: hp(4),
    marginBottom: hp(0.5),
    resizeMode: 'contain',
  },

  catLabel: {
    fontSize: RFValue(10),
    textAlign: 'center',
    color: '#000',
    fontFamily: Fonts.SemiBold,
  },

  // 🔥 underline indicator
  activeIndicator: {
    marginTop: 6,
    height: 3,
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#2874F0',
  },
});
export default styles;
