import { StyleSheet } from "react-native";



const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F1F3F6',
    },
    list: {
        padding: 12,
    },
    addBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        margin: 12,
        borderRadius: 4,
        elevation: 2,
    },
    addText: {
        marginLeft: 12,
        color: '#2874F0',
        fontWeight: 'bold',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 4,
        marginBottom: 12,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    typeContainer: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 2,
    },
    typeText: {
        fontSize: 10,
        color: '#666',
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 4,
    },
    phoneText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        marginTop: 12,
        paddingTop: 12,
    },
    editBtn: {
        paddingVertical: 4,
    },
    editText: {
        color: '#2874F0',
        fontWeight: 'bold',
    },
    empty: {
        alignItems: 'center',
        marginTop: 50,
    },
} );

export default styles;