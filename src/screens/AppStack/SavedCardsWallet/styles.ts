import { StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F1F3F6',
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        paddingHorizontal: 16,
        paddingBottom: 8,
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    walletRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    walletInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIcon: {
        width: 40,
        height: 40,
        marginRight: 16,
        resizeMode: 'contain',
    },
    walletName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    walletBalance: {
        fontSize: 14,
        color: '#388E3C',
        fontWeight: 'bold',
        marginTop: 2,
    },
    topUpBtn: {
        borderWidth: 1,
        borderColor: '#2874F0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    topUpText: {
        color: '#2874F0',
        fontWeight: 'bold',
        fontSize: 12,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetails: {
        flex: 1,
        marginLeft: 16,
    },
    cardNumber: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    cardExpiry: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    brandIcon: {
        width: 50,
        height: 20,
        resizeMode: 'contain',
    },
    addCardBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginTop: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    addCardText: {
        marginLeft: 8,
        color: '#2874F0',
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemText: {
        flex: 1,
        marginLeft: 16,
        fontSize: 15,
        color: '#333',
    },
} );

export default styles;