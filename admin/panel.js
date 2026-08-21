
function getDB(){
  const raw = localStorage.getItem('firezoneDB');
  return raw ? JSON.parse(raw) : {
    team:"Firezone Team",
    settings:{heroSubtitle:"Competitive esports organization",telegram:"https://t.me/Firezone_Team",leaderCode:"FIREZONE-LEADER-2026",siteBackground:""},
    players:[],matches:[],news:[]
  };
}
function saveDB(db){
  localStorage.setItem('firezoneDB', JSON.stringify(db));
}
function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    if(!file){ resolve(""); return; }
    const reader = new FileReader();
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const db = getDB();
document.getElementById('heroText').value = db.settings?.heroSubtitle || '';
document.getElementById('telegramLink').value = db.socials?.telegram || '';
document.getElementById('leaderCode').value = db.settings?.leaderCode || 'FIREZONE-LEADER-2026';

document.getElementById('addPlayerBtn').addEventListener('click', async ()=>{
  const avatarFile = document.getElementById('playerAvatar').files[0];
  const avatar = await fileToDataURL(avatarFile);

  db.players.push({
    name: document.getElementById('playerName').value || 'PLAYER',
    role: document.getElementById('playerRole').value || 'ROLE',
    kd: document.getElementById('playerKd').value || '-',
    time: document.getElementById('playerTime').value || '-',
    history: document.getElementById('playerHistory').value || '',
    avatar
  });
  saveDB(db);
  alert('Игрок сохранен');
});

document.getElementById('addNewsBtn').addEventListener('click', ()=>{
  db.news.unshift({
    title: document.getElementById('newsTitle').value || 'News',
    text: document.getElementById('newsText').value || ''
  });
  saveDB(db);
  alert('Новость сохранена');
});

document.getElementById('addMatchBtn').addEventListener('click', ()=>{
  db.matches.unshift({
    enemy: document.getElementById('matchEnemy').value || 'ENEMY',
    score: document.getElementById('matchScore').value || '-',
    result: document.getElementById('matchResult').value || 'RESULT',
    event: document.getElementById('matchEvent').value || 'Match'
  });
  saveDB(db);
  alert('Матч сохранен');
});

document.getElementById('saveSettingsBtn').addEventListener('click', async ()=>{
  const bgFile = document.getElementById('siteBackground').files[0];
  if(!db.settings){ db.settings = {}; }
  if(!db.socials){ db.socials = {}; }

  db.settings.heroSubtitle = document.getElementById('heroText').value || 'Competitive esports organization';
  db.socials.telegram = document.getElementById('telegramLink').value || 'https://t.me/Firezone_Team';
  db.settings.leaderCode = document.getElementById('leaderCode').value || 'FIREZONE-LEADER-2026';
  if(bgFile){
    db.settings.siteBackground = await fileToDataURL(bgFile);
  }
  saveDB(db);
  alert('Настройки сохранены');
});
