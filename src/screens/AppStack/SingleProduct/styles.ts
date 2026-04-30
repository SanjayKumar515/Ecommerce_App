import { StyleSheet } from 'react-native';
import { Fonts } from '../../../constant';
import { RFValue } from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  img: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 20,
  },
  title: {
    fontSize: RFValue(13),
    fontFamily: Fonts.SemiBold,
  },
  price: {
    fontSize: RFValue(13),
    fontFamily: Fonts.italic,
  },
  cardBox: {
    marginBottom: 30,
  },
  textBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  body: {
    marginTop: 30,
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
  value: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
  footer: {
    marginTop: 50,
    gap: 10,
  },
  twoBtn: {
    columnGap: 20,
    flexDirection: 'row',
    marginVertical: 22,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnBox: {
    width: 40,
    height: 40,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  btn: {
    fontSize: 30,
    fontFamily: Fonts.Bold,
  },
});

export default styles;
