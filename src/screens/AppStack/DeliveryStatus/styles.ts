import { StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F1F3F6',
    },
    content: {
        padding: 12,
    },
    orderIdCard: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        marginBottom: 12,
    },
    orderIdLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    viewDetails: {
        color: '#2874F0',
        fontSize: 14,
        fontWeight: '600',
    },
    statusCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 4,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    stepsContainer: {
        paddingLeft: 10,
    },
    stepRow: {
        flexDirection: 'row',
    },
    leftColumn: {
        alignItems: 'center',
        width: 30,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleCompleted: {
        backgroundColor: '#388E3C',
        borderColor: '#388E3C',
    },
    circleActive: {
        borderColor: '#2874F0',
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#2874F0',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#ddd',
        marginTop: -2,
        marginBottom: -2,
    },
    lineCompleted: {
        backgroundColor: '#388E3C',
    },
    rightColumn: {
        flex: 1,
        paddingLeft: 15,
        paddingBottom: 30,
    },
    stepTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    textPending: {
        color: '#888',
    },
    stepDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    helpCard: {
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 4,
    },
    helpText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        color: '#333',
    },
} );

export default styles;