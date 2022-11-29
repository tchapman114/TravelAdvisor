import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const ItemScreen = ({ route }) => {
  const navigation = useNavigation();

  const data = route?.params?.param;

  // Remove the header option
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Section 1: Image from API. IMAGE CONTAINER*/}
      {/* Scroll View = screen is scrollable, you want to take up the entire page */}
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              // Image object from API. Same photo implementation as the discover screen
              uri: data?.photo?.images?.large?.url
                ? data?.photo?.images?.large?.url
                : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg", // if photo does not exist, load a default
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />

          {/* Top left of image: Arrow button that takes you to the Discover screen*/}
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Discover")} // Navigate to another screen
              className="w-10 h-10 rounded-md items-center justify-center bg-[#00539CFF]"
            >
              <FontAwesome5 name="chevron-left" size={24} color="white" />
            </TouchableOpacity>

            {/* Top right of image: Heart button on the image */}
            <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#00539CFF]">
              <FontAwesome name="heart-o" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Bottom left of image: price */}
          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              <Text className="text-[32px] font-bold text-gray-100">
                {data?.price}
              </Text>
            </View>

            {/* If it is open now ot not */}
            {/* <View className="px-2 py-1 rounded-md bg-teal-100">
              <Text>{data?.open_now_text}</Text>
            </View> */}
          </View>
        </View>

        {/* Section 2: Heading: Name, location, ratings, price level */}
        {/* Name from api */}
        <View className="mt-6">
          <Text className="text-[#3B3B3B] text-[24px] font-bold">
            {data?.name}
          </Text>
          {/* Location from api */}
          <View className="flex-row items-center space-x-2 mt-2">
            {/* Using the font awesome map marker for location */}
            <FontAwesome name="map-marker" size={25} color="#00539CFF" />
            <Text className="text-[#00539CFF] text-[20px] font-bold">
              {data?.location_string}
            </Text>
          </View>
        </View>

        {/* Heading section: icons for ratings, price level, and status */}
        {/* Rating */}
        <View className="mt-3 flex-row items-center justify-between">
          {data?.rating && (
            <View className=" flex-row items-center space-x-1">
              <View className="w-12 h-12 rounded-2xl bg-[#EEA47FFF] items-center justify-center shadow-md">
                <FontAwesome name="star" size={24} color="white" />
              </View>
              <View>
                <Text className="text-[#3B3B3B]">{data?.rating}</Text>
                <Text className="text-[#3B3B3B]">Ratings</Text>
              </View>
            </View>
          )}
          {/* Price level */}
          {data?.price_level && (
            <View className=" flex-row items-center space-x-1">
              <View className="w-12 h-12 rounded-2xl bg-[#EEA47FFF]  items-center justify-center shadow-md">
                <MaterialIcons name="attach-money" size={24} color="white" />
              </View>
              <View>
                <Text className="text-[#3B3B3B]">{data?.price_level}</Text>
                <Text className="text-[#3B3B3B]">Price Level</Text>
              </View>
            </View>
          )}
          {/* Open now ? */}
          {data?.open_now_text && (
            <View className=" flex-row items-center space-x-1">
              <View className="w-12 h-12 rounded-2xl bg-[#EEA47FFF]  items-center justify-center shadow-md">
                <FontAwesome name="question" size={24} color="white" />
              </View>
              <View>
                <Text className="text-[#3B3B3B] capitalize">
                  {data?.open_now_text}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Section 3: the description from api */}
        {data?.description && (
          <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#808080]">
            {data?.description}
          </Text>
        )}

        {/* Cuisine options */}
        {data?.cuisine && (
          <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4 text-[#3B3B3B]">
            {data?.cuisine.map((n) => (
              <View key={n.key} className="px-2 py-1 rounded-md bg-[#EEA47FFF]">
                <Text>{n.name}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Section 4: Contact information from the api */}
        <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2 text-[#3B3B3B]">
          {data?.phone && ( // if data has a phone number, show it
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="phone" size={24} color="#EEA47FFF" />
              <Text className="text-lg">{data?.phone}</Text>
            </View>
          )}

          {data?.address && ( // if data has a address, show it
            <View className="items-center flex-row space-x-6">
              <FontAwesome name="map-pin" size={24} color="#EEA47FFF" />
              <Text className="text-lg">{data?.address}</Text>
            </View>
          )}
          {/* Book now button */}
          <View className="mt-4 px-4 py-4 rounded-lg bg-[#00539CFF] items-center justify-center mb-12">
            <Text className="text-3xl font-semibold uppercase tracking-wider text-white">
              Book Now
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemScreen;
