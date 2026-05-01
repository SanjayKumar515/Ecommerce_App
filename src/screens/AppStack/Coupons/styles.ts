import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Fonts } from "../../../constant";


const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F7F7F8',
    },
    listContent: {
        padding: wp( 3 ),
        paddingBottom: hp( 5 ),
    },
    couponCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: wp( 3 ),
        marginBottom: hp( 2 ),
        height: hp( 15 ),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    leftSection: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp( 2 ),
        position: 'relative',
    },
    discountText: {
        color: '#fff',
        fontSize: RFValue( 18 ),
        textAlign: 'center',
        fontFamily: Fonts.Bold,
    },
    cutoutTop: {
        position: 'absolute',
        top: -wp( 2.5 ),
        right: -wp( 2.5 ),
        width: wp( 5 ),
        height: wp( 5 ),
        borderRadius: wp( 2.5 ),
        backgroundColor: '#F7F7F8',
    },
    cutoutBottom: {
        position: 'absolute',
        bottom: -wp( 2.5 ),
        right: -wp( 2.5 ),
        width: wp( 5 ),
        height: wp( 5 ),
        borderRadius: wp( 2.5 ),
        backgroundColor: '#F7F7F8',
    },
    rightSection: {
        flex: 1,
        flexDirection: 'row',
        padding: wp( 3 ),
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    couponTitle: {
        fontSize: RFValue( 14 ),
        fontFamily: Fonts.SemiBold,
        color: '#333',
        marginBottom: hp( 0.5 ),
    },
    couponDesc: {
        fontSize: RFValue( 11 ),
        fontFamily: Fonts.Regular,
        color: '#666',
        marginBottom: hp( 1 ),
    },
    expiryText: {
        fontSize: RFValue( 9 ),
        fontFamily: Fonts.Medium,
        color: '#999',
    },
    codeContainer: {
        width: wp( 20 ),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    dashLine: {
        position: 'absolute',
        left: -wp( 1 ),
        height: '80%',
        borderLeftWidth: 1,
        borderColor: '#eee',
        borderStyle: 'dashed',
    },
    copyBtn: {
        paddingVertical: hp( 0.5 ),
        paddingHorizontal: wp( 2 ),
        borderWidth: 1,
        borderRadius: wp( 1 ),
        backgroundColor: '#fff',
    },
    copyBtnText: {
        fontSize: RFValue( 8 ),
        fontFamily: Fonts.Bold,
    },
    emptyContainer: {
        flex: 1,
        marginTop: hp( 20 ),
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        marginTop: hp( 2 ),
        fontSize: RFValue( 14 ),
        color: '#999',
        fontFamily: Fonts.Medium,
    },
} );

export default styles;