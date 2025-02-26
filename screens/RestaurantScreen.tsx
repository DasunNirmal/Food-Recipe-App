import {Button, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export const RestaurantScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    return (
        <SafeAreaView>
            <View>
                <Text>Restaurant</Text>
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            </View>
        </SafeAreaView>
    );
};