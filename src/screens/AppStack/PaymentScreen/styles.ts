import { StyleSheet } from "react-native";



const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F1F3F6',
    },
    amountBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    amountLabel: {
        fontSize: 14,
        color: '#666',
    },
    amountValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        padding: 16,
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    option: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    selectedOption: {
        backgroundColor: '#F5F9FF',
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioActive: {
        borderColor: '#2874F0',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2874F0',
    },
    optionContent: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    optionSub: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    optionIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    bottomBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        elevation: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    priceInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    priceValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceSub: {
        fontSize: 12,
        color: '#2874F0',
    },
    payBtn: {
        backgroundColor: '#FB641B',
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 2,
        justifyContent: 'center',
    },
    payText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
} );

export default styles;