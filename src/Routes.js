import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserList from "./screens/user-list";
import UserDetails from "./screens/user-details";

const MyProjetc = createStackNavigator({
  Home: { screen: UserList },
  Details: { screen: UserDetails }
}, {
    initialRouteName: 'Home'
  });

export default createAppContainer(MyProjetc);
