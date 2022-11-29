import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ItemCardContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // Navigate to another screen when you click a card. Item Screen
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      // provide an effect when the card is selected
      className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[182px] my-2"
    >
      <Image
        source={{ uri: imageSrc }} // image from api
        className="w-full h-40 rounded-md object-cover"
      />

      {title ? (
        <>
          <Text className="text-[#00539CFF] text-[18px] font-bold">
            {title?.length > 14 ? `${title?.slice(0, 14)}..` : title}
          </Text>

          <View className="flex-row items-center space-x-1">
            {/* location pin Icon */}
            <FontAwesome name="map-marker" size={20} color="#EEA47FFF" />
            <Text className="text-[#525252] text-[14px] font-bold">
              {/* if location length is > 11 chars, then slice and add '..' */}
              {location?.length > 16 ? `${title?.slice(0, 16)}..` : location}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

export default ItemCardContainer;
