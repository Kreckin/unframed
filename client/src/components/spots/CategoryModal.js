//import ModalPicker from 'react-native-modal-picker';
import SelectMultiple from 'react-native-select-multiple'
import React, { Component } from 'react';
import { View, TextInput, Dimensions } from 'react-native';
 
const { width } = Dimensions.get('window');
const categories = ['Street art', 'Piece','Tag','Mural','Installation','Wheat paste',
                    'Stencil','Roller','Character','Sticker', 'Other']
class CategoryModal extends Component {
 
//     constructor() {
//         super();
 
//         this.state = {
//             textInputValue: ''
//         };
//     }
 
//     render() {
//         let index = 0;
//         const data = [
//             //Later, if we want to use
//             //{ key: index++, section: true, label: 'Outdoors' },
//             { key: index++, label: 'Street art' },
//             { key: index++, label: 'Piece' },
//             { key: index++, label: 'Tag' },           
//             { key: index++, label: 'Mural' },
//             { key: index++, label: 'Installation' },
//             { key: index++, label: 'Wheat paste' },
//             { key: index++, label: 'Stencil' },
//             { key: index++, label: 'Roller' },
//             { key: index++, label: 'Character' },
//             { key: index++, label: 'Sticker' },
//             { key: index++, label: 'Other' },
//         ];
 
//         return (
//             <View style={{ flex: 1 }}>

//                 <ModalPicker
//                     data={data}
//                     initValue="Nature"
//                     onChange={(option) => { this.props.onCategoryChange(option.label)}}
//                 >    
//                 <TextInput
//                     style={styles.inputStyle}
//                     editable={false}
//                     placeholder="Pick one category that best describes the photo"
//                     value={this.props.category} 
//                 />
//                 </ModalPicker>
//             </View>
//         );
//     }
  state = { categories: [] }

  onSelectionsChange = (categories) => {
    // categories is array of { label, value }
    this.setState({ categories })
    console.log('these are my categories :^ )',categories)
  }

  render() {
    return (
      <View>
        <SelectMultiple
          items={categories}
          selectedItems={this.state.categories}
          onSelectionsChange={this.onSelectionsChange}
          style={styles.multiSelect.container}
          rowstyle={styles.multiSelect.row}
          />
      </View>
    )
  }
}
const styles = {
    inputStyle: {
        alignSelf: 'center', 
        borderWidth: 1, 
        borderRadius: 2,
        borderColor: '#ccc', 
        padding: 10, 
        height: 40, 
        width: width - 30
      },
    multiSelect: {
        container: {
            flex: 1,
            flexDirection: 'column'
        },
        row: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
            backgroundColor: '#ffffff'
        },
        checkbox: {
            width: 24,
            height: 24,
            marginRight: 5
        },
        label: {}
    }, 
  };
export default CategoryModal;
