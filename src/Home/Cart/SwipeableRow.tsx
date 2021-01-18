import React, { ReactNode } from 'react'
import { Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { snapPoint } from 'react-native-redash'
import { aspectRatio, useTheme } from '../../components/Theme'

interface SwipeableRowProps {
  children: ReactNode
  onDelete: () => void
}

const { width } = Dimensions.get("window")
const finalDestination = width
const snapPoints = [-85 * aspectRatio, 0, finalDestination]

const SwipeableRow = ({ children, onDelete }: SwipeableRowProps) => {
  const theme = useTheme()
  const translateX = useSharedValue(0)
  const onGestureEvent = useAnimatedGestureHandler<{x : number}>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints)
      translateX.value = withSpring(
        dest,
        {
          overshootClamping: true
        },
        () => {
          if (dest === finalDestination) {
            onDelete()
          }
        }
      )
    }
  })
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value}]
  }))
  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  )
}

export default SwipeableRow