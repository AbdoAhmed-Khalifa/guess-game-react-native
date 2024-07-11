import { StyleSheet, Text, Platform } from 'react-native';

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    minWidth: 300,
  },
});
