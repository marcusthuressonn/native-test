// import ParalaxCarousel from '@/components/paralax-carousel';
import ParalaxCarousel from '@/components/paralax-carousel';
import { Text } from '@/components/ui/text';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { TabBar, TabView } from 'react-native-tab-view';

// Type definitions
interface GridItem {
  id: string;
  title: string;
  height: number;
  span: number; // Number of columns this item should span
  imageUrl: string;
  originalWidth: number;
  originalHeight: number;
}

// Predefined image dimensions for variety
const imageDimensions = [
  { width: 200, height: 300 }, // 2:3 ratio
  { width: 300, height: 200 }, // 3:2 ratio
  { width: 200, height: 250 }, // 4:5 ratio
  { width: 250, height: 200 }, // 5:4 ratio
  { width: 200, height: 200 }, // 1:1 ratio
  { width: 180, height: 320 }, // 9:16 ratio
  { width: 320, height: 180 }, // 16:9 ratio
  { width: 240, height: 300 }, // 4:5 ratio
  { width: 300, height: 240 }, // 5:4 ratio
  { width: 220, height: 280 }, // 11:14 ratio
];

// Generate sample data with predefined dimensions
const generateData = (category: string) => {
  return Array.from({ length: 100 }).map((_, index): GridItem => {
    const dimensions = imageDimensions[index % imageDimensions.length];
    return {
      id: `${category}-${index}`,
      title: `${category} ${index + 1}`,
      height: 200, // Will be calculated based on dimensions
      span: 1,
      imageUrl: `https://picsum.photos/${dimensions.width}/${dimensions.height}?random=${category}-${index}`,
      originalWidth: dimensions.width,
      originalHeight: dimensions.height,
    };
  });
};

// Initial data for each tab (will be updated with calculated heights)
const initialMomentsData = generateData('moment');
const initialDeckData = generateData('deck');
const initialVaultData = generateData('vault');

// Scene components for each tab
const MomentsRoute = ({ data }: { data: GridItem[] }) => {
  const router = useRouter();

  return (
    <FlashList
      data={data}
      masonry
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 16,
      }}
      overrideItemLayout={(layout, item) => {
        layout.span = item.span;
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push(`/(app)/moment-detail?momentId=${item.id}`)
          }
          className="mb-2 shadow-sm m-1"
          style={{
            height: item.height,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#e0e7ff',
            }}
            sharedTransitionTag={`moment-${item.id}`}
          >
            <Animated.Image
              source={{ uri: item.imageUrl }}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          </Animated.View>
          <View className="absolute bottom-2 left-2 bg-purple-600 px-2 py-1 rounded">
            <Text className="text-white text-xs font-medium">Moment</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const DeckRoute = ({ data }: { data: GridItem[] }) => {
  const router = useRouter();

  return (
    <FlashList
      data={data}
      masonry
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 16,
      }}
      overrideItemLayout={(layout, item) => {
        layout.span = item.span;
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push(`/(app)/moment-detail?momentId=${item.id}`)
          }
          className="mb-2 shadow-sm m-1"
          style={{
            height: item.height,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#dbeafe',
            }}
            sharedTransitionTag={`moment-${item.id}`}
          >
            <Animated.Image
              source={{ uri: item.imageUrl }}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          </Animated.View>
          <View className="absolute bottom-2 left-2 bg-blue-600 px-2 py-1 rounded">
            <Text className="text-white text-xs font-medium">Deck</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const VaultRoute = ({ data }: { data: GridItem[] }) => {
  const router = useRouter();

  return (
    <FlashList
      data={data}
      masonry
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: 120,
        paddingTop: 16,
      }}
      overrideItemLayout={(layout, item) => {
        layout.span = item.span;
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push(`/(app)/moment-detail?momentId=${item.id}`)
          }
          className="mb-2 shadow-sm m-1"
          style={{
            height: item.height,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#dcfce7',
            }}
            sharedTransitionTag={`moment-${item.id}`}
          >
            <Animated.Image
              source={{ uri: item.imageUrl }}
              style={{ flex: 1 }}
              resizeMode="cover"
            />
          </Animated.View>
          <View className="absolute bottom-2 left-2 bg-green-600 px-2 py-1 rounded">
            <Text className="text-white text-xs font-medium">Vault</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

// We'll define renderScene inside the Dashboard component to access state
export default function Dashboard() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1); // Start with Deck tab (index 1)

  // State for data with calculated heights
  const [momentsData, setMomentsData] =
    useState<GridItem[]>(initialMomentsData);
  const [deckData, setDeckData] = useState<GridItem[]>(initialDeckData);
  const [vaultData, setVaultData] = useState<GridItem[]>(initialVaultData);

  // Item width for calculating scaled height (half screen width minus padding)
  const ITEM_WIDTH = (layout.width - 32) / 2; // 32 for padding/margins

  useEffect(() => {
    const calculateImageSizes = (
      data: GridItem[],
      setData: (data: GridItem[]) => void
    ) => {
      const updatedData = data.map((item) => {
        const scaledHeight =
          (item.originalHeight / item.originalWidth) * ITEM_WIDTH;
        return { ...item, height: scaledHeight };
      });
      setData(updatedData);
    };

    // Calculate sizes for all tabs
    calculateImageSizes(initialMomentsData, setMomentsData);
    calculateImageSizes(initialDeckData, setDeckData);
    calculateImageSizes(initialVaultData, setVaultData);
  }, [ITEM_WIDTH]);

  const routes = [
    { key: 'moments', title: 'Moments' },
    { key: 'deck', title: 'Deck' },
    { key: 'vault', title: 'Vault' },
  ];

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'moments':
        return <MomentsRoute data={momentsData} />;
      case 'deck':
        return <DeckRoute data={deckData} />;
      case 'vault':
        return <VaultRoute data={vaultData} />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#000',
        height: 2,
        borderRadius: 1.5,
      }}
      style={{
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
      }}
      labelStyle={{
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'none',
      }}
      activeColor="#000"
      inactiveColor="#666"
      tabStyle={{
        flex: 1,
      }}
      scrollEnabled={false}
    />
  );

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-14 pb-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800 mb-2">You</Text>
        <Text className="text-gray-600">
          Your personal moments and memories
        </Text>
      </View>
      <ParalaxCarousel />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={{ flex: 1 }}
      />
    </View>
  );
}
