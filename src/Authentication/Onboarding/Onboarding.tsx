import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useDerivedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { interpolateColor } from 'react-native-redash';
import { useTheme } from '../../components';
import { AuthNavigationProps } from '../../components/Navigation';
import { makeStyles, Theme } from '../../components/Theme';

import Dot from './Dot'
import Slide, { SLIDE_HEIGHT } from './Slide';
import Subslide from "./Subslide"

const { width } = Dimensions.get('window');

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: theme.borderRadii.xl,
    overflow: "hidden"
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: theme.borderRadii.xl,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: theme.borderRadii.xl,
  },
  pagination : {
    ...StyleSheet.absoluteFillObject,
    height: theme.borderRadii.xl,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
}));

interface Slide {
  title: string
  subtitle: string
  description: string
  color: string
  picture: {
    width: number
    height: number
    src: number
  }
}
export const slides: Slide[] = [
  {
    title: 'Movies',
    color: '#BFEAF5',
    subtitle: 'Find Your Outfits',
    description:
      "Confused about your outfits? Don't worry find the best oufit here",
    picture: {
      src: require("../../../assets/1.png"),
      width: 2513,
      height:3583
    }
  },
  {
    title: 'TV Shows',
    color: '#BEECC4',
    subtitle: 'Hear it First, Wear it First',
    description:
      'Hating the clothes in your wardrobe? Explore hundreds of ourfit ideas',
    picture: {
      src: require("../../../assets/2.png"),
      width: 2791,
      height:3744
    }
  },
  {
    title: 'Anime',
    color: '#FFE4D9',
    subtitle: 'Your Style, Your Way',
    description:
      'Create your individuals & unique style and look amazing everyday',
    picture: {
      src: require("../../../assets/3.png"),
      width: 2738,
      height:3244
    }
  },
  {
    title: 'Sneakers',
    color: '#FFDDDD',
    subtitle: 'Look Good, Feel Good',
    description:
      'Discover the best trends in fashion and explore your personality',
    picture: {
      src: require("../../../assets/4.png"),
      width: 1757,
      height:2551
    }
  },
];

export const assets = slides.map((slide) => slide.picture.src)

const Onboarding = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
  const styles = useStyles()
  const theme = useTheme()
  const scroll = useRef<Animated.ScrollView>(null)
  const x = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x
    }
  })
  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value, 
      slides.map((_,i) => i * width),
      slides.map((slide) => slide.color),
    )
  )
  const slider = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }))

  const background = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value
  }))

  const currentIndex = useDerivedValue(() => x.value / width)

  const footerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }]
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, slider]}>
        {slides.map(({ picture }, index) => {
          const style = useAnimatedStyle(() => ({
            opacity: interpolate(
              x.value,
              [(index - 0.5) * width, index * width, (index + 0.5) * width],
              [0, 1, 0],
              Extrapolate.CLAMP
            )
          }))
          return (
            <Animated.View style={[styles.underlay, style]} key={index}>
              <Image
                source={picture.src}
                style={{
                  width: width - theme.borderRadii.xl,
                  height: ((width - theme.borderRadii.xl) * picture.height) / picture.width,
                }}
              />
            </Animated.View>
          )
        })}
       <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {slides.map(({ title, picture }, index) => (
            <Slide key={index} right={!!(index % 2)} {...{ title, picture }} />
          ))}
       </Animated.ScrollView>
      </Animated.View>
      
     <View style={styles.footer}>
      <Animated.View 
        style={[StyleSheet.absoluteFillObject, background]} 
      />
        <View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} currentIndex={currentIndex} {...{ index }}/>
            ))}
          </View>
          <Animated.View
            style={[{
              flex: 1,
              flexDirection: "row",
              width: width * slides.length,
            }, footerStyle]}
          >
            {slides.map(({ subtitle, description }, index) => {
            const last = index === slides.length - 1
            return (
              <Subslide
                key={index}
                onPress={() => {
                  if (last) {
                    navigation.navigate("Welcome")
                  } else {
                    scroll.current?.getNode().scrollTo({
                      x: width * (index + 1),
                      animated: true
                    })
                  }
                }}
                {...{ subtitle, x, description, last }}
              />
            )
            })}
        </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;