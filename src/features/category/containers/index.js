import React, {Component} from 'react';
import {Container, Content, Button, Text} from 'native-base';

class Category extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Text>Category</Text>
          <Button onPress={() => this.props.navigation.navigate('DetailCategory')}>
            <Text>Go to DetailCategory</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Category;
