import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create( {
  container: {
    width: wp( 90 ),
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
} );

export default styles;
