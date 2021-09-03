import React, {Component} from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-elements';
import {SearchBar} from 'react-native-elements';

import {Icon} from 'react-native-elements';
import data from './data';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
      allData: data.info,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    console.log('all data', this.state.allData);
    this.arrayholder = data.info;
    this.setState({
      data: data.info,
      isLoading: false,
    }),
      () => {
        this.arrayholder = data.info;
      };
  }

  GetFlatListItem(userName) {
    Alert.alert(userName);
  }

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.userName.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  itemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  render() {
    const Item = ({title}) => (
      <View style={styles.item}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10}}>
              <Button
                title="Make Admin"
                buttonStyle={{backgroundColor: '#72BB53'}}
              />
            </View>
            <View>
              <Button
                title="Approve"
                buttonStyle={{backgroundColor: '#72BB53'}}
              />
            </View>
          </View>
        </View>
      </View>
    );
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    const renderItem = ({item}) => <Item title={item.userName} />;
    return (
      <View style={styles.MainContainer}>
        {/* <TextInput
          style={styles.textInput}
          onChangeText={text => this.searchData(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search"
        /> */}
        <SearchBar
          onChangeText={text => this.searchData(text)}
          placeholder="Search"
          lightTheme
          clearIcon
          containerStyle={{
            backgroundColor: 'white',
            borderRadius: 50,
            borderColor: 'grey',
            borderWidth: 2,
            borderTopWidth: 2,
            borderTopColor: 'grey',
            borderBottomColor: 'grey',
            borderBottomWidth: 2,
            marginTop: 20,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: -2,
            paddingBottom: -2,
          }}
          searchIcon={{size: 24}}
          inputContainerStyle={{backgroundColor: 'white', borderRadius: 30}}
        />
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // backgroundColor: 'white',
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
  },
  textInput: {
    padding: 5,
    paddingLeft: 20,
    height: 45,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 50,
    backgroundColor: '#FFFF',
  },
});
