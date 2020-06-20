import React, {Component} from 'react';
import {Container, Content, Button, Text} from 'native-base';

class Home extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Home</Text>
          <Button onPress={() => this.props.navigation.navigate('Profile')}>
            <Text>Go to Profile</Text>
          </Button>

          <Button style={{ borderRadius: 5, marginTop: 15 }} onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Go to login</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default Home;
