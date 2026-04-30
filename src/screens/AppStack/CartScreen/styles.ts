import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f6',
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
  },

  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  activeTab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: '#2874F0',
  },

  activeTabText: {
    color: '#2874F0',
    fontWeight: 'bold',
  },

  inactiveTab: {
    paddingVertical: 10,
  },

  inactiveTabText: {
    color: '#555',
  },

  emptyContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },

  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  emptySub: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },

  section: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  card: {
    width: 140,
    marginRight: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },

  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 12,
    marginTop: 5,
  },

  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },

  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  discount: {
    color: 'green',
    fontSize: 12,
  },

  addBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2874F0',
    padding: 5,
    alignItems: 'center',
    borderRadius: 4,
  },

  addBtnText: {
    color: '#2874F0',
    fontSize: 12,
  },

  // 🔥 Actual Cart Item Styles
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemTitle: {
    fontSize: 14,
    color: '#212121',
  },
  itemSub: {
    fontSize: 12,
    color: '#878787',
    marginTop: 4,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    marginHorizontal: 15,
    fontSize: 14,
    fontWeight: 'bold',
  },

  // 🔥 Price Details Styles
  priceSummary: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 15,
    paddingBottom: 80,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#878787',
    fontWeight: 'bold',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#212121',
  },
  summaryValue: {
    fontSize: 14,
    color: '#212121',
  },
  freeText: {
    color: '#388E3C',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
  },

  // 🔥 Bottom Sticky Bar
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 10,
  },
  priceContainer: {
    flex: 1,
  },
  placeOrderBtn: {
    backgroundColor: '#fb641b',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 2,
  },
  placeOrderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default styles;
