import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  flatlistStyle: {
    flex: 1,
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    marginTop: 10,
  },
  cardBox: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    width: '55%',
  },
  twoBtn: {
    gap: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnBox: {
    width: 40,
    height: 40,
    backgroundColor: 'grey', // Changed to grey to be visible in both themes, or we can leave lightgrey
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  btn: {
    fontSize: 25,
  },
  amount: {
    fontSize: 16,
  },
  bottom: {
    flex: 0.2,
    gap: 10,
    paddingHorizontal: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmountPrice: {
    fontSize: 22,
  },
});

export default styles;
