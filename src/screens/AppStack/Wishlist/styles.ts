import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: wp(3),
    marginBottom: hp(1),
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    width: wp(25),
    height: wp(25),
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: wp(3),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(14),
    color: '#212121',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
    marginTop: hp(0.5),
  },
  price: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: '#212121',
  },
  ratingBox: {
    backgroundColor: '#388E3C',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.2),
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: RFValue(10),
    fontWeight: 'bold',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2874F0',
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 4,
    gap: wp(1),
  },
  cartBtnText: {
    color: '#2874F0',
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
  removeBtn: {
    padding: wp(2),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  emptyTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  emptySub: {
    fontSize: RFValue(13),
    color: '#666',
    textAlign: 'center',
    marginTop: hp(1),
  },
});

export default styles;
