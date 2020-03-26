import {StyleSheet} from "react-native";

export const pageStyle = StyleSheet.create({
    scrollContainer: {
        // flexGrow: 1,
        flexDirection: 'column',
    },
    scrollContentContainer: {
        paddingTop: 30,
        flexGrow: 1,
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
});

export const cardStyle = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 10,
        marginTop: 5
    },
    container: {
        width: '95%',
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 5,
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
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 10
    }
});

