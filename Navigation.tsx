import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HomeScreen} from "./screens/HomeScreen";
import {WelcomeScreen} from "./screens/WelcomeScreen";
import {RecipeDetailsScreen} from "./screens/RecipeDetailsScreen";

const Stack = createNativeStackNavigator();

export const Navigation =() => {
    const backgroundColor = 'rgb(254 205 211)';
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Welcome'} screenOptions={{headerShown: false, navigationBarColor: backgroundColor}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}