import { supabase } from "./supabaseClient";

export async function logIn(email, password){
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        throw error;
    }
    return data;
}

export async function VerifyLogIn(){
    const { data, error } = await supabase.auth.refreshSession()
    if(data.length > 0){
        console.log("DATA:", data);
        return 1;
    }
    console.log("DATA00:", error);
    return 0;
}
