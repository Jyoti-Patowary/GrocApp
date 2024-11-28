import {View, StyleSheet, Animated as RNAnimated} from 'react-native';
import React, {FC} from 'react';
import {NoticeHeight} from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

interface NoticeAnimationProps {
  noticePosition: any;
  children: React.ReactElement;
}

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation: FC<NoticeAnimationProps> = ({
  noticePosition,
  children,
}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    position: 'absolute',
    zIndex: 9999,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NoticeAnimation;
