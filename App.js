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
      text: '',
      data: [],
      loadMoreVisible: true,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.arrayholder = data.info;
    this.setState({
      data: data.info,
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
      <View>
        <View style={styles.container}>
          <View style={styles.sectionStyle}>
            <Icon
              style={styles.imageStyle}
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
    fontSize: 22,
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: -30,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'grey',
    height: 45,
    borderRadius: 50,
    margin: 10,
  },
  imageStyle: {
    padding: 14,
    marginTop: 35,
    height: 85,
    width: 85,
  },
});
