import React from 'react';
import { View, Text } from 'react-native';

const { width } = Dimensions.get('window');

const Spinner = () => {
  return (
    <View style={styles.itemStyle}>
      <Text style={styles.titleStyle}>A great title</Text>
      <Text style={styles.distanceStyle}>1000 feet away</Text>
      <Text style={styles.categoryStyle}>Street art</Text>
    </View>
  );
};
const styles = {
  itemStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  titleStyle: {
    fontSize: 18
  }
};
export default Spinner;