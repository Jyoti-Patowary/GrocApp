/* eslint-disable react/react-in-jsx-scope */
import { Colors, Fonts } from '@utils/Constants';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    disabled: boolean;
    loading: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({ onPress, title, disabled, loading }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: disabled ? Colors.disabled : Colors.secondary }]}
            disabled={disabled}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : (
                <CustomText variant="h6" style={styles.text} fontFamily={Fonts.SemiBold} fontSize={12}>
                    {title}
                </CustomText>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CustomButton;
