import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../constant';

const styles = StyleSheet.create( {
  container: {
    paddingHorizontal: wp( 5 ),
    paddingTop: hp( 2 ),
    paddingBottom: hp( 1.5 ),
    borderBottomLeftRadius: hp( 2 ),
    borderBottomRightRadius: hp( 2 ),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp( 1.5 ),
  },
  locationContainer: {
    flex: 1,
    paddingRight: wp( 2 ),
  },
  deliveryTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTimeText: {
    fontFamily: Fonts.Bold,
    fontSize: RFValue( 17 ),
    marginRight: wp( 1 ),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp( 0.5 ),
  },
  addressText: {
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 12 ),
  },
  profileIconContainer: {
    width: wp( 10 ),
    height: wp( 10 ),
    borderRadius: wp( 5 ),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp( 1.5 ),
    paddingHorizontal: wp( 3 ),
    height: hp( 5.5 ),
    borderWidth: hp( 0.2 ),
    borderColor: '#ccc',
  },
  searchIcon: {
    marginRight: wp( 2 ),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: RFValue( 12 ),

  },
} );

export default styles;
