import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "@react-navigation/native";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from "../assets";
import MenuContainer from "../components/MenuContainer";

import { FontAwesome } from "@expo/vector-icons";
import ItemCardContainer from "../components/ItemCardContainer";
import { getPlacesData } from "../api";

const Discover = () => {
  const navigation = useNavigation();

  //   React States. using for api
  const [type, setType] = useState("restaurants"); // default to restaurants menu
  const [isLoading, setIsLoading] = useState(false); //when api is loading
  const [mainData, setMainData] = useState([]);
  // Use these to grab location data from google api and plug into Rapid API ( Travel API )
  const [bl_lat, setBl_lat] = useState(null);
  const [bl_lng, setBl_lng] = useState(null);
  const [tr_lat, setTr_lat] = useState(null);
  const [tr_lng, setTr_lng] = useState(null);

  // React navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  //API call
  useEffect(() => {
    setIsLoading(true); //enable loading true until data is fetched
    getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
      setMainData(data); //set data with the data we got from endpoint
      setInterval(() => {
        setIsLoading(false);
      }, 2000);
    });
    // any changes in anyof these values in array, it must be re-rendered and passed as params
  }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* Section 1: Header with text and icon image */}
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[40px] text-[#00539CFF] font-bold">
            Embrace
          </Text>

          <Text className="text-[#EEA47FFF] text-[36px] font-semibold mb-2">
            the journey today
          </Text>
        </View>
        <View className="w-12 h-12 rounded-md items-center justify-center">
          {/* Avatar image: upper right corner */}
          <Image
            source={Avatar}
            className="w-full h-full rounded-full object-cover mb-12"
          ></Image>
        </View>
      </View>

      {/* Section 2: Search bar, implement google API */}
      <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg">
        {/* Google Places API implementation */}
        <GooglePlacesAutocomplete
          GooglePlacesDetailsQuery={{ fields: "geometry" }} //gives us latitude and longitude for RapidAPI
          placeholder="Search"
          fetchDetails={true}
          enablePoweredByContainer={false} // get rid of the powered by google logo
          onPress={(data, details = null) => {
            //given in the documentation
            // 'details' is provided when fetchDetails = true
            // update view port to grab the location to fetch from API
            console.log(details?.geometry?.viewport);
            setBl_lat(details?.geometry?.viewport?.southwest?.lat);
            setBl_lng(details?.geometry?.viewport?.southwest?.lng);
            setTr_lat(details?.geometry?.viewport?.northeast?.lat);
            setTr_lng(details?.geometry?.viewport?.northeast?.lng);
          }}
          query={{
            // control google apis here: https://console.cloud.google.com/
            //TODO get rid of key before pushing to git hub
            key: "AIzaSyDmwzPEpUXOKnOiA7_2wlPExCXlpKA9J70",
            language: "en",
          }}
        />
      </View>

      {/* Section 3: Menu options: hotel, restaurants, and attractions */}
      {isLoading ? ( //loading animation, waiting for api response
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00539CFF" />
        </View>
      ) : (
        //if not loading api response
        <ScrollView>
          <View className="flex-row items-center justify-between px-4 mt-8">
            {/* View with 3 menu options */}
            {/* use MenuContainer component */}
            <MenuContainer
              key={"hotels"} // used to tell us which endpoint to call
              title="Hotels" // what is displayed in the menu
              imageSrc={Hotels} // image
              type={type}
              setType={setType} // useState
            />

            {/* Attractions */}
            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            {/* Restaurant */}
            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          {/* Section 4, card image and info previews from API */}
          <View>
            <View className="flex-row items-center justify-between px-4 mt-8">
              <Text className="text-[#00539CFF] text-[28px] font-bold">
                Top Results
              </Text>
              <TouchableOpacity className="flex-row items-center justify-between space-x-2">
                <Text className="text-[#EEA47FFF] text-[20px] font-bold">
                  Explore
                </Text>
                {/* https://icons.expo.fyi/ */}
                {/* Arrow icon */}
                <FontAwesome
                  name="long-arrow-right"
                  size={24}
                  color="#EEA47FFF"
                />
              </TouchableOpacity>
            </View>

            {/* Cards: preview of api image, location, title*/}
            <View className="px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? ( // if there is data from api
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainer
                      key={i} // iterator to filter though api data
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url // put the image if it exits
                          : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" //else, default to this image
                      }
                      title={data?.name} // display name if exists
                      location={data?.location_string} // display location if exists
                      data={data}
                    />
                  ))}
                </>
              ) : (
                // else no response from API. data was not retrieved from API. Error - display image mage
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#00539CFF] font-semibold">
                      No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Discover;
