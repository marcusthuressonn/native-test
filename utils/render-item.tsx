import { SlideItem } from '@/components/slide-item';
import { ImageStyle, StyleProp } from 'react-native';
import { CarouselRenderItem } from 'react-native-reanimated-carousel';

interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

export const renderItem = ({
  rounded = false,
  style,
}: Options = {}): CarouselRenderItem<any> => {
  const RenderItemComponent = ({ index }: { index: number }) => (
    <SlideItem key={index} index={index} rounded={rounded} style={style} />
  );
  return RenderItemComponent;
};
