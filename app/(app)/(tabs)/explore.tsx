import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function Swaps() {
  return (
    <View className="flex-1 justify-center items-center">
      <MaterialIcons name="swap-horiz" size={80} color="#007AFF" />
      <Text className="text-xl font-semibold mt-4">Swaps</Text>
      <Text className="text-gray-600 mt-2 text-center px-8">
        Exchange items with your friends
      </Text>
    </View>
  );
}
