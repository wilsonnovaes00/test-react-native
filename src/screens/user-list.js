import React from "react";
import { View, FlatList, StyleSheet, Platform, TouchableHighlight } from "react-native";
import { ListItem, Icon, SearchBar } from "react-native-elements";
import api from '../services/api'
import _ from 'lodash';

class UserList extends React.Component {

	state = {
		loading: false,
		data: [],
		errorMessage: '',
		fullDate: [],
		query: '',
	};
	static navigationOptions = {
		title: 'Users List',
		headerStyle: { backgroundColor: '#EC5252' },
		headerTitleStyle: { color: 'white', fontWeight: 'bold' }
	}

	updateSearch = query => {
		this.setState({ query });
		this.getTextSearch(query);

	};

	async componentDidMount() {
		this.signIn();
	}

	signIn = _.debounce(async () => {
		try {
			const response = await api.get('/public-api/users/');
			this.setState({ data: response.data.result });
			this.setState({ fullDate: response.data.result });
		} catch (err) {
			this.setState({ errorMessage: err.data.error });
		}
	}, 500);

	getTextSearch = (text) => {
		const textFormated = text.toLowerCase();
		const filter = _.filter(this.state.fullDate, user => _.includes(user.first_name.toLowerCase(), textFormated));
		this.setState({ data: filter });
	};

	renderSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: "86%",
					backgroundColor: "#CED0CE",
					marginLeft: "14%"
				}}
			/>
		);
	};

	renderHeader = (query) => {
		return <SearchBar
			platform={Platform.OS === "ios" ? "ios" : "android"}
			lightTheme
			inputStyle={{ margin: 0 }}
			onChangeText={this.updateSearch}
			value={query}
			placeholder="Search ..."
			inputContainerStyle={{
				backgroundColor: "#dfe1df",
				marginTop: -7,
				padding: 10
			}}
		/>
	};

	goToNextScreen = (item) => {
		this.props.navigation.navigate("Details", { UserId: item });
	}
	render() {
		const { query } = this.state;
		return (
			<FlatList
				data={this.state.data}
				renderItem={({ item }) => (
					<TouchableHighlight onPress={() => this.goToNextScreen(item.id)}>
						<ListItem
							rightIcon={<Icon name={'angle-right'} type="font-awesome" size={20} color="#EC5252" />}
							title={`${item.first_name} ${item.last_name}`}
							subtitle={item.email}
							leftAvatar={{ source: { uri: item._links.avatar.href } }}
						/>
					</TouchableHighlight>
				)}
				keyExtractor={item => item.email}
				ItemSeparatorComponent={this.renderSeparator}
				ListHeaderComponent={this.renderHeader(query)}
				ListFooterComponent={this.renderFooter}
			/>

		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
});

export default UserList;