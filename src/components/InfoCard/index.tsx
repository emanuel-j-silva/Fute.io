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
    defaultColor?: string;
}

function InfoCard({title, subtitle, content, footer, defaultColor = "#050517"} :InfoCardProps){
    return(
        <View style={styles.container} >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={[styles.content, {color: defaultColor}, 
                {fontSize: content.size}]}>{content.text}
            </Text>
            <Text style={styles.footer}>{footer}</Text>
        </View>
    )
}