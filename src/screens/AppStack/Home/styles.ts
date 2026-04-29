import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Fonts } from '../../../constant';

// Flipkart brand blue
const FK_BLUE = '#2874f0';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
  },

  // ── Banner ──────────────────────────────────────────────────────────────────
  bannerWrapper: {
    height: hp( 24 ),
    marginVertical: hp( 1 ),
    overflow: 'hidden',
  },
  bannerImg: {
    height: hp( 22 ),
    resizeMode: 'cover',
    borderRadius: hp( 1.5 ),
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

  // ── Top Tab Navigation ───────────────────────────────────────────────────────
  topTabBar: {
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  topTabScroll: {
    paddingHorizontal: wp( 2 ),
  },
  topTabItem: {
    alignItems: 'center',
    paddingHorizontal: wp( 3.5 ),
    paddingTop: hp( 1.2 ),
    paddingBottom: 0,
    minWidth: wp( 16 ),
  },
  topTabInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp( 1.5 ),
    marginBottom: hp( 0.8 ),
  },
  topTabIcon: {
    width: wp( 5 ),
    height: wp( 5 ),
    resizeMode: 'contain',
  },
  topTabLabel: {
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Medium,
    marginBottom: hp( 0.8 ),
  },
  topTabIndicator: {
    height: 2.5,
    width: '100%',
    borderRadius: 2,
    marginTop: 0,
  },


  catSection: {
    paddingVertical: hp( 1.5 ),
    borderBottomWidth: 6,
    borderColor: '#f0f0f0',
  },
  catRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp( 2 ),
    paddingVertical: hp( 0.8 ),
  },
  catDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: wp( 3 ),
  },
  catItem: {
    alignItems: 'center',
    width: wp( 20 ),
  },
  catIconBox: {
    width: wp( 15 ),
    height: wp( 15 ),
    borderRadius: wp( 2 ),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp( 0.6 ),
    // Subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  catIcon: {
    width: wp( 9 ),
    height: wp( 9 ),
    resizeMode: 'contain',
  },
  catLabel: {
    fontSize: RFValue( 11 ),
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },

  // Legacy — kept so nothing else breaks
  sectionTitle: {
    fontSize: RFValue( 15 ),
    fontFamily: Fonts.Bold,
  },
  catScroll: {
    paddingHorizontal: wp( 5 ),
    gap: wp( 6 ),
  },
  iconRing: {
    width: wp( 15 ),
    height: wp( 15 ),
    borderRadius: wp( 7.5 ),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  // ── Trending Section Header ─────────────────────────────────────────────────
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp( 4 ),
    paddingTop: hp( 1.5 ),
    paddingBottom: hp( 0.5 ),
  },
  viewAll: {
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Medium,
    color: FK_BLUE,
  },

  // ── Product Grid ─────────────────────────────────────────────────────────────
  rowWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp( 3 ),
    marginTop: hp( 1.2 ),
  },
  productCard: {
    width: wp( 44 ),
    borderRadius: wp( 2 ),
    padding: wp( 2 ),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  productThumb: {
    width: '100%',
    height: hp( 12 ),
    resizeMode: 'contain',
  },
  productMeta: {
    marginTop: hp( 0.8 ),
  },
  productTitle: {
    fontSize: RFValue( 12 ),
    fontFamily: Fonts.Medium,
  },
  productPrice: {
    fontSize: RFValue( 13 ),
    fontFamily: Fonts.Bold,
    marginTop: hp( 0.4 ),
    color: FK_BLUE,
  },
} );

export default styles;
