import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function Camera() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Ionicons name="camera" size={80} color="white" />
      <Text className="text-white text-xl font-semibold mt-4">Camera</Text>
      <Text className="text-gray-300 mt-2 text-center px-8">
        Capture and share your moments
      </Text>
    </View>
  );
}
