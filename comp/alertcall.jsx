import react from "react";
import { Alert, text } from "react-native";

const _Alert = (props) => {
    return (
        Alert.alert(
            "Calling " + props.text,
            "Are you sure you want to call " + props.text + "?",

            [
                {
                    text: "Yes",    
                },
                {
                    text: "No",
                    style: "cancel"
                }
            ]
        )
    )
}

export default _Alert;