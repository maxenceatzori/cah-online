import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const BLACK_CARDS = [
  { text: "In M. Night Shyamalan's new film, Bruce Willis discovers that ___ had been dead the whole time.", pick: 1 },
  { text: "What's the next Happy Meal toy?", pick: 1 },
  { text: "What did I bring back from Mexico?", pick: 1 },
  { text: "What's that smell?", pick: 1 },
  { text: "What ended my last relationship?", pick: 1 },
  { text: "What's there a ton of in heaven?", pick: 1 },
  { text: "What does Dick Cheney prefer?", pick: 1 },
  { text: "What gave me a boner at the worst possible time?", pick: 1 },
  { text: "I don't know what ___ is, but I think it's getting worse.", pick: 1 },
  { text: "What's the most emo?", pick: 1 },
  { text: "What's wrong with America?", pick: 1 },
  { text: "What will always get you laid?", pick: 1 },
  { text: "What is Batman's guilty pleasure?", pick: 1 },
  { text: "What do old people smell like?", pick: 1 },
  { text: "Why can't I sleep at night?", pick: 1 },
  { text: "What's that sound?", pick: 1 },
  { text: "White people like ___.", pick: 1 },
  { text: "What helps Obama unwind?", pick: 1 },
  { text: "This is the way the world ends. Not with a bang but with ___.", pick: 1 },
  { text: "During sex, I like to think about ___.", pick: 1 },
  { text: "Why am I sticky?", pick: 1 },
  { text: "What makes life worth living?", pick: 1 },
  { text: "I'm no doctor, but I think the problem is ___.", pick: 1 },
  { text: "In his new one-man show, Kanye West talks about ___.", pick: 1 },
  { text: "What's the next hot fashion trend?", pick: 1 },
  { text: "What would grandma find disturbing, yet oddly charming?", pick: 1 },
  { text: "What are my parents hiding from me?", pick: 1 },
  { text: "What is Oprah's greatest skill?", pick: 1 },
  { text: "What don't you want to find in your Chinese food?", pick: 1 },
  { text: "Turns out, ___ is a gateway drug.", pick: 1 },
  { text: "When I'm sad, ___ cheers me up.", pick: 1 },
  { text: "My plan to fix the economy involves ___.", pick: 1 },
  { text: "What brought the orgy to a grinding halt?", pick: 1 },
  { text: "What's my secret power?", pick: 1 },
  { text: "What did Vin Diesel eat for breakfast?", pick: 1 },
  { text: "In return for my soul, the Devil offered me ___.", pick: 1 },
  { text: "What is Donald Trump's secret weapon?", pick: 1 },
  { text: "What's my anti-drug?", pick: 1 },
  { text: "What will finally bring peace to the Middle East?", pick: 1 },
  { text: "___ : Kid-tested, mother-approved.", pick: 1 },
  { text: "___ : Good to the last drop.", pick: 1 },
  { text: "I drink to forget ___.", pick: 1 },
  { text: "I got 99 problems but ___ ain't one.", pick: 1 },
  { text: "TSA guidelines now prohibit ___ on airplanes.", pick: 1 },
  { text: "What don't you want to find in a rented hotel room?", pick: 1 },
  { text: "What is the next thing scientists need to invent?", pick: 1 },
  { text: "What is always a terrible idea?", pick: 1 },
  { text: "What's the gift that keeps on giving?", pick: 1 },
  { text: "During Thanksgiving, Grandma got drunk and told me about ___.", pick: 1 },
  { text: "Introducing the all-new ___ from Apple!", pick: 1 },
  { text: "What's Teach for America good practice for?", pick: 1 },
  { text: "What is the new hot thing in retirement homes?", pick: 1 },
  { text: "When Pharaoh remained unmoved, Moses called down a plague of ___.", pick: 1 },
  { text: "What do I get every Valentine's Day?", pick: 1 },
  { text: "What do my parents do for fun?", pick: 1 },
  { text: "What am I giving up for Lent?", pick: 1 },
  { text: "What's that one thing about me that keeps getting bigger?", pick: 1 },
  { text: "What's making things awkward in the bedroom?", pick: 1 },
  { text: "Why do I hurt all over?", pick: 1 },
  { text: "In a world ravaged by ___, our only solace is ___.", pick: 2 },
  { text: "During Passover, Jews must avoid ___ and ___.", pick: 2 },
  { text: "Lifetime presents ___, the story of ___.", pick: 2 },
  { text: "Make a haiku.", pick: 3 },
  { text: "And the Academy Award for ___ goes to ___.", pick: 2 },
  { text: "Come to think of it, ___ looks like ___.", pick: 2 },
  { text: "For my next trick, I will pull ___ out of ___.", pick: 2 },
];

