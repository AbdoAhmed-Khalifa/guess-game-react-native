import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/colors';

function CustomText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans',
    color: Colors.secondary500,
    fontSize: 24,
  },
});
