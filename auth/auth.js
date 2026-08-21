
import {SUPABASE_URL,SUPABASE_ANON_KEY} from "../supabase/config.js";

const API = SUPABASE_URL + "/rest/v1/users";

async function register(){
 const login=document.getElementById("regUser").value;
 const password=document.getElementById("regPass").value;
 const nickname=document.getElementById("regNick").value;

 await fetch(API,{
  method:"POST",
  headers:{
   "apikey":SUPABASE_ANON_KEY,
   "Authorization":"Bearer "+SUPABASE_ANON_KEY,
   "Content-Type":"application/json"
  },
  body:JSON.stringify({login,password,nickname})
 });
 alert("Аккаунт создан. Ожидайте подтверждения.");
}

async function login(){
 const login=document.getElementById("loginUser").value;
 const password=document.getElementById("loginPass").value;

 const r=await fetch(API+"?login=eq."+login+"&password=eq."+password,{
  headers:{
   "apikey":SUPABASE_ANON_KEY,
   "Authorization":"Bearer "+SUPABASE_ANON_KEY
  }
 });

 const data=await r.json();

 if(data.length && data[0].confirmed){
   localStorage.firezoneUser=JSON.stringify(data[0]);
   location.href="../admin/dashboard.html";
 }else{
   alert("Нет доступа или аккаунт не подтвержден");
 }
}

window.register=register;
window.login=login;
