/* eslint-disable react/react-in-jsx-scope */
import { hocStyles } from '@styles/GlobalStyles';
import { FC, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

interface CartAnimationWrapperProps{
    cartCount: number;
    children: React.ReactNode;
}

const CartAnimationWrapper: FC<CartAnimationWrapperProps> = ({ cartCount, children }) => {

    const slideAnimation = useRef(new Animated.Value(0)).current;

    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() =>{
        if(cartCount > 0 && !hasAnimated){
            Animated.timing(slideAnimation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(()=> {
                setHasAnimated(true);
            });
        }else if(cartCount === 0 && hasAnimated){
            Animated.timing(slideAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(()=> {
                setHasAnimated(false);
            });
        }
    }, [cartCount, hasAnimated, slideAnimation]);

    const slideUpStyle = {
        transform : [
           {translateY: slideAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [100, 0],
           })},
        ],
        opacity: slideAnimation,
    };
    return (
        <Animated.View style={[hocStyles.cartContainer, slideUpStyle]}>
            {children}
        </Animated.View>
    );
};


export default CartAnimationWrapper;
