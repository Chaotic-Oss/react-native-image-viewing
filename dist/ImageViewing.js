import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Copyright (c) JOB TODAY S.A. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useCallback, useRef, useEffect } from "react";
import { Animated, Dimensions, StyleSheet, View, VirtualizedList, Modal } from "react-native";
import ImageItem from "./components/ImageItem/ImageItem";
import ImageDefaultHeader from "./components/ImageDefaultHeader";
import StatusBarManager from "./components/StatusBarManager";
import useAnimatedComponents from "./hooks/useAnimatedComponents";
import useImageIndexChange from "./hooks/useImageIndexChange";
import useRequestClose from "./hooks/useRequestClose";
const DEFAULT_ANIMATION_TYPE = "fade";
const DEFAULT_BG_COLOR = "#000";
const DEFAULT_DELAY_LONG_PRESS = 800;
const SCREEN = Dimensions.get("screen");
const SCREEN_WIDTH = SCREEN.width;
function ImageViewing({ images, keyExtractor, imageIndex, visible, onRequestClose, onLongPress = () => { }, onImageIndexChange, animationType = DEFAULT_ANIMATION_TYPE, backgroundColor = DEFAULT_BG_COLOR, presentationStyle, swipeToCloseEnabled, doubleTapToZoomEnabled, delayLongPress = DEFAULT_DELAY_LONG_PRESS, HeaderComponent, FooterComponent, }) {
    const imageList = useRef(null);
    const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
    const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, SCREEN);
    const [headerTransform, footerTransform, toggleBarsVisible] = useAnimatedComponents();
    useEffect(() => {
        if (onImageIndexChange) {
            onImageIndexChange(currentImageIndex);
        }
    }, [currentImageIndex]);
    const onZoom = useCallback((isScaled) => {
        // @ts-ignore
        imageList?.current?.setNativeProps({ scrollEnabled: !isScaled });
        toggleBarsVisible(!isScaled);
    }, [imageList]);
    return (_jsxs(Modal, { transparent: presentationStyle === "overFullScreen", visible: visible, presentationStyle: presentationStyle, animationType: animationType, onRequestClose: onRequestCloseEnhanced, supportedOrientations: ["portrait"], hardwareAccelerated: true, children: [_jsx(StatusBarManager, { presentationStyle: presentationStyle }), _jsxs(View, { style: [styles.container, { opacity, backgroundColor }], children: [_jsx(Animated.View, { style: [styles.header, { transform: headerTransform }], children: typeof HeaderComponent !== "undefined" ? (React.createElement(HeaderComponent, {
                            imageIndex: currentImageIndex,
                        })) : (_jsx(ImageDefaultHeader, { onRequestClose: onRequestCloseEnhanced })) }), _jsx(VirtualizedList, { ref: imageList, data: images, horizontal: true, pagingEnabled: true, windowSize: 2, initialNumToRender: 1, maxToRenderPerBatch: 1, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, initialScrollIndex: imageIndex, getItem: (_item, index) => images[index], getItemCount: () => images.length, getItemLayout: (_, index) => ({
                            length: SCREEN_WIDTH,
                            offset: SCREEN_WIDTH * index,
                            index,
                        }), renderItem: ({ item }) => (_jsx(ImageItem, { onZoom: onZoom, imageSrc: item, onRequestClose: onRequestCloseEnhanced, onLongPress: onLongPress, delayLongPress: delayLongPress, swipeToCloseEnabled: swipeToCloseEnabled, doubleTapToZoomEnabled: doubleTapToZoomEnabled })), onMomentumScrollEnd: onScroll, keyExtractor: (item, index) => {
                            return keyExtractor
                                ? keyExtractor(item, index)
                                : typeof item === "number"
                                    ? `${item}`
                                    : item.uri;
                        } }), typeof FooterComponent !== "undefined" && (_jsx(Animated.View, { style: [styles.footer, { transform: footerTransform }], children: React.createElement(FooterComponent, {
                            imageIndex: currentImageIndex,
                        }) }))] })] }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        top: 0,
    },
    footer: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
        bottom: 0,
    },
});
const EnhancedImageViewing = (props) => (_jsx(ImageViewing, { ...props }, props.imageIndex));
export default EnhancedImageViewing;
