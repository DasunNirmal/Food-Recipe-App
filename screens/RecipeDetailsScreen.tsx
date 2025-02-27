import {Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import tw from "twrnc";
import {useEffect, useState} from "react";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ChevronLeftIcon, ClockIcon} from "react-native-heroicons/outline";
import {FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon} from "react-native-heroicons/solid";
import axios from "axios";
import {Loading} from "../components/loading";
import {
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
    Poppins_800ExtraBold_Italic, Poppins_900Black, Poppins_900Black_Italic,
    useFonts
} from "@expo-google-fonts/poppins";

export const RecipeDetailsScreen = ({route} : any) => {

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
    const item = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [meals, setMeals] = useState<{
        strMeal: string;
        strArea: string;
        strCategory: string;
        strInstructions: string;
        strYoutube?: string;
        [key: string]: string | null | undefined;
    } | null>(null);

    const [leading, setLeading] = useState(true);

    useEffect(() => {
        getMealDataByID(item.idMeal);
    }, []);

    const getMealDataByID = async (id: string) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeals(response.data.meals[0]);
                setLeading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkIngredientsIndex = (meals: any) => {
        if (!meals) return [];
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (meals[`strIngredient` + i]) {
                ingredients.push(i);
            }
        }
        return ingredients;
    }

    useEffect(() => {
        navigation.setOptions({
            navigationBarColor: 'rgb(255 241 242)',
        });
    }, [navigation]);

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <ScrollView style={tw`flex-1 bg-rose-50`} showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 30}}>

                {/*Recipe Image*/}
                <View style={tw`flex-row justify-center`}>
                    <Image source={{uri: item.strMealThumb}} style={[tw``, {
                        width: wp('98%'),
                        height: hp('50%'),
                        borderRadius: 55,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        marginTop: 5
                    }]}/>
                </View>

                {/*Back Button and Favorite Button*/}
                <View style={tw`w-full flex-row absolute justify-between items-center pt-16`}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 rounded-full ml-5 bg-rose-50`}>
                        <ChevronLeftIcon size={30} strokeWidth={4.5} color='rgb(249 115 22)'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}
                                      style={tw`p-2 rounded-full ml-5 bg-rose-50 mr-5`}>
                        <HeartIcon size={30} color={isFavorite ? 'red' : 'gray'}/>
                    </TouchableOpacity>
                </View>

                {/*Recipe Details*/}
                {
                    leading ? (
                        <Loading props={[tw`mt-35`, {size: 'large', color: 'rgb(249 115 22)'}]}/>
                    ) : (
                        <View style={tw`px-5 flex justify-between gap-y-4 pt-10`}>

                            {/*Name and Area*/}
                            <View style={tw`gap-y-2`}>
                                <Text style={[tw`flex-1 text-yellow-950`, {fontFamily: 'Poppins_600SemiBold', fontSize: hp('2.5%')}]}>
                                    {meals?.strMeal}
                                </Text>
                                <Text style={[tw`flex-1 text-yellow-950`, {fontFamily: 'Poppins_500Medium', fontSize: hp('1.6%')}]}>
                                    {meals?.strArea}
                                </Text>
                            </View>

                            {/*Category and Instructions*/}
                            <View style={tw`flex-row justify-around`}>
                                <View style={tw`flex rounded-full bg-orange-500 p-2`}>
                                    <View style={[tw`items-center justify-center rounded-full bg-rose-50`,{height: hp('5%'), width: hp('5%')}]}>
                                        <ClockIcon size={hp('3.5%')} color='rgb(66 32 6)'/>
                                    </View>
                                    <View style={tw`flex items-center py-2`}>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.8%')}]}>35</Text>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.4%')}]}>Mins</Text>
                                    </View>
                                </View>

                                <View style={tw`flex rounded-full bg-orange-500 p-2`}>
                                    <View style={[tw`items-center justify-center rounded-full bg-rose-50`,{height: hp('5%'), width: hp('5%')}]}>
                                        <UsersIcon size={hp('3.5%')} color='rgb(66 32 6)'/>
                                    </View>
                                    <View style={tw`flex items-center py-2`}>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.8%')}]}>03</Text>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.4%')}]}>Serv</Text>
                                    </View>
                                </View>

                                <View style={tw`flex rounded-full bg-orange-500 p-2`}>
                                    <View style={[tw`items-center justify-center rounded-full bg-rose-50`,{height: hp('5%'), width: hp('5%')}]}>
                                        <FireIcon size={hp('3.5%')} color='rgb(66 32 6)'/>
                                    </View>
                                    <View style={tw`flex items-center py-2`}>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.8%')}]}>103</Text>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.4%')}]}>cal</Text>
                                    </View>
                                </View>

                                <View style={tw`flex rounded-full bg-orange-500 p-2`}>
                                    <View style={[tw`items-center justify-center rounded-full bg-rose-50`,{height: hp('5%'), width: hp('5%')}]}>
                                        <Square3Stack3DIcon size={hp('3.5%')} color='rgb(66 32 6)'/>
                                    </View>
                                    <View style={tw`flex items-center py-2`}>
                                        <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_600SemiBold', fontSize: hp('1.4%')}]}>Easy</Text>
                                    </View>
                                </View>
                            </View>

                            {/*Ingredients*/}
                            <View style={tw`gap-y-4 mt-4`}>
                                <Text style={[tw`flex-1 text-yellow-950`, {fontFamily: 'Poppins_600SemiBold', fontSize: hp('2.2%')}]}>
                                    Ingredients
                                </Text>
                                <View style={tw`gap-y-2 ml-3`}>
                                    {
                                        checkIngredientsIndex(meals).map((index) => (
                                            <View key={index} style={tw`flex-row gap-x-4`}>
                                                <View style={[tw`rounded-full bg-orange-500`,{height: hp('2%'), width: hp('2%')}]} />
                                                <View style={tw`flex-row gap-x-2`}>
                                                    <Text style={[tw`text-slate-950`,{fontFamily: 'Poppins_500Medium', fontSize: hp('1.6%')}]}>
                                                        {meals[`strIngredient${index}`]}
                                                    </Text>
                                                    <Text style={[tw`text-yellow-950`,{fontFamily: 'Poppins_500Medium', fontSize: hp('1.6%')}]}>
                                                        {meals[`strMeasure${index}`]}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>

                            {/*Instructions*/}
                            <View style={tw`gap-y-4 mt-4`}>
                                <Text style={[tw`flex-1 text-yellow-950`, {fontFamily: 'Poppins_600SemiBold', fontSize: hp('2.2%')}]}>
                                    Instructions
                                </Text>
                                <Text style={[tw``, {fontSize: hp('1.6%'), fontFamily: 'Poppins_500Medium'}]}>
                                    {meals?.strInstructions}
                                </Text>
                            </View>

                            {/*Recipe Video*/}
                            {
                                meals?.strYoutube && (
                                    <View style={tw`gap-y-4 mt-4`}>
                                        <Text style={[tw`flex-1 text-yellow-950`, {fontFamily: 'Poppins_600SemiBold', fontSize: hp('2.2%')}]}>
                                            Recipe Video
                                        </Text>
                                        <View style={tw`flex-row gap-x-2`}>

                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}