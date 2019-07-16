import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import api from '../services/api';

export default class UserDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: [],
			avatar: null,
			errorMessage: ''
		};
	}

	static navigationOptions = {
		title: 'User Details',
		headerStyle: { backgroundColor: '#EC5252' },
		headerTitleStyle: { color: 'white', fontWeight: 'bold' },
		headerTintColor: 'white',
	}

	async componentDidMount() {
		this.getUser();
	}

	getUser = async () => {
		const { navigation } = this.props;
		const userId = navigation.getParam('UserId');
		try {
			const response = await api.get(`/public-api/users/${userId}`);
			this.setState({ user: response.data.result });
			this.setState({ avatar: this.state.user._links.avatar.href });
		} catch (err) {
			this.setState({ errorMessage: err.data.error });
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}></View>

				<Image style={styles.avatar} source={{ uri: this.state.avatar }} />
				<View style={styles.bodyContent}>
					<Text style={styles.name}> {` ${this.state.user.first_name} ${this.state.user.last_name}`}</Text>
				</View>

				<View style={styles.bodyIcon}>
					<View style={styles.item}>
						<View style={styles.iconContent}>
							<Image style={styles.icon} source={require('../../assets/img/email.png')} />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.info}>{this.state.user.email} </Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.iconContent}>
							<Image style={styles.icon} source={require('../../assets/img/gender.png')} />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.info}>{this.state.user.gender} </Text>
						</View>
					</View>

					<View style={styles.item}>
						<View style={styles.iconContent}>
							<Image style={styles.icon} source={require('../../assets/img/phone.png')} />
						</View>
						<View style={styles.infoContent}>
							<Text style={styles.info}>{this.state.user.phone} </Text>
						</View>
					</View>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#EC5252",
		height: 120,
	},
	bodyIcon: {
		width: 200,
		marginTop: 85
	},
	item: {
		flexDirection: 'row',
		marginBottom: 20
	},
	infoContent: {
		flex: 1,
		alignItems: 'flex-start',
		paddingLeft: 5
	},
	iconContent: {
		flex: 1,
		alignItems: 'flex-end',
		paddingRight: 5,
	},
	icon: {
		width: 20,
		height: 20,
		marginTop: 3
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: "white",
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 30
	},

	bodyContent: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	name: {
		fontSize: 28,
		color: "#696969",
		fontWeight: "600",
		marginTop: 35
	},
	info: {
		width: 300,
		fontSize: 18,
		marginTop: 0,
		fontWeight: 'bold',
		justifyContent: 'space-between',
		color: "#EC5252",
		textAlign: 'left'
	},
	description: {
		fontSize: 16,
		color: "#696969",
		marginTop: 10,
		textAlign: 'center'
	}
});

