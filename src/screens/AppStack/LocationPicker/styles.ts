import { StyleSheet } from "react-native";


const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    },
    coordBox: {
        marginBottom: 15,
    },
    coordLabel: {
        fontSize: 14,
        color: '#666',
    },
    confirmBtn: {
        backgroundColor: '#2874F0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
} );

export default styles;