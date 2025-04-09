import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'JWT_TOKEN';

export async function setToken(token: string): Promise<void>{
    try{
       await AsyncStorage.setItem(TOKEN_KEY, token);
    }catch(error){
        console.error(`Erro ao salvar o token ${token}: `, error);
    }
};

export async function getToken(): Promise<string | null>{
    try{
       return await AsyncStorage.getItem(TOKEN_KEY);
    }catch(error){
        console.error(`Erro ao buscar o token: `, error);
        return null;
    }
};

export async function removeToken(): Promise<void>{
    try{
        await AsyncStorage.removeItem(TOKEN_KEY);
    }catch(error){
        console.error("Erro ao apagar token: ", error)
    }
}