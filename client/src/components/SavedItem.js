import React from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SavedItem = (props) => {
  return (
    <View style={styles.itemStyle}>
      <View style={styles.titleBarStyle}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        <TouchableHighlight onPress={function () { props.removeSavedSpot(props.id); }}>
          <Image
            style={styles.trashStyle}
            source={require('../icons/trash.png')}
          />
        </TouchableHighlight>
      </View>
      <View style={{ flexDirection: 'row', borderWidth: 3 }}>
        <Text style={styles.categoryStyle}>{props.description}</Text>
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
    borderWidth: 2
  },
  titleStyle: {
    fontSize: 12,
    alignSelf: 'flex-start'
  },
  titleBarStyle: {
    flexDirection: 'row',
    borderWidth: 3,
    justifyContent: 'space-between'
  },
  distanceStyle: {
    fontSize: 14,
    alignSelf: 'flex-end',
    flex: 1,
    textAlign: 'right'
  },
  categoryStyle: {
    fontSize: 14,
    alignSelf: 'flex-start',
    flex: 1
  },
  trashStyle: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end'
  }
};
export default SavedItem;
