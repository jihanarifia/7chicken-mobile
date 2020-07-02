import React, { Component } from 'react';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Button, Text, View, Grid, Col } from 'native-base';
import { Color, Screen } from '../../../api/localization';
import { globalStyles } from '../../../components/globalStyles';
import { styles } from '../components/indexStyle';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [{}, {}, {}, {}, {}, {}]
    }
  }

  renderItem(item) {
    return <View style={[globalStyles.cardContainer, { padding: 0 }]}>
      <Image style={{ height: 140, width: 'auto', borderRadius: 10, }} source={require('@assets/imageDummy/promo.jpg')}></Image>
      <Text style={{ fontWeight: 'bold', fontSize: 14, paddingHorizontal: 10, paddingTop: 5 }}>Promo Buy 1 Get 1</Text>
      <Text style={{ fontWeight: '100', fontSize: 12, padding: 10, paddingTop: 5 }}>Available Until 02 July 2023</Text>
    </View>
  }

  render() {
    return (
      <Container>
        <View style={{ backgroundColor: Color.INTERMEDIATE, height: 50 }}></View>
        <View style={[globalStyles.cardContainer, { position: 'absolute', alignSelf: 'center', width: Screen.SCREEN_WIDTH - 40, top: 10 }]}>
          <Grid>
            <Col size={3}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.point}>100 <Text style={[styles.point, { fontWeight: '100', fontSize: 12 }]}>points </Text> </Text>
                <Text style={{ fontWeight: '100', fontSize: 12 }}>Hey! Remember you have to attribute </Text>
              </TouchableOpacity>
            </Col>
            <Col size={1}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                <Image style={styles.qrcode} source={require('@assets/ic_qrcode.png')}></Image>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>

        <Content padder style={{ marginTop: 50 }}>
          <FlatList
            data={this.state.dataList}
            keyExtractor={(x, i) => i.toString()}
            onEndReachedThreshold={0.5}
            removeClippedSubviews={Platform.OS == 'android' ? true : false}
            renderItem={({ item }) => this.renderItem(item)}
            // onEndReached={() => this.handleEnd()}
            refreshing={this.state.isRefreshing}
            // onRefresh={() => this.handleRefresh()}
            ListFooterComponent={() =>
              this.state.isLoading ? <Skeleton /> : <View />}
          />
        </Content>
      </Container>
    );
  }
}

export default Home;
