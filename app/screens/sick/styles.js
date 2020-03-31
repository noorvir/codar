import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const disabledTextColor = 'rgba(204, 204, 204, 0.5)';

export {
    disabledTextColor,
}

export const pageStyle = StyleSheet.create({
    scrollContainer: {
        // flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'space-between'
    },
});

export const cardStyle = StyleSheet.create({
    card: {
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
        paddingBottom: 25,
        shadowColor: Colors.allGoodGreen,
        shadowRadius: 1,
    },
    container: {
        width: '95%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 0,
    },
    checkBoxContainer: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    textContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
});

export const buttonStyle = StyleSheet.create({
    buttonContainer: {
        flexShrink: 1,
        bottom: 0,
        left: 0,
        right: 0,
        width: '90%',
        height: '15%',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: '#0070e3',
        width: '100%',
        borderRadius: 25,
        margin: 0,
        padding: 12
    }

});

