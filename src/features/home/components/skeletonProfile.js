import React, { Component } from 'react';
import { View, FlatList } from 'react-native'
import { Placeholder, PlaceholderLine, Shine } from "rn-placeholder";
import { Icon } from 'native-base';
import { Color } from '../../../api/localization';

class Skeleton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataList: [1, 2, 3, 4, 5, 6, 7],
		}
	}

	renderItem(val) {
		return (
			<View>
				{val == 3 || val == 7 ? <View style={{ width: Screen.SCREEN_WIDTH, padding: 3, backgroundColor: '#EFEFEF', marginBottom: 10 }} /> : null}
				<Placeholder Animation={Shine}>
					<View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 15 }}>
						<PlaceholderLine width={80} height={20} noMargin={true} />
						<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', }}>
							<Icon active name='ios-arrow-forward' style={{ color: Color.GREY_ALERT, fontSize: 16 }} />
						</View>
					</View>
				</Placeholder>
			</View>
		)
	}

	render() {
		return (
			<FlatList
				scrollEnabled={false}
				data={this.state.dataList}
				keyExtractor={(x, i) => i.toString()}
				onEndReachedThreshold={0.5}
				removeClippedSubviews={Platform.OS == 'android' ? true : false}
				renderItem={({ item }) => this.renderItem()}
			/>
		);
	}
}

export default Skeleton;
