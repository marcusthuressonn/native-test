import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

interface RelatedPhoto {
  id: string;
  imageUrl: string;
  isNew: boolean;
}

// Mock data for all available moments (simulating the grid data)
const generateMockMoments = () => {
  return Array.from({ length: 12 }).map((_, index) => ({
    id: `moment-${index}`,
    author: {
      name: 'Jonatan Jall Jahja',
      avatar: `https://i.pravatar.cc/100?img=${index + 1}`,
    },
    timestamp: `${index + 1}h ago`,
    caption: `"This photo captures something real, confident, calm, and honestly striking. Photo ${index + 1} from the collection."`,
    mainImage: `https://picsum.photos/200/300?random=moment-${index}`,
    tabImage: `https://picsum.photos/100/100?random=tab-${index}`,
    relatedPhotos: Array.from({ length: 8 }).map(
      (_, photoIndex): RelatedPhoto => ({
        id: `related-moment-${index}-${photoIndex}`, // Make IDs globally unique
        imageUrl: `https://picsum.photos/150/150?random=related-moment-${index}-${photoIndex}`,
        isNew: Math.random() > 0.3,
      })
    ),
  }));
};

// Sample data for the detail view - keeping for potential future use
// const getMockMomentDetail = (momentId: string) => {
//   const allMoments = generateMockMoments();
//   const currentMoment = allMoments.find(m => m.id === momentId) || allMoments[0];
//   return currentMoment;
// };

