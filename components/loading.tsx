import {ActivityIndicator, View} from "react-native";
import tw from "twrnc";

export const Loading = ({props} : any) => {
    return (
        <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color='rgb(249 115 22)' style={tw`mt-25`} {...props}/>
        </View>
    );
}