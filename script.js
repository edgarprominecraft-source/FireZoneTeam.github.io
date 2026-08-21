
const sideMenu = document.getElementById('sideMenu');
const burgerBtn = document.getElementById('burgerBtn');
const overlay = document.getElementById('overlay');
const secretLogo = document.getElementById('secretLogo');
const heroSubtitle = document.getElementById('heroSubtitle');

let secretCount = 0;
let secretTimer = null;

burgerBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  overlay.classList.remove('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    overlay.classList.remove('active');
  });
});

function readDatabase() {
  const fallback = {
    team: "Firezone Team",
    socials: { telegram: "https://t.me/Firezone_Team" },
    settings: { heroSubtitle: "Competitive esports organization", leaderCode: "FIREZONE-LEADER-2026" },
    players: [],
    matches: [],
    news: []
  };
  const local = localStorage.getItem('firezoneDB');
  if (local) {
    try { return JSON.parse(local); } catch(e) {}
  }
  return fallback;
}

async function initDB() {
  const local = localStorage.getItem('firezoneDB');
  if (!local) {
    try {
      const res = await fetch('data/database.json');
      const db = await res.json();
      localStorage.setItem('firezoneDB', JSON.stringify(db));
      return db;
    } catch(e) {
      return readDatabase();
    }
  }
  return readDatabase();
}

function avatarHTML(player) {
  if (player.avatar && player.avatar.trim()) {
    return `<img class="avatar" src="${player.avatar}" alt="${player.name}">`;
  }
  const initials = (player.name || 'FZ').slice(0,2);
  return `<div class="avatar avatar-placeholder">${initials}</div>`;
}

function renderPlayers(players) {
  const box = document.getElementById('playersGrid');
  box.innerHTML = '';
  players.forEach(player => {
    box.innerHTML += `
      <article class="player-card">
        <div class="player-visual">
          ${avatarHTML(player)}
          <div>
            <div class="player-name">${player.name || 'PLAYER'}</div>
            <div class="player-role">${player.role || 'ROSTER'}</div>
          </div>
        </div>
        <div class="player-meta">
          <div class="meta-pill">K/D ${player.kd || '-'}</div>
          <div class="meta-pill">${player.time || '-'}</div>
        </div>
        <div class="player-history">${player.history || 'No description yet.'}</div>
      </article>`;
  });
}

function renderMatches(matches) {
  const box = document.getElementById('matchesGrid');
  box.innerHTML = '';
  matches.forEach(match => {
    box.innerHTML += `
      <article class="match-card">
        <div class="match-top">
          <div>
            <div class="match-title">FIREZONE vs ${match.enemy || 'ENEMY'}</div>
            <div class="match-event">${match.event || 'Match'}</div>
          </div>
          <div class="match-score">${match.score || '-'}</div>
        </div>
        <div class="match-result">${match.result || 'RESULT'}</div>
      </article>`;
  });
}

function renderNews(news) {
  const box = document.getElementById('newsGrid');
  box.innerHTML = '';
  news.forEach(item => {
    box.innerHTML += `
      <article class="news-card">
        <h4>${item.title || 'News'}</h4>
        <p>${item.text || ''}</p>
      </article>`;
  });
}

function applySettings(db) {
  if (db.settings?.heroSubtitle) {
    heroSubtitle.textContent = db.settings.heroSubtitle;
  }
  if (db.settings?.siteBackground) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,.66), rgba(0,0,0,.82)), url('${db.settings.siteBackground}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundPosition = 'center';
  }
}

secretLogo.addEventListener('click', () => {
  secretCount++;
  clearTimeout(secretTimer);
  secretTimer = setTimeout(() => secretCount = 0, 2400);

  if (secretCount >= 7) {
    const db = readDatabase();
    const leaderCode = db.settings?.leaderCode || 'FIREZONE-LEADER-2026';
    const code = prompt('Введите код владельца');
    if (code === leaderCode) {
      window.location.href = 'admin/index.html';
    } else {
      alert('Неверный код');
    }
    secretCount = 0;
  }
});

initDB().then(db => {
  renderPlayers(db.players || []);
  renderMatches(db.matches || []);
  renderNews(db.news || []);
  applySettings(db);
});
