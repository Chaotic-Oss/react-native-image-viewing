import { jsx as _jsx } from "react/jsx-runtime";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 };
const ImageDefaultHeader = ({ onRequestClose }) => (_jsx(SafeAreaView, { style: styles.root, children: _jsx(TouchableOpacity, { style: styles.closeButton, onPress: onRequestClose, hitSlop: HIT_SLOP, children: _jsx(Text, { style: styles.closeText, children: "\u2715" }) }) }));
const styles = StyleSheet.create({
    root: {
        alignItems: "flex-end",
    },
    closeButton: {
        marginRight: 8,
        marginTop: 8,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: "#00000077",
    },
    closeText: {
        lineHeight: 22,
        fontSize: 19,
        textAlign: "center",
        color: "#FFF",
        includeFontPadding: false,
    },
});
export default ImageDefaultHeader;
