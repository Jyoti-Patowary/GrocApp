import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export default function useKeyboardOffsetHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            (event: KeyboardEvent) => {
                setKeyboardHeight(event.endCoordinates?.height || 0);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        const keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            (event: KeyboardEvent) => {
                setKeyboardHeight(event.endCoordinates?.height || 0);
            }
        );

        const keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            () => {
                setKeyboardHeight(0);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    return keyboardHeight;
}
