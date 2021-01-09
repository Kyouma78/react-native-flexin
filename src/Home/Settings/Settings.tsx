import React from 'react'

import { Box, Header } from '../../components'
import Content from '../../components/Content'
import { HomeNavigationProps } from '../../components/Navigation'

import Notification from './Notification'

const Settings = ({ navigation }: HomeNavigationProps<"Settings">) => {
  return (
    <Content>
      <Box backgroundColor="background">
        <Header
          title="Notifications"
          left={{ icon: "menu", onPress: () => navigation.openDrawer() }}
          right={{ icon: "share", onPress: () => true }}
        />
        <Box padding="m">
          <Notification
            title="Outift Ideas"
            description="Receive daily notifications"
          />
          <Notification
            title="Discount & Sales"
            description="Buy the stuff you love for less"
          />
          <Notification
            title="Stock Notifications"
            description="If the product you ♥ comes back in "
          />
          <Notification
            title="New Stuff"
            description="Hear it firt, wear it first"
          />
        </Box>
      </Box>
    </Content>
  )
}

export default Settings