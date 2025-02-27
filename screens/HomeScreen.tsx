import {ScrollView, Text, TextInput, View} from "react-native";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {useEffect, useState} from "react";
import tw from "twrnc";
import axios from "axios";
import {BellIcon, MagnifyingGlassIcon, UserIcon} from "react-native-heroicons/solid";
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
import {Categories} from "../components/categories";

export const HomeScreen = () => {

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
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            navigationBarColor: 'rgb(255 241 242)',
        });
    }, [navigation]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={tw`flex-1 bg-rose-50`}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 50}}
                            style={tw`mt-4 ml-2 pt-14`}>
                    {/*User Logo and Bell Icon*/}
                    <View style={tw`mx-3 flex-row items-center justify-between mb-8`}>
                        <UserIcon size={hp('3.8%')} color={'rgb(66 32 6)'}/>
                        <BellIcon size={hp('3.8%')} color={'rgb(66 32 6)'}/>
                    </View>
                    {/*Welcome and Slogan*/}
                    <View style={tw`mx-4 mt-2 mb-2 mb-6`}>
                        <Text style={[tw`text-yellow-950`,{fontSize: hp('1.8%'), fontFamily: 'Poppins_500Medium'}]}>Hello, Dasun!</Text>
                        <View>
                            <Text style={[tw`text-yellow-950`,{fontSize: hp('2.8%'), fontFamily: 'Poppins_500Medium'}]}>Make your own Food,</Text>
                        </View>
                        <Text style={[tw`text-yellow-950`,{fontSize: hp('2.8%'), fontFamily: 'Poppins_500Medium'}]}>stay at <Text style={tw`text-orange-500`}>Home</Text></Text>
                    </View>
                    {/*Search Bar*/}
                    <View style={tw`mx-4 flex-row items-center rounded-full bg-yellow-950/10 p-1 mb-6`}>
                        <TextInput placeholder="Search any recipe" placeholderTextColor={'rgb(66 32 6)'} style={[tw`text-yellow-950 flex-1 text-base mt-1 pl-3 tracking-wider`,{fontSize: hp('1.7%'), fontFamily: 'Poppins_400Regular'}]} />
                        <View style={tw`bg-rose-50 p-3 rounded-full`}>
                            <MagnifyingGlassIcon size={hp('2.5%')} color={'rgb(66 32 6)'}/>
                        </View>
                    </View>
                    {/*Categories*/}
                    <View>
                        {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory}
                                     setActiveCategory={setActiveCategory}/>}
                    </View>
                </ScrollView>
            </View>
        );
    }
};