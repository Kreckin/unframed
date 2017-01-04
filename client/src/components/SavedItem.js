import React from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SavedItem = () => {
  return (
    <View style={styles.itemStyle}>
      <View style={{ flexDirection: 'row', borderWidth: 3 }}>
        <Text style={styles.titleStyle}>A great title</Text>
        <TouchableHighlight>
          <Image
            style={styles.trashStyle}
            source={require('../icons/trash.png')}
          />
        </TouchableHighlight>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.categoryStyle}>Street art</Text>
        <Text style={styles.distanceStyle}>1000 feet away</Text>
      </View>
    </View>
  );
};
const styles = {
  itemStyle: {
    alignSelf: 'center',
    flex: 1,
    width: width - 20,
    height: 60,
    borderRadius: 4,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: 'blue'
  },
  titleStyle: {
    fontSize: 28,
    alignSelf: 'flex-start'
  },
  distanceStyle: {
    fontSize: 14,
    alignSelf: 'flex-end'
  },
  categoryStyle: {
    fontSize: 14
  },
  trashStyle: {
    height: 40,
    width: 40,
    alignSelf: 'flex-end'
  }
};
export default SavedItem;