import React, { useState } from "react";
import {View} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";
import styles from "./styles";
import NewUserModal from "../NewUserModal";

type StackParamList = {
    Login: undefined;
    MainTabs: undefined;
  };
  
  type FormProps = {
    navigation: StackNavigationProp<StackParamList, "Login">;
  };

function Form({navigation}: FormProps){
  const [modalVisible, setModalVisible] = useState(false);

  return(
      <View style={styles.container}>
          <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"/>            
          <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"/>
          <CustomButton title="Login" onPress={() => navigation.replace("MainTabs")} 
            pressedBackgroundColor="#48cae490"/> 
          <CustomButton title="Criar conta" onPress={()=> setModalVisible(true)}
            pressedBackgroundColor="#48cae490" backgroundColor="transparent"
            paddingHorizontal={20} paddingVertical={15} 
            fontSize={14} fontFamily="FasterOne"/>
          
          <NewUserModal visible={modalVisible} onClose={()=> setModalVisible(false)}/>
      </View>
  );  
}

export default Form;