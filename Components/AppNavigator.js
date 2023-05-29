import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/Login";
import UserScreen from "../screen/User";
import HomeScreen from "../screen/HomeScreen";


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="User" component={UserScreen} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default AppNavigator;
