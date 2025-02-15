import React from "react";
import {Text, View} from "react-native"
import styles from "./styles";

interface Content{
    text: string;
    size?: number;
}

interface InfoCardProps {
    title: string;
    subtitle: string;
    content: Content;
    footer?: string;
    primaryColor?: string;
    secondaryColor?: string;
}

function InfoCard({title, subtitle, content, footer, 
                    primaryColor = "#050517", secondaryColor = "#0077B6"} :InfoCardProps){
    return(
        <View style={styles.container} >
            <Text style={[styles.title, {color: primaryColor}]}>{title}</Text>
            <Text style={[styles.subtitle, {color: primaryColor}]}>{subtitle}</Text>
            <Text style={[ footer ? styles.content : styles.contentWithNoFotter, 
                {color: secondaryColor}, 
                {fontSize: content.size}]}>
                    {content.text}
            </Text>
            {footer && <Text style={[styles.footer, {color: primaryColor}]}>{footer}</Text>}
        </View>
    )
}

export default InfoCard;