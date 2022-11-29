import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const MenuContainer = ({ title, imageSrc, type, setType }) => {
  // handlePress function, simply sets type to the lowercase title
  const handlePress = () => {
    setType(title.toLowerCase());
  };

  return (
    <TouchableOpacity
      className="items-center justify-center space-y-2"
      onPress={handlePress} // handling when menu is selected
    >
      <View
        className={`w-24 h-24 p-2 shadow-sm rounded-full items-center justify-center ${
          // if type == to the {title}, set the background to a different color for UI
          type === title.toLowerCase() ? "bg-gray-200" : "" //if it is actively selected, provide a background color
        }`}
      >
        <Image
          source={imageSrc}
          className="w-full h-full object-contain rounded-full"
        />
      </View>
      <Text className="text-[#00539CFF] text-xl font-semibold">{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuContainer;
