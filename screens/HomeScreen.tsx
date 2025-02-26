import {Button, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp, NativeStackNavigatorProps} from "@react-navigation/native-stack";

export const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                <Button title="Go to Restaurant" onPress={() => navigation.navigate('Restaurant')} />
            </View>
        </SafeAreaView>
    );
};