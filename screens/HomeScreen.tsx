import {Button, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useEffect} from "react";

export const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    useEffect(() => {
        navigation.setOptions({
            navigationBarColor: 'white',
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <View>
                <Text>Home</Text>
                <Button title="Go to Welcome Page" onPress={() => navigation.navigate('Welcome')} />
            </View>
        </SafeAreaView>
    );
};