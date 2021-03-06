import React from 'react'
import { Dimensions, View } from 'react-native'
import moment from 'moment'

import { Box, useTheme } from '../../../components'
import { Theme } from '../../../components/Theme'
import Underlay, { MARGIN } from './Underlay'
import { lerp } from './Scale'
import Animated, { divide, multiply, sub } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/native'
import { useTiming } from 'react-native-redash'

const { width: wWidth } = Dimensions.get("window")
const aspectRatio = 195 / 305
const AnimatedBox = Animated.createAnimatedComponent(Box)

export interface DataPoint {
  date: number;
  value: number;
  color: keyof Theme["colors"];
  id: number;
}

interface GraphProps {
  data: DataPoint[]
  startDate: number
  numberOfMonths: number
}

const Graph = ({ data, startDate, numberOfMonths }: GraphProps) => {
  const isFocused = useIsFocused()
  const transition = useTiming(isFocused, { duration: 650})
  const theme = useTheme()
  const canvasWidth = wWidth - theme.spacing.m * 2
  const canvasHeight = canvasWidth * aspectRatio
  const width = canvasWidth - theme.spacing[MARGIN]
  const height = canvasHeight - theme.spacing[MARGIN]
  const step = width / numberOfMonths
  const values = data.map(p => p.value)
  const minY = Math.min(...values)
  const maxY = Math.max(...values)

  return (
    <Box marginTop="xl" paddingBottom={MARGIN} paddingLeft={MARGIN}>
      <Underlay
        minY={minY}
        maxY={maxY}
        startDate={startDate}
        numberOfMonths={numberOfMonths}
        step={step}
      />
      <View style={{ width, height, overflow: "hidden" }}>
      { 
      data.map((point) => {
        const i = Math.round(
          moment
            .duration(moment(point.date).diff(startDate))
            .asMonths()
        )
        const totalHeight = lerp(0, height, point.value / maxY)
        const currentHeight = multiply(totalHeight, transition.value)
        const translateY = divide(sub(totalHeight, currentHeight), 2)
        // const i = new Date(point.date - startDate).getMonth()
        return (
          <AnimatedBox
            key={point.id}
            position="absolute"
            left={i * step}
            bottom={0}
            width={step}
            height={lerp(0, height, point.value / maxY)}
            // style={{ transform: [ { translateY }, {scaleY: transition } ] }}
          >
            <Box
              backgroundColor={point.color}
              position="absolute"
              opacity={0.1}
              top={0}
              bottom={0}
              borderTopLeftRadius="m"
              borderTopRightRadius="m"
              left={theme.spacing.m}
              right={theme.spacing.m}
            />
            <Box
              backgroundColor={point.color}
              position="absolute"
              top={0}
              height={32}
              left={theme.spacing.m}
              right={theme.spacing.m}
              borderRadius="m"
            />
          </AnimatedBox>
        )
      })}
      </View>
    </Box>
  )
}

export default Graph
