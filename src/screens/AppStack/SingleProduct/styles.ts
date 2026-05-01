import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../constant';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create( {
  container: {
    flex: 1,

  },
  imageBox: {
    backgroundColor: '#f1f3f6',
  },
  wishListBtn: {
    position: 'absolute',
    right: wp( 5 ),
    top: 20,
    zIndex: 1
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  starRatingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  title: {
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.SemiBold,
  },
  price: {
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.italic,
  },
  cardBox: {
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: Colors.PRIMARY[ 300 ],
    width: wp( 100 ),
  },
  productRatingContainer: {
    backgroundColor: '#388E3C',
    width: wp( 15 ),
    height: hp( 3 ),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: hp( 0.2 ),
    borderRadius: 4,
    marginLeft: wp( 4 ),
    marginBottom: hp( 1 ),
  },
  textBox: {
    width: wp( 90 ),
    alignSelf: 'center',
  },
  body: {
    width: wp( 90 ),
    alignSelf: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
  value: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
  footer: {
    marginTop: 50,
    gap: 10,
  },
  twoBtn: {
    columnGap: 20,
    flexDirection: 'row',
    marginVertical: 22,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnBox: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  btn: {
    fontSize: 30,
    fontFamily: Fonts.Bold,
  },
} );

export default styles;