const WHITE_CARDS = [
  "The KKK.", "Bitches.", "Being on fire.", "Daddy issues.",
  "The gays.", "Getting drunk on a Tuesday.", "A disappointing birthday party.",
  "A shart.", "BATMAN!!!", "Racism.", "Abstinence.", "The Hamburglar.",
  "Her Majesty, Queen Elizabeth II.", "Auto-cannibalism.", "Kids with ass cancer.",
  "Eating an entire pizza by yourself.", "An erection that lasts longer than 4 hours.",
  "Genghis Khan.", "Fisting.", "A micropenis.", "Science.", "Explosions.",
  "Vehicular manslaughter.", "A disappointing sexual experience.", "Surprise sex!",
  "Dead babies.", "A sassy black woman.", "The French.", "Helpless animals.",
  "Natural male enhancement.", "Jailbait.", "The milk man.", "Being a 'people person'.",
  "Two midgets shitting in a bucket.", "Preteens.", "Getting super high.", "Pac-Man uncontrollably guzzling cum.",
  "Hunting accidents.", "A time machine.", "The Holocaust.", "World of Warcraft.",
  "Grandma.", "The Pope.", "Poor people.", "A homoerotic volleyball montage.",
  "Vigorous jazz hands.", "Fancy outfits.", "Not giving a shit about the Third World.",
  "Making a citizen's arrest.", "Oversized sunglasses.", "A sassy black man.", "Roofies.",
  "The invisible hand.", "Swedish-style torture.", "Glenn Beck being harried by a swarm of buzzards.",
  "My sex life.", "An Oedipus complex.", "African children.", "Human rights violations.",
  "Hormone injections.", "Bees?", "The shambling corpse of Larry King.", "Prisons.",
  "Old-people smell.", "The entire Mormon Tabernacle Choir.", "Cuddling.", "A really well-done BJ.",
  "Explosions.", "Getting naked and watching Nickelodeon.", "Vigorous self-abuse.", "The token minority.",
  "Smallpox blankets.", "An M. Night Shyamalan plot twist.", "Dead parents.", "The war on terror.",
  "Erectile dysfunction.", "A PowerPoint presentation.", "Keanu Reeves.", "Me time.",
  "Pretending to care.", "Genital Jousting.", "The Queen's English.", "Nipple blades.",
  "Uninvited backrubs.", "Sneezing, farting, and coming at the same time.", "Being marginalized.",
  "Child beauty pageants.", "A clandestine butt scratch.", "Michelle Obama's arms.",
  "Ennui.", "Licking things to claim them as your own.", "Glenn Beck.",
  "Repression.", "Firing a rifle into the air while yelling.", "A mid-life crisis.",
  "Slapping a fish on the table.", "Pooping back and forth.", "A soulful rendition of 'Make It Work'.",
  "Tiger Woods.", "My relationship with Jesus.", "Balls.", "The Spice Girls.",
  "A falcon with a cap on its head.", "Frolicking.", "A tiny horse.", "An 80-year-old woman.",
  "Dying.", "Charisma.", "Bunk-bed sex.", "The Devil's taint.", "Being super pretty.",
  "Doing the right thing.", "Sounding like a retard.", "Seeing a dog on a skateboard.",
  "Binge drinking.", "A butt plug.", "Eating the last piece without asking.",
  "Assless chaps.", "Taft.", "The miracle of childbirth.", "Chris Brown.",
  "A really sassy attitude.", "Flightless birds.", "A gentle caress of the inner thigh.",
  "Eating all of the cookies before the bake sale.", "Crystal meth.", "Tumors.",
  "Passive-aggressiveness.", "Fiery poops.", "Skeletons.", "Blowing up.", "Bling.",
  "Natural lubrication.", "Vladimir Putin.", "Prancing.", "A kitten.", "Puppies!",
  "Old people who smell like potato chips.", "Mutual assured destruction.", "The Ku Klux Klan.",
  "Drinking alone.", "Spectacular abs.", "Making the right choices.",
  "Getting so angry that you just start punching things.", "A bald spot.", "The church.",
  "Sean Connery.", "The American Dream.", "Catapults.", "A dog in a party hat.",
  "An oversized helping of potato salad.", "Jumping out of a birthday cake.", "Nicolas Cage.",
  "A stable of exotic animals.", "Erectile dysfunction.", "Leprechauns.", "Scientology.",
  "Not wearing pants.", "Count Chocula.", "Winking and finger guns.", "Sex with Patrick Stewart.",
  "Ric Flair.", "Throwing a virgin into a volcano.", "A monkey riding a dog.",
  "Drugs.", "A big black man.", "Reading out loud from your journal.",
  "Old-fashioned values.", "Screaming.", "Masturbating into a pool drain.",
  "A cheeseburger with no cheese.", "Wearing a skin suit.", "A hot mess.",
  "Authentic Mexican cuisine.", "Knowing what a clitoris is.", "Actually taking the time to listen.",
  "Dropping a chandelier on your enemies and riding the rope up.", "German dungeon porn.",
  "Overpowering your rape whistle.", "Racism.", "Flesh-eating bacteria.", "A sassy gay friend.",
  "The Big Bang.", "Velociraptors.", "A bleached asshole.", "Crippling debt.",
  "A windmill full of corpses.", "Riding off into the sunset.", "The hard sell.",
  "Being fat and happy.", "Uninterrupted eye contact.", "An aggressive lifestyle.",
  "Women in yogurt commercials.", "The Rapture.", "A sad handjob.", "Baking cookies.",
  "Dying alone.", "Home surgery.", "A 3000-year-old troll who has come to destroy all who displease him.",
  "A robust 401(k).", "A talkative cabdriver.", "Throwing the elderly into a volcano.",
  "The look on his face.", "Getting confused and going to the wrong address.",
  "A bag of money with a dollar sign on it.", "A shit tornado.", "The Moon.",
  "Brunch.", "A ball of lint.", "Exactly what you'd expect.", "Sportsmanship.",
  "Land mines.", "A prescription for pain killers.", "The terrorists.", "Menstrual rage.",
  "The clitoris.", "Fetal alcohol syndrome.", "A long walk off a short pier.",
  "The dark side of the internet.", "Prancing through a field of wildflowers.",
  "Ethnic cleansing.", "Catfish.", "Stabbing.", "Genital warts.", "Heartwarming orphans.",
  "A big bag of weed.", "Oral pleasure.", "Cuddling with Vladimir Putin.",
  "Getting fancy." , "Old-man hands.", "Big, beefy arms.", "Puberty.",
  "Making my ex a little jealous.", "A golden shower.", "Pantslessness.",
  "A mopey zoo lion.", "Blowjobs.", "Crying into a bowl of cereal.", "Peer pressure.",
  "A secret lair.", "The South.", "Being the little spoon.", "Eating all of the pizza.",
  "Forgetting everything immediately after learning it.", "The Devil.", "The Internet.",
  "Not having any arms.", "Dropping the ball.", "Whining and complaining.",
  "The temptation to skip to the end.", "Firing up the Jacuzzi.", "Coitus.",
  "Incest.", "My crippling fear of ___.", "Pretending to be a robot.",
  "Grandma's boy.", "Having no legs.", "A sex tape involving two people you know.",
  "Getting really high and deciding what to do with your life.", "Obama.",
  "Seduction techniques.", "Switching to Geico.", "Pooping back and forth, forever.",
  "Anne Frank's diary.", "The part of the brain that's responsible for racism.",
  "A brief moment of reflection.", "Stepping on an old person.",
  "Making a new friend.", "Lactation.", "Multiple stab wounds.", "Dying.",
  "Explosively diarrhea-ing onto the walls.", "Sensual body paint.", "The afterlife.",
  "Using oven mitts as hands.", "Wearing underwear inside out to avoid doing laundry.",
  "Doing the humpty dance.", "Breaking out into song and dance.", "Genital piercings.",
  "Jerking off into a pool.", "The Pledge of Allegiance.", "Fracking.",
  "Crying yourself to sleep.", "Actual size.", "A Tijuana bar bet.", "Surprise buttsex.",
  "Aborting the mission.", "Seizing the means of production.", "Dry heaving.",
  "Picking up girls at the abortion clinic.", "The heartache of not being able to finish what you started.",
  "Whittling.", "Prison wine.", "Getting up early in the morning.",
  "Using sex to get what you want.", "Blowing everybody.", "Not all being said and done.",
];

