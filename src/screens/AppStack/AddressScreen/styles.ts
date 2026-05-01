import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
  },
  content: {
    padding: 12,
  },
  addBtn: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  addressActions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  coordsDisplay: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#388E3C',
  },
  coordsTitle: {
    fontSize: 12,
    color: '#388E3C',
    fontWeight: 'bold',
  },
  coordsValue: {
    fontSize: 14,
    color: '#000',
    marginTop: 2,
  },
  addBtnText: {
    color: '#2874F0',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    marginBottom: 12,
    elevation: 1,
  },
  selectedCard: {
    backgroundColor: '#F5F9FF',
    borderColor: '#2874F0',
    borderWidth: 1,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    marginTop: 2,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  typeTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 8,
  },
  typeText: {
    fontSize: 10,
    color: '#666',
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#333',
  },
  addressText: {
    marginLeft: 32,
    marginTop: 8,
    color: '#444',
    lineHeight: 20,
  },
  deliverBtn: {
    backgroundColor: '#FB641B',
    paddingVertical: 12,
    borderRadius: 2,
    marginTop: 16,
    alignItems: 'center',
    marginLeft: 32,
  },
  deliverText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;