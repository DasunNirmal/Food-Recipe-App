import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw from "twrnc";
import Animated, { FadeInDown} from 'react-native-reanimated';

export const Categories = ({categories,activeCategory,handleCategoryPress}: any) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ width: '100%' }}
                contentContainerStyle={[tw`flex-row gap-x-3 px-4`, {paddingHorizontal: 15}]}>

                {categories.map((category: { strCategory: string, strCategoryThumb: string }, index:number) => {
                    let isActive = activeCategory === category.strCategory;
                    let activeButtonClass = isActive? tw`bg-orange-500` : tw`bg-yellow-950/8`;

                    return (
                        <TouchableOpacity key={index} style={tw`flex items-center gap-2 ml-2 w-auto`}
                        onPress={() => handleCategoryPress(category.strCategory)}>
                            <View style={[tw`rounded-full p-1.5`, activeButtonClass]}>
                                <Image
                                    source={{uri: category.strCategoryThumb}}
                                    style={[tw`rounded-full`, {width: hp('5%'), height: hp('5%')}]}
                                />
                            </View>
                            <Text style={tw`text-sm`}>{category.strCategory}</Text>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>
        </Animated.View>
    );
};