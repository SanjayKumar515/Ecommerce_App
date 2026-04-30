import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '../../../constant';

const styles = StyleSheet.create( {
    mainContainer: {
        flex: 1,
    },
    header: {
        paddingVertical: hp( 1.5 ),
        paddingHorizontal: wp( 5 ),
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    headerTitle: {
        fontSize: RFValue( 18 ),
        fontFamily: Fonts.Bold,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        width: wp( 25 ),
        borderRightWidth: 1,
        borderColor: '#eee',
    },
    categoryBtn: {
        paddingVertical: hp( 1.5 ),
        paddingHorizontal: wp( 2 ),
        borderLeftWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        gap: hp( 0.8 ),
    },
    categoryImgWrapper: {
        width: wp( 16 ),
        height: wp( 16 ),
        borderRadius: wp( 8 ),
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryImg: {
        width: wp( 15 ),
        height: wp( 15 ),
        resizeMode: 'contain',
    },
    categoryText: {
        fontSize: RFValue( 10 ),
        textAlign: 'center',
    },
    rightPane: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: wp( 34 ),
        padding: wp( 2 ),
        marginBottom: hp( 1.5 ),
        borderRadius: wp( 2 ),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 2,
    },
    productImg: {
        width: wp( 25 ),
        height: wp( 25 ),
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: RFValue( 11 ),
        fontFamily: Fonts.Medium,
        marginTop: hp( 1 ),
        textAlign: 'center',
    },
    productPrice: {
        fontSize: RFValue( 12 ),
        fontFamily: Fonts.Bold,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: hp( 0.8 ),
    },
    wishlistIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 2,
    },
} );

export default styles;