const HAND_SIZE = 7;
const POLL_MS = 2500;
const WIN_SCORE = 8;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const genId = () => Math.random().toString(36).slice(2, 11) + Date.now().toString(36);
const genCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const loadRoom = async code => {
  const res = await fetch(`/api/room/${code}`);
  if (!res.ok) return null;
  return res.json();
};

const saveRoom = async (code, state) => {
  await fetch(`/api/room/${code}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state),
  });
};

const parseBlanks = (text, cards = []) => {
  const parts = text.split('___');
  const result = [];
  parts.forEach((part, i) => {
    if (part) result.push({ t: 'text', v: part });
    if (i < parts.length - 1) {
      const card = cards[i];
      result.push(card ? { t: 'fill', v: card.replace(/\.$/, '') } : { t: 'blank' });
    }
  });
  return result;
};

function BlackCard({ text, pick, filled = [] }) {
  const parts = parseBlanks(text, filled);
  return (
    <div className="black-card card-shadow fade-up">
      <div className="card-label">CARDS AGAINST HUMANITY</div>
      <p className="black-card-text">
        {parts.map((p, i) =>
          p.t === 'text' ? <span key={i}>{p.v}</span> :
          p.t === 'fill' ? <span key={i} className="blank-filled">{p.v}</span> :
                           <span key={i} className="blank-empty">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        )}
      </p>
      {pick > 1 && <div className="pick-badge">PICK {pick}</div>}
      <style jsx>{`
        .black-card { background:#111; border:2px solid #2a2a2a; border-radius:16px; padding:20px 20px 16px; width:100%; max-width:360px; margin:0 auto; }
        .card-label { font-size:10px; color:#444; font-weight:700; letter-spacing:2px; margin-bottom:10px; }
        .black-card-text { color:#fff; font-size:20px; font-weight:700; line-height:1.35; margin:0 0 16px; }
        .blank-filled { border-bottom:2px solid #fff; display:inline-block; margin-bottom:-2px; color:#fff; font-style:italic; }
        .blank-empty  { border-bottom:2px solid #444; display:inline-block; margin-bottom:-2px; }
        .pick-badge   { display:inline-flex; align-items:center; background:#fff; border-radius:20px; padding:3px 12px; font-size:11px; font-weight:700; color:#000; }
      `}</style>
    </div>
  );
}

function WhiteBtn({ text, selected, order, onClick }) {
  return (
    <button onClick={onClick} className={`white-btn btn-press ${selected ? 'sel' : ''}`}>
      {selected && order !== undefined && <span className="order-badge">{order + 1}</span>}
      {text}
      <style jsx>{`
        .white-btn { width:100%; text-align:left; padding:14px 16px; border-radius:12px; border:2px solid #222; background:#111; color:#bbb; font-weight:700; font-size:15px; cursor:pointer; position:relative; transition:border-color .15s, background .15s, color .15s; font-family:inherit; }
        .white-btn.sel { background:#fff; color:#000; border-color:#fff; }
        .order-badge { position:absolute; top:8px; right:10px; background:#000; color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
      `}</style>
    </button>
  );
}

function Scoreboard({ players, czarId, myId }) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  return (
    <div className="scoreboard">
      <div className="sb-label">SCORES · FIRST TO {WIN_SCORE}</div>
      {sorted.map((p, i) => (
        <div key={p.id} className="sb-row" style={{ borderBottom: i < sorted.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
          <div className="sb-left">
            <div className="sb-avatar">{p.name[0].toUpperCase()}</div>
            <span className="sb-name" style={{ color: p.id === myId ? '#fff' : '#888', fontWeight: p.id === myId ? 700 : 500 }}>
              {p.name}{p.id === myId ? ' · you' : ''}{p.id === czarId ? ' 👑' : ''}
            </span>
          </div>
          <div className="sb-score bebas">{p.score}</div>
        </div>
      ))}
      <style jsx>{`
        .scoreboard { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:16px; }
        .sb-label { font-size:10px; color:#444; font-weight:700; letter-spacing:2px; margin-bottom:12px; }
        .sb-row { display:flex; justify-content:space-between; align-items:center; padding:8px 0; }
        .sb-left { display:flex; align-items:center; gap:10px; }
        .sb-avatar { width:28px; height:28px; border-radius:50%; background:#1e1e1e; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; color:#666; flex-shrink:0; }
        .sb-name { font-size:14px; }
        .sb-score { font-size:24px; color:#fff; letter-spacing:1px; }
      `}</style>
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', disabled, style: s }) {
  return (
    <button onClick={!disabled ? onClick : undefined} className={`app-btn btn-press v-${variant}`} disabled={disabled} style={s}>
      {children}
      <style jsx>{`
        .app-btn { width:100%; padding:16px 20px; border-radius:12px; font-weight:700; font-size:16px; cursor:pointer; border:none; transition:transform .1s; font-family:inherit; }
        .app-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .v-primary   { background:#fff; color:#000; }
        .v-secondary { background:#1a1a1a; color:#fff; border:1px solid #2a2a2a; }
      `}</style>
    </button>
  );
}

function Inp({ placeholder, value, onChange, style: s, ...rest }) {
  return (
    <input placeholder={placeholder} value={value} onChange={onChange}
      style={{ width:'100%', padding:'14px 16px', borderRadius:12, border:'1px solid #2a2a2a', background:'#111', color:'#fff', fontSize:16, fontFamily:'Inter, sans-serif', outline:'none', boxSizing:'border-box', ...s }}
      {...rest} />
  );
}

const page = { minHeight:'100vh', background:'#0a0a0a', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', padding:'24px 16px', maxWidth:480, margin:'0 auto' };

export default function Home() {
  const [myId] = useState(genId);
  const [screen, setScreen] = useState('home');
  const [myName, setMyName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [gs, setGs] = useState(null);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef(null);

  useEffect(() => {
    if ((screen === 'lobby' || screen === 'game') && roomCode) {
      const poll = async () => {
        const state = await loadRoom(roomCode);
        if (state) {
          setGs(state);
          if (state.phase === 'lobby' && screen === 'game') setScreen('lobby');
          if (state.phase !== 'lobby' && screen === 'lobby') setScreen('game');
        }
      };
      poll();
      pollRef.current = setInterval(poll, POLL_MS);
      return () => clearInterval(pollRef.current);
    }
  }, [screen, roomCode]);

  const createRoom = async () => {
    if (!myName.trim()) return setError('Enter your name!');
    setLoading(true); setError('');
    const code = genCode();
    const state = {
      phase:'lobby', players:[{ id:myId, name:myName.trim(), score:0 }],
      hostId:myId, czarIndex:0, currentBlackCard:null,
      playerHands:{}, submissions:{}, submissionOrder:[], winner:null,
      blackDeck:shuffle([...Array(BLACK_CARDS.length).keys()]),
      whiteDeck:shuffle([...Array(WHITE_CARDS.length).keys()]),
      blackPos:0, whitePos:0,
    };
    await saveRoom(code, state);
    setRoomCode(code); setGs(state); setScreen('lobby');
    setLoading(false);
  };

  const joinRoom = async () => {
    if (!myName.trim()) return setError('Enter your name!');
    if (!joinCode.trim()) return setError('Enter a room code!');
    setLoading(true); setError('');
    const code = joinCode.trim().toUpperCase();
    const state = await loadRoom(code);
    if (!state) { setLoading(false); return setError('Room not found'); }
    if (state.phase !== 'lobby') { setLoading(false); return setError('Game already started'); }
    if (state.players.find(p => p.name.toLowerCase() === myName.trim().toLowerCase())) {
      setLoading(false); return setError('That name is already taken in this room');
    }
    state.players.push({ id:myId, name:myName.trim(), score:0 });
    await saveRoom(code, state);
    setRoomCode(code); setGs(state); setScreen('lobby');
    setLoading(false);
  };

  const startGame = async () => {
    setError('');
    const state = await loadRoom(roomCode);
    if (!state) return;
    if (state.players.length < 2) return setError('Need at least 2 players!');
    setLoading(true);
    let pos = state.whitePos;
    const playerHands = {};
    for (const p of state.players) {
      playerHands[p.id] = [];
      for (let i = 0; i < HAND_SIZE; i++) {
        playerHands[p.id].push(WHITE_CARDS[state.whiteDeck[pos % state.whiteDeck.length]]);
        pos++;
      }
    }
    const czar = state.players[0];
    const blackCard = BLACK_CARDS[state.blackDeck[0]];
    const nonCzarIds = state.players.filter(p => p.id !== czar.id).map(p => p.id);
    const newState = { ...state, phase:'picking', playerHands, whitePos:pos, blackPos:1, currentBlackCard:blackCard, czarIndex:0, submissionOrder:shuffle(nonCzarIds), submissions:{}, winner:null };
    await saveRoom(roomCode, newState);
    setGs(newState); setScreen('game'); setLoading(false);
  };

  const submitCards = async () => {
    const pick = gs?.currentBlackCard?.pick || 1;
    if (selected.length !== pick || loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    const hand = state.playerHands[myId] || [];
    const submittedTexts = selected.map(idx => hand[idx]);
    state.submissions[myId] = submittedTexts;
    const newHand = [...hand];
    [...selected].sort((a,b) => b-a).forEach(idx => newHand.splice(idx,1));
    state.playerHands[myId] = newHand;
    const czar = state.players[state.czarIndex % state.players.length];
    const nonCzars = state.players.filter(p => p.id !== czar.id);
    if (nonCzars.every(p => state.submissions[p.id])) state.phase = 'judging';
    await saveRoom(roomCode, state);
    setGs(state); setSelected([]); setLoading(false);
  };

  const forceJudging = async () => {
    const state = await loadRoom(roomCode);
    if (!state || Object.keys(state.submissions).length === 0) return setError('Nobody has played yet!');
    state.phase = 'judging';
    await saveRoom(roomCode, state); setGs(state);
  };

  const pickWinner = async (winnerId) => {
    if (loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    const winner = state.players.find(p => p.id === winnerId);
    if (!winner) { setLoading(false); return; }
    state.players.find(p => p.id === winnerId).score++;
    state.phase = 'winner';
    state.winner = { id:winnerId, name:winner.name, cards:state.submissions[winnerId] };
    await saveRoom(roomCode, state); setGs(state); setLoading(false);
  };

  const nextRound = async () => {
    if (loading) return;
    setLoading(true);
    const state = await loadRoom(roomCode);
    if (!state) { setLoading(false); return; }
    if (state.players.some(p => p.score >= WIN_SCORE)) {
      state.phase = 'gameover';
      await saveRoom(roomCode, state); setGs(state); setLoading(false); return;
    }
    const newCzarIdx = (state.czarIndex + 1) % state.players.length;
    const newCzar = state.players[newCzarIdx];
    let pos = state.whitePos;
    for (const p of state.players) {
      const h = [...(state.playerHands[p.id] || [])];
      while (h.length < HAND_SIZE) { h.push(WHITE_CARDS[state.whiteDeck[pos % state.whiteDeck.length]]); pos++; }
      state.playerHands[p.id] = h;
    }
    const blackCard = BLACK_CARDS[state.blackDeck[state.blackPos % state.blackDeck.length]];
    const nonCzarIds = state.players.filter(p => p.id !== newCzar.id).map(p => p.id);
    const newState = { ...state, phase:'picking', czarIndex:newCzarIdx, currentBlackCard:blackCard, blackPos:state.blackPos+1, whitePos:pos, submissions:{}, submissionOrder:shuffle(nonCzarIds), winner:null };
    await saveRoom(roomCode, newState); setGs(newState); setSelected([]); setLoading(false);
  };

  const resetGame = async () => {
    const state = await loadRoom(roomCode);
    if (!state) return;
    const newState = { ...state, phase:'lobby', players:state.players.map(p => ({ ...p, score:0 })), blackDeck:shuffle([...Array(BLACK_CARDS.length).keys()]), whiteDeck:shuffle([...Array(WHITE_CARDS.length).keys()]), blackPos:0, whitePos:0, playerHands:{}, submissions:{}, winner:null, czarIndex:0 };
    await saveRoom(roomCode, newState); setGs(newState); setScreen('lobby');
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(roomCode).catch(() => {});
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const czar = gs ? gs.players[gs.czarIndex % gs.players.length] : null;
  const isCzar = czar?.id === myId;
  const myHand = gs?.playerHands?.[myId] || [];
  const hasSubmitted = !!gs?.submissions?.[myId];
  const nonCzarCount = gs ? gs.players.filter(p => p.id !== czar?.id).length : 0;
  const submittedCount = gs ? Object.keys(gs.submissions).length : 0;
  const pick = gs?.currentBlackCard?.pick || 1;

  const toggleCard = idx => {
    setSelected(prev => {
      if (prev.includes(idx)) return prev.filter(i => i !== idx);
      if (prev.length >= pick) return [...prev.slice(-(pick-1)), idx];
      return [...prev, idx];
    });
  };

  if (screen === 'home') return (
    <div style={page}>
      <Head><title>Cards Against Humanity · Online</title></Head>
      <div style={{ width:'100%', flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div className="card-shadow" style={{ display:'inline-block', background:'#fff', color:'#000', borderRadius:16, padding:'20px 28px', marginBottom:14 }}>
            <div className="bebas" style={{ fontSize:34, letterSpacing:2, lineHeight:1.1 }}>Cards Against<br />Humanity</div>
          </div>
          <div style={{ color:'#444', fontSize:13 }}>Online · No sign-up needed</div>
        </div>
        {error && <div style={{ background:'#1a0a0a', border:'1px solid #5a1a1a', borderRadius:10, padding:'12px 16px', marginBottom:16, color:'#ff6b6b', fontSize:14 }}>{error}</div>}
        <Inp placeholder="Your name" value={myName} onChange={e => { setMyName(e.target.value); setError(''); }} maxLength={20} style={{ marginBottom:12, fontSize:18, fontWeight:700 }} />
        <div style={{ marginBottom:20 }}><Btn onClick={createRoom} disabled={loading}>{loading ? 'Creating…' : '+ Create a room'}</Btn></div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
          <span style={{ color:'#333', fontSize:13 }}>or join with a code</span>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
        </div>
        <Inp placeholder="ROOM CODE" value={joinCode} onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError(''); }} maxLength={6} style={{ marginBottom:12, textAlign:'center', letterSpacing:6, fontSize:22, fontWeight:900 }} />
        <Btn onClick={joinRoom} disabled={loading} variant="secondary">{loading ? 'Connecting…' : 'Join →'}</Btn>
      </div>
    </div>
  );

  if (screen === 'lobby') {
    const isHost = gs?.hostId === myId;
    return (
      <div style={page}>
        <Head><title>Lobby · {roomCode}</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ color:'#444', fontSize:11, letterSpacing:3, marginBottom:8 }}>ROOM CODE</div>
            <div onClick={copyCode} className="btn-press bebas" style={{ cursor:'pointer', fontSize:60, letterSpacing:12, lineHeight:1, userSelect:'none' }}>{roomCode}</div>
            <div style={{ color:copied ? '#4ade80' : '#333', fontSize:13, marginTop:8 }}>{copied ? '✓ Copied!' : 'Tap to copy · Share with friends'}</div>
          </div>
          <div style={{ background:'#111', border:'1px solid #1a1a1a', borderRadius:14, padding:16, marginBottom:24 }}>
            <div style={{ fontSize:10, color:'#444', letterSpacing:2, marginBottom:12 }}>PLAYERS ({gs?.players?.length})</div>
            {gs?.players?.map(p => (
              <div key={p.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #1a1a1a' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'#1e1e1e', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, color:'#666' }}>{p.name[0].toUpperCase()}</div>
                  <span style={{ fontWeight:p.id===myId?700:500, color:p.id===myId?'#fff':'#888', fontSize:15 }}>
                    {p.name}{p.id===myId && <span style={{ color:'#444', fontWeight:400, fontSize:12 }}> (you)</span>}
                  </span>
                </div>
                {p.id === gs?.hostId && <span style={{ fontSize:11, color:'#f59e0b', fontWeight:700 }}>HOST</span>}
              </div>
            ))}
          </div>
          {error && <div style={{ color:'#ff6b6b', fontSize:13, marginBottom:12, textAlign:'center' }}>{error}</div>}
          {isHost
            ? <Btn onClick={startGame} disabled={loading}>{loading ? 'Starting…' : `Start game → (${gs?.players?.length} player${gs?.players?.length!==1?'s':''})`}</Btn>
            : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>Waiting for the host to start the game…</div>
          }
        </div>
      </div>
    );
  }

  if (screen === 'game' && gs) {
    const { phase, currentBlackCard, submissions, submissionOrder, winner: wd } = gs;

    if (phase === 'gameover') {
      const sorted = [...gs.players].sort((a,b) => b.score - a.score);
      return (
        <div style={{ ...page, justifyContent:'center' }}>
          <Head><title>Game Over!</title></Head>
          <div style={{ width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:60, marginBottom:8 }}>🏆</div>
            <div className="bebas" style={{ fontSize:50, letterSpacing:2 }}>{sorted[0].name} wins!</div>
            <div style={{ color:'#555', marginBottom:28 }}>{sorted[0].score} glorious points</div>
            <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
            {gs.hostId === myId
              ? <div style={{ marginTop:20 }}><Btn onClick={resetGame}>Play again</Btn></div>
              : <div style={{ color:'#444', marginTop:20, fontSize:14 }}>Waiting for the host to restart…</div>
            }
          </div>
        </div>
      );
    }

    if (phase === 'winner') return (
      <div style={page}>
        <Head><title>Round Winner!</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:18 }}>
            <div style={{ fontSize:44, marginBottom:4 }}>🎉</div>
            <div className="bebas" style={{ fontSize:38, letterSpacing:1 }}>{wd.name} wins the round!</div>
          </div>
          <BlackCard text={currentBlackCard.text} pick={currentBlackCard.pick} filled={wd.cards} />
          <div style={{ margin:'14px 0 18px' }}>
            {wd.cards.map((c,i) => <div key={i} className="card-shadow" style={{ background:'#fff', color:'#000', borderRadius:12, padding:'12px 16px', fontWeight:700, fontSize:16, marginBottom:8 }}>{c}</div>)}
          </div>
          <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
          <div style={{ marginTop:20 }}>
            {isCzar
              ? <Btn onClick={nextRound} disabled={loading}>{loading ? 'Loading…' : 'Next round →'}</Btn>
              : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>Waiting for {czar?.name} to start the next round…</div>
            }
          </div>
        </div>
      </div>
    );

    if (phase === 'judging') {
      if (!isCzar) return (
        <div style={{ ...page, justifyContent:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>⚖️</div>
          <div className="bebas" style={{ fontSize:34, textAlign:'center' }}>{czar?.name} is judging…</div>
          <div style={{ color:'#444', marginTop:8 }}>Sit tight!</div>
        </div>
      );
      const orderedSubs = (submissionOrder||[]).filter(pid => submissions[pid]).map((pid,i) => ({ pid, cards:submissions[pid], num:i+1 }));
      return (
        <div style={page}>
          <div style={{ width:'100%' }}>
            <div style={{ background:'#f59e0b', color:'#000', borderRadius:10, padding:'8px 16px', textAlign:'center', fontWeight:700, fontSize:13, marginBottom:16 }}>
              👑 You are the Card Czar — pick your favorite!
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:12, paddingBottom:24 }}>
              {orderedSubs.map(sub => (
                <button key={sub.pid} onClick={() => !loading && pickWinner(sub.pid)} className="btn-press card-shadow"
                  style={{ background:'#fff', color:'#000', borderRadius:14, padding:'16px 18px', textAlign:'left', border:'none', cursor:'pointer' }}>
                  <div style={{ fontSize:11, color:'#999', fontWeight:700, marginBottom:8 }}>ANSWER {sub.num}</div>
                  {sub.cards.map((c,j) => <div key={j} style={{ fontWeight:700, fontSize:17, marginBottom:4 }}>{c}</div>)}
                  <div style={{ marginTop:8, fontSize:13, color:'#666', lineHeight:1.4 }}>
                    {parseBlanks(currentBlackCard.text, sub.cards).map((p,k) =>
                      p.t==='text' ? <span key={k}>{p.v}</span> :
                      p.t==='fill' ? <strong key={k}>{p.v}</strong> :
                                     <em key={k} style={{ color:'#bbb' }}>___</em>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (phase === 'picking') {
      if (isCzar) return (
        <div style={page}>
          <div style={{ width:'100%' }}>
            <div style={{ background:'#f59e0b', color:'#000', borderRadius:10, padding:'8px 16px', textAlign:'center', fontWeight:700, fontSize:13, marginBottom:16 }}>
              👑 You are the Card Czar — wait for answers
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:14, padding:20, textAlign:'center', marginTop:18 }}>
              <div className="bebas" style={{ fontSize:52, letterSpacing:2 }}>{submittedCount}/{nonCzarCount}</div>
              <div style={{ color:'#555', fontSize:14 }}>players have played</div>
              {submittedCount > 0 && (
                <button onClick={forceJudging} style={{ marginTop:14, background:'transparent', border:'none', color:'#444', fontSize:12, cursor:'pointer', textDecoration:'underline' }}>
                  Force judging (skip AFK players)
                </button>
              )}
            </div>
            <div style={{ marginTop:18 }}><Scoreboard players={gs.players} czarId={czar?.id} myId={myId} /></div>
          </div>
        </div>
      );

      if (hasSubmitted) return (
        <div style={{ ...page, justifyContent:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
          <div className="bebas" style={{ fontSize:34 }}>Cards played!</div>
          <div style={{ color:'#555', marginTop:6 }}>{submittedCount}/{nonCzarCount} players ready</div>
          <div className="pulse" style={{ color:'#333', marginTop:6, fontSize:13 }}>Waiting for others…</div>
        </div>
      );

      return (
        <div style={{ ...page, padding:'16px 16px 28px' }}>
          <div style={{ width:'100%' }}>
            <BlackCard text={currentBlackCard.text} pick={pick} filled={selected.map(idx => myHand[idx])} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'14px 0 12px' }}>
              <div style={{ color:'#555', fontSize:13 }}>
                Pick {pick} card{pick>1?'s':''} &nbsp;·&nbsp;
                <span style={{ color:selected.length===pick?'#4ade80':'#777' }}>{selected.length}/{pick}</span>
              </div>
              <button onClick={submitCards} disabled={selected.length!==pick||loading} className="btn-press"
                style={{ background:selected.length===pick?'#fff':'#1a1a1a', color:selected.length===pick?'#000':'#444', border:'none', borderRadius:10, padding:'10px 18px', fontWeight:700, fontSize:14, cursor:selected.length===pick?'pointer':'not-allowed', fontFamily:'inherit' }}>
                {loading ? '…' : 'Play →'}
              </button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {myHand.map((card,i) => {
                const selOrder = selected.indexOf(i);
                return <WhiteBtn key={i} text={card} selected={selOrder!==-1} order={selOrder!==-1?selOrder:undefined} onClick={() => toggleCard(i)} />;
              })}
            </div>
          </div>
        </div>
      );
    }
  }

  return <div style={{ ...page, justifyContent:'center' }}><div className="pulse" style={{ color:'#333' }}>Loading…</div></div>;
}
