import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  // navigation
  const navigation = useNavigation(); //hook
  // Remove the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, //nav home header, set to false.
    });
  }, []);

  return (
    // flex-1 takes the entire screen
    <SafeAreaView className="bg-white flex-1 relative ">
      {/* Section 1 - header */}
      <View className="flex-row px-6 mt-8 items-center ">
        <View className="h-12.5 bg-[#3B3B3B] items-center justify-center rounded-xl">
          <Text className="text-[#EEA47FFF] text-2xl font-semibold p-3">
            Chapman Travel
            {/* Palm tree icon from vector icons */}
            <MaterialCommunityIcons
              name="palm-tree"
              size={30}
              color="#EEA47FFF"
            />
          </Text>
        </View>
      </View>

      {/* Section 2 - Title and description of application. 3 text sections included */}
      <View className="px-6 mt-3 space-y-1">
        <Text className="text-[#525252] text-[35px]">Always say yes to</Text>
        <Text className="text-[#EEA47FFF] text-[42px] font-bold">
          New Adventures!
        </Text>
        <Text className="text-[#525252]">
          A travel application to help you discover the best places to make
          memories. It is time to see the world.
        </Text>
      </View>

      {/* Section 3 - plane display: circle and a plane icon */}
      <View className="w-[400px] h-[400px] bg-[#00539CFF] rounded-full absolute bottom-36 -right-1"></View>

      <View className="flex-1 relative items-center justify-center">
        {/* Plane icon from: https://icons.expo.fyi/Fontisto/paper-plane */}
        <View className="mb-20">
          <SimpleLineIcons name="plane" size={300} color="#EEA47FFF" />
        </View>

        {/* Touchable Opacity = changes the color opacity once clicked */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Discover")} // we want to jump to discover page once clicked
          className="absolute bottom-7 items-center justify-center"
        >
          <Animatable.View
            // https://www.npmjs.com/package/react-native-animatable : Picked animations from here
            animation={"pulse"}
            easing="ease-in-out"
            iterationCount={"infinite"} // continuous animation
            className="w-60 h-19 p-2 rounded-xl items-center justify-center bg-[#00539CFF]"
          >
            <Text className="text-white text-[36px] font-semibold">
              Get Started
            </Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
