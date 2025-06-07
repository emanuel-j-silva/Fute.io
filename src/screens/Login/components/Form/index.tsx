import React, { useState, useContext } from "react";
import {View, Alert} from "react-native"
import { StackNavigationProp } from '@react-navigation/stack';
import Input from "../../../../components/Input";
import CustomButton from "../../../../components/CustomButton";
import styles from "./styles";
import NewUserModal from "../NewUserModal";
import { loginApi } from "../../../../services/api/auth";
import { AuthContext } from "../../../../contexts/AuthContext";

type StackParamList = {
    Login: undefined;
    MainTabs: undefined;
  };
  
  type FormProps = {
    navigation: StackNavigationProp<StackParamList, "Login">;
  };

function Form({navigation}: FormProps){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);

  async function handleLogin(){
    //navigation.replace("MainTabs");
    try{
      const {token} = await loginApi({email, password});      
      if(token){
        await login(token);
        navigation.replace("MainTabs");
      }else{
        Alert.alert("Erro", "Token não retornado pela API.");
      }
    }catch(error){
      console.error("Erro durante o login:", error);
      Alert.alert("Erro de autenticação", "Verifique seu email e senha.");
    }
  }

  return(
      <View style={styles.container}>

          <Input icon="email" placeholder="Email" defaultColor="#023e8a" type="email"
          onChangeText={setEmail}/>            
          <Input icon="lock" placeholder="Senha" defaultColor="#023e8a" type="password"
          onChangeText={setPassword} />

          <CustomButton title="Login" onPress={handleLogin} 
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