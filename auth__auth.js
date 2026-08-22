
import { supabase } from "../supabase/client.js";

window.register = async function(){
 const nickname = regNick.value.trim();
 const login = regUser.value.trim();
 const password = regPass.value;

 if(!login || !password || !nickname) return msg.textContent="Заполните поля";

 const {error}=await supabase.from("profiles").insert({
   nickname,
   login,
   password,
   role:"USER",
   confirmed:false
 });

 msg.textContent = error ? error.message : "Создано. Ожидайте подтверждения";
}

window.login = async function(){
 const login=loginUser.value.trim();
 const password=loginPass.value;

 const {data,error}=await supabase
 .from("profiles")
 .select("*")
 .eq("login",login)
 .eq("password",password)
 .single();

 if(error || !data) return msg.textContent="Неверный логин или пароль";
 if(!data.confirmed) return msg.textContent="Аккаунт ожидает подтверждения";

 localStorage.firezoneUser=JSON.stringify(data);
 location.href="../admin/dashboard.html";
}
