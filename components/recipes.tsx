import {Image, Pressable, Text, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw from "twrnc";
import MasonryList from '@react-native-seoul/masonry-list';
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
import {mealData} from "../constants/dummy-data";
import Animated, { FadeInDown} from 'react-native-reanimated';

export const Recipes = ({meals, categories}: any) => {

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

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <View style={tw`mx-4 gap-y-3 gap-x-2 mt-8`}>
                <Text style={[tw`text-yellow-950`, {fontSize: hp('2.5%'), fontFamily: 'Poppins_600SemiBold'}]}>Recipes</Text>
                <View>
                    {
                        categories.length === 0 || meals.length === 0 ? null : (
                            <MasonryList
                                data={meals}
                                keyExtractor={(item): string => item.idMeal}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({item, i}) => <CardItem item={item} index={i} />}
                                onEndReachedThreshold={0.1}
                            />
                        )
                    }
                </View>
            </View>
        );
    }
}

const CardItem = ({item,index}: { item: any, index: number }) => {
    const isEven = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(20)}>
            <Pressable style={[tw`flex justify-center mb-4 gap-y-2`, {width: '100%', paddingLeft: isEven? 0 : wp('3%'), paddingRight: isEven? wp('3%') : 0}]}>
                <Image source={{uri: item.strMealThumb}} style={[tw`bg-yellow-950/8`, {width: '100%', height: index % 3 === 0? hp('25%') : hp('35%'), borderRadius: 35}]}/>
                <Text style={[tw`text-yellow-950 ml-2`,{fontSize: hp('1.6%'), fontFamily: 'Poppins_500Medium'}]}>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}