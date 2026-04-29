import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },
  bannerWrapper: {
    height: hp( 24 ),
    marginVertical: hp( 1 ),
    overflow: 'hidden',
  },
  bannerImg: {
    height: hp( 22 ),
    resizeMode: 'cover',
    borderRadius: hp( 2 ),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp( 1.5 ),
    marginTop: hp( 0.5 ),
  },
  dot: {
    width: wp( 2 ),
    height: wp( 2 ),
    borderRadius: wp( 1 ),
  },
  catSection: {
    paddingVertical: hp( 2 ),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: RFValue( 16 ),
    fontFamily: Fonts.Bold,
    paddingLeft: wp( 5 ),
    marginBottom: hp( 1.5 ),
  },
  catScroll: {
    paddingHorizontal: wp( 5 ),
    gap: wp( 6 ),
  },
  catItem: {
    alignItems: 'center',
  },
  iconRing: {
    width: wp( 15 ),
    height: wp( 15 ),
    borderRadius: wp( 7.5 ),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  catIcon: {
    width: wp( 10 ),
    height: wp( 10 ),
    resizeMode: 'contain',
  },
  catLabel: {
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Medium,
    marginTop: hp( 0.8 ),
  },
  rowWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp( 5 ),
    marginTop: hp( 1.5 ),
  },
  productCard: {
    width: wp( 43 ),
    borderRadius: wp( 3 ),
    padding: wp( 2 ),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productThumb: {
    width: '100%',
    height: hp( 10 ),
    resizeMode: 'contain',
  },
  productMeta: {
    marginTop: hp( 1 ),
  },
  productTitle: {
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Medium,
  },
  productPrice: {
    fontSize: RFValue( 14 ),
    fontFamily: Fonts.Bold,
    marginTop: hp( 0.5 ),
  },
} );

export default styles;
