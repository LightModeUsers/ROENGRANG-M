import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screen/Login";
import UserScreen from "../screen/User";
import HomeScreen from "../screen/HomeScreen";
import ProductDetail from "../screen/ProductDetail";
import Cart from "../screen/Cart";
import Checkout from "../screen/Checkout";
import Orders from "../screen/Orders";
import AllOrder from "../screen/Order/All";
import NewOrder from "../screen/Order/New";
import PrepareOrder from "../screen/Order/Prepare";
import ShipOrder from "../screen/Order/Ship";
import ShipedOrder from "../screen/Order/Shiped";
import SuccessOrder from "../screen/Order/Success";
import CancelOrder from "../screen/Order/Cancel";
import OrdersDetail from "../screen/OrderDetail";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name="User" component={UserScreen} /> */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Detail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="All" component={AllOrder} />
      <Stack.Screen name="New" component={NewOrder} />
      <Stack.Screen name="Prepare" component={PrepareOrder} />
      <Stack.Screen name="Ship" component={ShipOrder} />
      <Stack.Screen name="Shiped" component={ShipedOrder} />
      <Stack.Screen name="Success" component={SuccessOrder} />
      <Stack.Screen name="Cancel" component={CancelOrder} />
      <Stack.Screen name="OrderDetail" component={OrdersDetail} /> 
      
    </Stack.Navigator>
  );
}

export default AppNavigator;
