import React, {Component} from 'react';

import {
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  Button,
} from 'react-native';
import data from './data';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
      allData: data.info,
      loadMoreVisible: true,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
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

  makeAdmin = () => {
    Alert.alert('makeAdmin');
  };
  approvedUser = () => {
    Alert.alert('approvedUser');
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
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <View style={{marginRight: 10}}>
              <Button
                title="Make Admin"
                color="#72BB53"
                onPress={this.makeAdmin}
              />
            </View>
            <View>
              <Button
                title="Approve"
                color="#72BB53"
                onPress={this.approvedUser}
              />
            </View>
          </View>
        </View>
      </View>
    );
    const renderItem = ({item}) => <Item title={item.userName} />;
    return (
      <View style={styles.MainContainer}>
        {/* <View>
          <Icon
            style={styles.searchIcon}
            name="ios-search"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.searchData(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search"
          />
        </View> */}

        <View>
          <Icon
            style={styles.searchIcon}
            name="search"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.searchData(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search"
          />
        </View>
        {this.state.data.length != 0 ? (
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24}}>No User Found.</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 0,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    flex: 1,
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
