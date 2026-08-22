
import {supabase} from "../supabase/client.js";

async function loadPlayers(){
 const {data}=await supabase.from("players").select("*");
 players.innerHTML=(data||[]).map(p=>`
 <div class="card">
 ${p.nickname}<br>
 ${p.role||""} ${p.kd||""}
 <button onclick="removePlayer(${p.id})">Удалить</button>
 </div>`).join("");
}

window.addPlayer=async()=>{
 await supabase.from("players").insert({
 nickname:playerName.value,
 role:playerRole.value,
 kd:playerKd.value,
 description:playerDesc.value
 });
 loadPlayers();
}

window.removePlayer=async(id)=>{
 await supabase.from("players").delete().eq("id",id);
 loadPlayers();
}

window.addNews=async()=>{
 await supabase.from("news").insert({
 title:newsTitle.value,
 body:newsBody.value
 });
 alert("Новость добавлена");
}

loadPlayers();
