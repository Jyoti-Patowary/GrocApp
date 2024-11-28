/* eslint-disable react-native/no-inline-styles */
import { View, StyleSheet, SafeAreaView } from 'react-native';
import React, { FC } from 'react';
import { NoticeHeight } from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import Svg, { Defs, G, Path, Use } from 'react-native-svg';
import { wavyData } from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
            <SafeAreaView style={{padding: 8}}>
                <CustomText style={styles.heading} variant="h8" fontFamily={Fonts.SemiBold}>
                    It's raining near your location
                </CustomText>
                <CustomText style={styles.subHeading} variant="h9">
                    Our delivery partner may take a few minutes to deliver your package
                </CustomText>
            </SafeAreaView>
        </View>
      </View>

     <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
     >
        <Defs>
            <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
            <Use href="#wavepath" y="321" />
        </G>
     </Svg>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CCD5E4',
    },
    noticeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCD5E4',
        // paddingVertical: 8,
        // paddingTop: 50,
    },
    heading: {
        color: '#2D3875',
        marginBottom: 8,
        textAlign: 'center',
    },
    subHeading: {
        marginBottom: 8,
        textAlign: 'center',
        fontSize: 10,
    },
    wave: {
        transform: [{rotateX:'180deg'}],
        width: '100%',
    },
});

export default Notice;