export default function MomentDetail() {
  const { momentId } = useLocalSearchParams<{ momentId: string }>();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  // Generate all moments and find current index
  const allMoments = generateMockMoments();
  const currentMomentIndex =
    allMoments.findIndex((m) => m.id === momentId) || 0;
  const [activeIndex, setActiveIndex] = useState(currentMomentIndex);
  const pagerRef = useRef<PagerView>(null);
  const tabScrollRef = useRef<Animated.ScrollView>(null);

  // Get current moment data based on active index - available for future use
  // const currentMoment = allMoments[activeIndex];

  // Calculate grid dimensions for related photos
  const photosPerRow = 4;
  const photoMargin = 8;
  const photoSize =
    (width - 32 - (photosPerRow - 1) * photoMargin) / photosPerRow;

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const scrollToTab = (index: number) => {
    const tabWidth = 60; // 44px width + 16px margin
    const scrollX = index * tabWidth - width / 2 + tabWidth / 2;
    tabScrollRef.current?.scrollTo({ x: Math.max(0, scrollX), animated: true });
  };

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    pagerRef.current?.setPage(index);
    scrollToTab(index);
  };

  const handlePageChange = (index: number) => {
    setActiveIndex(index);
    scrollToTab(index);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 ">
        {/* Header */}
        <Animated.View
          className="px-4 pt-14 pb-4 bg-white"
          entering={FadeInUp.delay(0).duration(200)}
        >
          {/* Top Navigation */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>

            {/* Conditional Center Content */}
            {selectedPhotos.length > 0 ? (
              // Selection Mode - Show selection count
              <Text className="text-black font-semibold text-lg">
                {selectedPhotos.length} Selected
              </Text>
            ) : (
              // Browse Mode - Show moments tabs
              <Animated.ScrollView
                ref={tabScrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-1 mx-4"
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 4,
                }}
                // entering={FadeIn.delay(25).duration(25)}
              >
                {allMoments.map((moment, index) => (
                  <TouchableOpacity
                    key={moment.id}
                    onPress={() => handleTabPress(index)}
                    className="mx-2"
                  >
                    <Animated.View
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 ${
                        index === activeIndex
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                      //   entering={FadeIn.delay(150 + index * 20).duration(200)}
                    >
                      <Image
                        source={{ uri: moment.tabImage }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </Animated.View>
                  </TouchableOpacity>
                ))}
              </Animated.ScrollView>
            )}
          </View>
        </Animated.View>

        {/* Swipeable Content */}
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={currentMomentIndex}
          onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
          scrollEnabled={selectedPhotos.length === 0} // Disable swiping when in selection mode
        >
          {allMoments.map((moment, momentIndex) => (
            <ScrollView key={moment.id} className="flex-1">
              {/* Content Section */}
              <Animated.View
                className="px-4 mb-4"
                entering={FadeInDown.delay(50).duration(180)}
              >
                {/* User Info */}
                <View className="flex-row items-center mb-3">
                  <Image
                    source={{ uri: moment.author.avatar }}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-black font-semibold text-base">
                      {moment.author.name}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {moment.timestamp}
                    </Text>
                  </View>
                </View>

                {/* Caption */}
                <Text className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {moment.caption}
                </Text>
              </Animated.View>

              {/* Main Image - Hero with Padding */}
              <Animated.View
                className="mx-4 mb-4"
                sharedTransitionTag={
                  momentIndex === currentMomentIndex
                    ? `moment-${momentId}`
                    : undefined
                }
                style={{
                  height: 500,
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <Animated.Image
                  source={{ uri: moment.mainImage }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                />
                {/* New Badge */}
                <Animated.View
                  className="absolute top-3 left-3 bg-blue-600 px-2 py-1 rounded"
                  entering={FadeIn.delay(25).duration(120)}
                >
                  <Text className="text-white text-xs font-medium">New</Text>
                </Animated.View>
              </Animated.View>

              {/* Related Photos Section */}
              <Animated.View
                className="px-4 mb-6"
                entering={FadeInDown.delay(75).duration(160)}
              >
                {/* Section Header */}
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-black text-base font-medium">
                      Photos of you from
                    </Text>
                    <Text className="text-black text-base font-medium">
                      {moment.author.name.split(' ')[0]}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => router.back()}>
                    <Text className="text-gray-500 text-base">Cancel</Text>
                  </TouchableOpacity>
                </View>

                {/* Photos Grid */}
                <Animated.View
                  className="flex-row flex-wrap"
                  entering={FadeInDown.delay(100)
                    .duration(140)
                    .springify()
                    .damping(12)}
                >
                  {moment.relatedPhotos.map((photo, index) => {
                    const isSelected = selectedPhotos.includes(photo.id);
                    return (
                      <Animated.View
                        key={photo.id}
                        entering={FadeIn.delay(120 + index * 15)
                          .duration(100)
                          .springify()
                          .damping(10)}
                        style={{
                          width: photoSize,
                          height: photoSize,
                          marginRight:
                            (index + 1) % photosPerRow === 0 ? 0 : photoMargin,
                          marginBottom: photoMargin,
                        }}
                        pointerEvents="box-none"
                      >
                        <TouchableOpacity
                          style={{ width: '100%', height: '100%' }}
                          onPress={() => togglePhotoSelection(photo.id)}
                          className="relative"
                          activeOpacity={0.8}
                          delayPressIn={0}
                        >
                          <Image
                            source={{ uri: photo.imageUrl }}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                            className="rounded-lg"
                            resizeMode="cover"
                          />

                          {/* New Badge */}
                          {photo.isNew && (
                            <View className="absolute top-2 left-2 bg-blue-600 px-1.5 py-0.5 rounded">
                              <Text className="text-white text-xs font-medium">
                                New
                              </Text>
                            </View>
                          )}

                          {/* Circular Selection Indicator */}
                          <View className="absolute bottom-2 right-2">
                            <View
                              className={`w-6 h-6 rounded-full border-2 ${
                                isSelected
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'bg-transparent border-white'
                              } flex items-center justify-center`}
                            >
                              {isSelected && (
                                <Ionicons
                                  name="checkmark"
                                  size={14}
                                  color="white"
                                />
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Animated.View>
                    );
                  })}
                </Animated.View>
              </Animated.View>

              {/* Bottom Action Buttons */}
              <Animated.View
                className="px-4 py-6"
                entering={FadeInUp.delay(150).duration(200)}
              >
                <View className="flex-row space-x-3">
                  <TouchableOpacity className="flex-1 bg-gray-100 py-4 rounded-full">
                    <Text className="text-center text-black font-semibold text-base">
                      Just Request
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-blue-600 py-4 rounded-full">
                    <Text className="text-center text-white font-semibold text-base">
                      Make an Offer
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* Bottom safe area spacing */}
              <View className="h-8" />
            </ScrollView>
          ))}
        </PagerView>
      </View>
    </SafeAreaView>
  );
}
