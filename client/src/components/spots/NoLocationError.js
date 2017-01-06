import React from 'react';
import { View, Text, Image} from 'react-native';

const NoLocationError = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView} />
    </View>
  );
};
const styles = {
   headerView: {
    backgroundColor: '#006F60',
    alignItems: 'center',
    height: 65
  },
};
export default NoLocationError;
