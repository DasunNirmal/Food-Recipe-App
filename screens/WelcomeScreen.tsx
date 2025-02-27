import {Image, Text, View} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import tw from 'twrnc';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import {useEffect} from "react";

export const WelcomeScreen = () => {

    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
    });

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const ring_1_padding = useSharedValue(0);
    const ring_2_padding = useSharedValue(0);

    useEffect(() => {
        ring_1_padding.value = 0;
        ring_2_padding.value = 0;
        setTimeout(() => {ring_1_padding.value = withSpring(ring_1_padding.value+hp('2.8%'));},300);
        setTimeout(() => {ring_2_padding.value = withSpring(ring_2_padding.value+hp('4%'));},400);
        setTimeout(() => {navigation.navigate('Home');},2500);
    }, []);

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={tw`flex-1 justify-center items-center space-y-10 bg-rose-200`}>
                {/*Log with image and rings*/}
                <Animated.View style={[tw`bg-rose-400/20 rounded-full`,{padding: ring_2_padding}]}>
                    <Animated.View style={[tw`bg-rose-400/30 rounded-full`,{padding: ring_1_padding}]}>
                        <Image source={require('../assets/logo-removebg.png')} style={[{ width: wp('60%'), height: hp('28%') }]} />
                    </Animated.View>
                </Animated.View>

                {/*App Slogan*/}
                <View style={tw`flex items-center mt-20`}>
                    <Text style={[tw`text-lg text-center text-yellow-950 tracking-widest`,{fontSize: hp('2%'), fontFamily: 'Poppins_500Medium'}]}>
                        We Help You To Find Best And Delicious Food
                    </Text>
                </View>
            </View>
        );
    }
};