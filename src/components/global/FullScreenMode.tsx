/* eslint-disable no-bitwise */
import React, {useEffect} from 'react';
import {View, StatusBar, Platform} from 'react-native';

const FullScreenModeWithStatusBar = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setHidden(false);
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');

      const enableImmersiveMode = () => {
        const {UIManager} = require('react-native').NativeModules;
        if (UIManager && UIManager.dispatchViewManagerCommand) {
          UIManager.dispatchViewManagerCommand(null, 'setSystemUiVisibility', [
            0x00000400 | 0x00000200 | 0x00001000,
          ]);
        }
      };

      enableImmersiveMode();
    }
  }, []);

  return <View>{/* Your app content */}</View>;
};

export default FullScreenModeWithStatusBar;
