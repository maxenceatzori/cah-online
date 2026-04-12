import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const BLACK_CARDS = [
  { text: "Les Etats-Unis ont débuté le parachutage de ___ aux enfants afghans.", pick: 1 },
  { text: "La guerre, c'est bien pour quoi?", pick: 1 },
  { text: "Qu'est-ce qui m'empêche de dormir?", pick: 1 },
  { text: "C'est quoi cette odeur?", pick: 1 },
  { text: "Qui a volé les cookies?", pick: 1 },
  { text: "Des études prouvent que les rats de laboratoires se déplacent cinquante fois plus vite dans les labyrinthes après avoir été exposés à ___.", pick: 1 },
  { text: "Quand j'irai en prison, je cacherai ___ dans mes fesses pour faire de la contrebande.", pick: 1 },
  { text: "Si j'étais Président de la République, je créerais le ministère de ___.", pick: 1 },
  { text: "Qu'est-ce qui se bonifie avec le temps?", pick: 1 },
  { text: "Je bois pour oublier ___.", pick: 1 },
  { text: "Qu'ai-je rapporté du Mexique?", pick: 1 },
  { text: "La sortie scolaire a été totalement gâchée par ___.", pick: 1 },
  { text: "Qu'est-ce que vous n'aimeriez pas trouver dans de la nourriture chinoise?", pick: 1 },
  { text: "Dans son nouveau film Disney, Hannah Montana affronte ___ pour la toute première fois.", pick: 1 },
  { text: "Pendant le sexe, j'aime penser à ___.", pick: 1 },
  { text: "A cause de quoi mon slip est-il trempé?", pick: 1 },
  { text: "Que me cachent mes parents?", pick: 1 },
  { text: "Les Blancs aiment bien ___.", pick: 1 },
  { text: "A cause de quoi les terroristes nous détestent-ils autant?", pick: 1 },
  { text: "Comme j'aimerais ne pas avoir perdu la notice pour ___.", pick: 1 },
  { text: "Désolé les gens, je viens juste de ___.", pick: 1 },
  { text: "C'est quoi ce bruit?", pick: 1 },
  { text: "Qu'est-ce qu'on peut trouver par milliers au paradis?", pick: 1 },
  { text: "Le meilleur ami des filles, c'est ___.", pick: 1 },
  { text: "Quel est le plaisir coupable de Batman?", pick: 1 },
  { text: "Les psychanalystes s'alarment devant l'émergence de la phobie de ___ chez la plupart de leurs patients.", pick: 1 },
  { text: "Quand j'étais sous acide, ___ se changeait en ___.", pick: 2 },
  { text: "Quand j'étais petit, j'adorais ___.", pick: 1 },
  { text: "Qu'est-ce qui vous fera réussir à coucher à tous les coups?", pick: 1 },
  { text: "Et l'Oscar du meilleur ___ est attribué à ___.", pick: 2 },
  { text: "Quel est le prochain duo super-héros/acolyte?", pick: 1 },
  { text: "___ : Bon jusqu'à la dernière goutte.", pick: 1 },
  { text: "Désormais, le Père Noël n'apportera plus du charbon aux vilains enfants mais ___.", pick: 1 },
  { text: "Quel est mon super-pouvoir secret?", pick: 1 },
  { text: "Pour draguer, il ne faut surtout pas parler de son penchant pour ___.", pick: 1 },
  { text: "Que préfère Nicolas Sarkozy?", pick: 1 },
  { text: "Qui est le plus aigri?", pick: 1 },
  { text: "___ ? Il y a une application pour ça.", pick: 1 },
  { text: "Pour mon prochain tour de magie, je vais faire sortir ___ de ___.", pick: 2 },
  { text: "Durant sa période marron (souvent négligée), Picasso peignait beaucoup de tableaux représentant ___.", pick: 1 },
  { text: "La médecine reconnaît enfin les pouvoirs thérapeutiques de ___.", pick: 1 },
  { text: "___ : Testé par les enfants, approuvé par les mamans.", pick: 1 },
  { text: "Qu'est-ce qui peut aider à maintenir une relation de couple?", pick: 1 },
  { text: "La vie était dure pour les hommes des cavernes avant ___.", pick: 1 },
  { text: "Ce soir sur M6, Bernard de la Villardière vous propose une enquête exclusive sur ___.", pick: 1 },
  { text: "Que sentent les personnes âgées?", pick: 1 },
  { text: "Qu'est-ce qui aide Barack Obama à se changer les idées?", pick: 1 },
  { text: "Il mange quoi Vin Diesel au petit déjeuner?", pick: 1 },
  { text: "Qu'est-ce que mamie trouve d'abord perturbant, puis étrangement plaisant?", pick: 1 },
  { text: "___ . C'est un piège!", pick: 1 },
  { text: "Faites un haïku.", pick: 3 },
  { text: "Quel est le prochain jouet du HappyMeal?", pick: 1 },
  { text: "C'est vrai, j'ai tué ___. Comment? ___.", pick: 2 },
  { text: "Si j'étais riche, je ferais ériger une statue de 15 mètres de haut pour commémorer ___.", pick: 1 },
  { text: "Mais avant de vous tuer, Mr Bond, je dois vous montrer ___.", pick: 1 },
  { text: "Ce soir sur Canal + découvrez ___, la tragique histoire de ___.", pick: 2 },
  { text: "Qu'est-ce qui me donne des gaz incontrôlables?", pick: 1 },
  { text: "Qu'est-ce qui est le plus hardcore?", pick: 1 },
  { text: "Qu'est-ce qui est le plus gay?", pick: 1 },
  { text: "Alors que les USA et l'URSS s'affrontaient dans la course à l'espace, le Mexique dépensait des millions de pesos dans la recherche sur ___.", pick: 1 },
  { text: "Alors que Pharaon restait impassible, Moïse provoqua la onzième plaie : ___.", pick: 1 },
  { text: "Je ne sais pas avec quelles armes se fera la Troisième Guerre Mondiale, mais la Quatrième se fera à coups de ___.", pick: 1 },
  { text: "Selon une rumeur, le plat préféré de Vladimir Poutine est ___ fourré avec ___.", pick: 2 },
  { text: "La dernière chose à laquelle pensa Michael Jackson avant de mourir fut ___.", pick: 1 },
  { text: "Des ethnographes ont récemment découvert une tribu aborigène vouant un culte à ___.", pick: 1 },
];

const WHITE_CARDS = [
  "La Sainte Bible.", "La Macarena.", "Se chier dessus.", "Un anus maquillé.",
  "Les juifs avec une coupe afro.", "Les P'tits Filous Tubes.", "Une branlette tristement exécutée.",
  "Michaël Jackson", "BATMAN!!!", "Les Vikings.", "L'abstinence.", "Le bibendum Michelin.",
  "Superbus.", "Son Altesse royale, la reine Elizabeth II.", "L'auto-cannibalisme.",
  "La série des « Fais-moi peur ! »", "Le ping pong de caca cul à cul.", "Pour toujours.", "La fête du slip.",
  "Mes parties génitales.", "L'inceste.", "L'Amérique.", "Les chansons de Pascal Obispo.",
  "Un twist de M. Night Shyamalan.", "Mourir de la dysenterie.", "Les équipes chinoises de gymnastiques.",
  "Du sexe surprise !", "Batifoler.", "Une tortue vicieuse qui te mord la bite.",
  "Le lancer de nain sur une cible en velcro.", "2 Girls 1 Cup (vidéo scatophile célèbre sur Internet).",
  "La tension sexuelle.", "Une fête d'anniversaire ratée.", "Du Axe Body Spray.", "Des bébés chiens !",
  "Les gens qui sentent leurs chaussettes.", "La destruction mutuelle assurée.", "Le Ku Klux Klan.", "Boire tout seul.",
  "Des abdominaux spectaculaires.", "Faire le bon choix.", "Du sperme de baleine.", "Les inondations.",
  "Center Park.", "Les Oompas Loompas.", "La capacité d'écoute.",
  "Se mettre tellement en colère que ça en donne une érection.", "Les Juifs.", "Les cols portés relevés.",
  "World of Warcraft.", "Faire la moue.", "Gargamel.", "Les Twinkies.", "Le Stade de France.",
  "Etre un sale con envers les enfants.", "Des salopes.", "Les enfants tenus en laisse.",
  "Laisser un message maladroit sur un répondeur.", "Beaucoup de bruit pour rien.",
  "Les Noirs.", "La lactation.", "Natalie Portman.", "Britney Spears à 55 ans.",
  "Les Jazz Hands.", "Une fanfic érotique sur l'univers de Harry Potter.", "Les existentialistes.", "La science.",
  "Une mycose.", "Chier dans la soupe.", "La puberté.", "Le Pape.",
  "Abuser des cabines de bronzage.", "Les tétraplégiques.", "Un cinquantenaire qui pratique le roller.",
  "Se retirer.", "Brouter.", "Péter et s'en aller.", "Parkinson.", "Auschwitz.",
  "Des chèvres qui mangent des sacs poubelle.", "Boire un verre de beurre fondu.",
  "La couille manquante de Lance Armstrong.", "Le faire dans les fesses.", "La séduction.",
  "Les Jonas Brothers.", "La sexualité des pandas.",
  "Un chameau en dessin animé qui apprécie une délicieuse et rafraichissante taffe de cigarette.",
  "Respirer de la colle.", "Les sites de rencontres échangistes.",
  "Les exercices pour stimuler l'esprit d'équipe en entreprise.", "Plus Belle La Vie.",
  "Se torcher.", "L'impuissance.", "Un tir de son propre camp.", "Les solos de saxophone.",
  "Un énième film de vampires.", "La kétamine.", "Les œstrogènes.", "Le Sud.",
  "Manger pour pouvoir vomir.", "Un bulot.", "Des catapultes.", "Un burrito très pimenté.",
  "Les filles à qui l'alcool ne réussit pas.", "Des gobelins.", "La Scientologie.", "Nicolas Cage.",
  "Une torsion musculaire.", "La chair humaine.", "La revente de cadeau sur eBay.",
  "Une vidéo amateur de Claire Chazal qui sanglote au dessus d'un plat surgelé.",
  "Les chapeaux à hélices.", "Où sont les toilettes ?", "Les Hot Pockets.", "Des pilotes kamikazes.",
  "La lèpre.", "Les concours de beauté pour enfants.", "Les pantalons fendus en cuir des motards et des cowboys.",
  "Des œufs de ptérodactyles.", "Des couvertures avec la variole.", "Le sexe oral non réciproque.",
  "Des sucettes géantes.", "Gandhi.", "Les soutifs lance-flammes.", "Le Viagra.",
  "Dr. Martin Luther King Jr.", "Sean Penn.", "Keanu Reeves.", "L'esclavage.", "Genghis Khan.", "Corky.",
  "Un gardien de but.", "Des oies.", "Des refaits asymétriques.", "Les hommes.",
  "La bestialité.", "Ce putain de jeu.", "Le Médiator.", "Des Chuppa Chups.",
  "Will Smith.", "La peluche « Elmo chatouille-moi ».", "Les couteaux à cran d'arrêt.",
  "Des enfants avec un cancer du colon.", "Des pankakes.", "Céline Dion.", "Une canette de Red Bull.",
  "Le sang du Christ.", "Ta mère qui me demande en ami sur Facebook.", "Les gens en chaleur.",
  "Les profs remplaçants.", "Une parade nuptiale.", "Avoir un calcul rénal.", "La bagarre.",
  "Jamie de C'est Pas Sorcier.", "Les piercings sur les parties génitales.",
  "Les témoins de Jéhovah.", "Les roux.", "Sarah Palin.", "L'agriculture.",
  "Le tri sélectif.", "Les pornos SM allemands.", "Un terroriste qui fait des vannes.",
  "Une fusillade dans un lycée.", "L'avortement au cintre.", "Le caca qui brule.",
  "Mon statut relationnel.", "Doigter.", "Le SIDA.", "Valérie Damidot.", "Les rabat-joies.",
  "Une lobotomie au pic à glace.", "Un type louche en imperméable qui traine devant les écoles primaires.",
  "Les chinois.", "Un caniche nain.", "Les trous dans les cloisons des WC sur les aires d'autoroutes (glory holes).",
  "L'ouragan Katrina.", "Les Oreos.", "Les Nazis.", "Les femmes dans les pubs de yaourts.",
  "Les règles abondantes.", "Les Frolics.", "Les mines antipersonnel.", "Une maison de retraite.",
  "Le placenta.", "Bono.", "Justin Bieber.", "La nécrophilie.", "Un prépuce.", "Indochine.",
  "Le Big Bang.", "Bob l'éponge.", "Ma collection de sex-toys high-tech.", "La guérison par la foi.",
  "Mon âme.", "Aller à la messe de minuit.", "Les connards sur leur iPhone 4S.", "La répression.",
  "Improviser un dispositif à base d'explosifs.", "Draguer des personnes âgées.",
  "Les éjaculations nocturnes.", "Heath Ledger.", "Les personnes âgées japonaises.", "La Valse des Fleurs.",
  "Une fellation au volant.", "Les fantasmes sur les bucherons.", "Un téton qui sort du soutien-gorge.",
  "Des bébés morts.", "Etre en feu.", "La masturbation.", "Le triangle des Bermudes.", "Un océan de troubles.",
  "La sélection naturelle.", "Des parents morts.", "Les Italiens.", "Tom Cruise.", "La chevalerie.",
  "Les jeux vidéo en réseau.", "Le clitoris.", "Les mangas pornos avec tentacules.",
  "Mahomet.", "Un gros ventre fendu qui ressemble à un cul.", "La maltraitance sur mineur.",
  "Toucher des organes génitaux par inadvertance.",
  "Super Mario qui vient réparer une fuite dans un film porno.",
  "Le Télétubbie qui fait le plus gay des quatre.", "Les amis qui bouffent tous vos biscuits.",
  "Paris Hilton.", "Un mime qui fait une attaque.", "Twitter.", "Des préliminaires laborieux.",
  "Un moment à soi.", "Des gants en latex.",
  "Porter ses sous-vêtements à l'envers pour éviter de faire une machine.",
  "Des crevettes à volonté pour 4,99$.", "Des échantillons gratuits.", "Du kloug.",
  "Un poil pubien abandonné.", "Attendre jusqu'au mariage.", "Cette réponse est post-moderne.",
  "Un Tamagotchi négligé.", "Les décolletés élégants.", "Des travestis potables.",
  "Arnold Schwarzenegger.", "Piller des tombes.", "Un pistolet à eau rempli de pipi de chat.",
  "D'Artagnan.", "Ronald McDonald.", "Se donner à 110%.", "Nourrir Laurence Boccolini.",
  "Un coup d'œil.", "De multiples coups de couteau.", "Casimir.", "Le meurtre le plus immonde.",
  "Le périnée.", "Ouvrir la Mer Rouge.", "Trop de gel dans les cheveux.", "Les vidéos porno hardcore.",
  "Les sous-vêtements comestibles.", "Les Blancs.", "Tiger Woods.", "Descendre en piqué.",
  "Coucher avec elle.", "Les chants tyroliens dans les moments inappropriés.", "K2000.", "Les fantômes.",
  "Un plan cul.", "L'intrigue d'un film de Michael Bay.", "La folie des hommes.",
  "Un chapeau vraiment très cool.", "La musique pop turque.", "Robert Downey Jr.", "Nicolat Hulot.",
  "Cacher une érection.", "L'herpès buccal.", "Le comportement passif agressif.",
  "Deux nains qui chient dans un sceau.", "Les pré-adolescentes.", "Hippo Gloutons.", "Kayne West.",
  "Vomir sans vomi.", "Eric Zemmour.", "Les sans-abris.", "Coco, le singe des Coco Pops.",
  "Les échanges de politesse.", "Des boules.", "Le nettoyage ethnique.",
  "Le truc du Télé Achat qui électrocute les abdominaux.", "La gastro.", "Des centaures.",
  "Un uppercut.", "Les nains.", "Quand tu pètes et que ça fait un léger bruit.", "Enlever ton t-shirt.",
  "Monsieur Patate.", "Un fœtus.", "Des blagues sur l'Holocauste au moment inopportun.",
  "Un spectacle de marionnettes.", "Les pets vaginaux.", "Un Sunday Caramel.",
  "Des abeilles ?", "Le droit de vote aux femmes.", "Bond, James Bond.", "De la pâtée pour chat.",
  "Le pudding à la figue.", "Le soleil qui brille et les arcs en ciel.", "Le réchauffement planétaire.",
  "Boire de la bière en faisant le poirier sur le tonneau.", "La règle de trois.", "Porter des moufles.",
  "Etre fabuleux.", "Buzz l'Eclair qui explique le sexe aux enfants.",
  "Manger tous les cookies qu'on devait vendre à la kermesse.", "Les émotions.",
  "Du thon en boite avec des bouts de dauphins.",
  "Tricher aux Jeux Olympiques Spéciaux (réservés aux handicapés mentaux).",
  "Une attaque de vélociraptors.", "Une course à la mort en fauteuil roulant.", "L'attitude.",
  "Les surdoués en mathématiques.", "Les boules anales.", "Les joueurs de djembé amateurs.",
  "Un moulin à vent rempli de cadavres.", "Hulk Hogan.", "Le smegma.", "Des pédophiles.", "Scalper.",
  "Porter des semelles compensées.", "La Gestapo.", "La torture par l'eau.", "Les chorégraphies disco.",
  "Chuck Norris qui casse de la lesbienne antisémite.", "La Heineken.", "Un micropénis.",
  "Les oiseaux qui ne savent pas voler.", "Braquer une banque du sperme.",
  "Les quotas pour les minorités.", "Un complexe d'Œdipe.", "Les combats de coqs.",
  "La carrière musicale de Tony Parker.", "Ma vie sexuelle.", "Julien Lepers.",
  "Se saouler au bain de bouche.", "La maladie de la vache folle.", "Hara-kiri.",
  "Piéger votre maison par peur des voleurs.", "Le patinage artistique en duo non mixte.", "Dark Vador.",
  "Voldemort.", "Lécher les choses pour prouver qu'elles sont à vous.", "Nicolas Sarkozy.",
  "La Gay Pride.", "La combustion spontanée.", "Barack Obama.", "Apprendre à un robot à aimer.",
  "Sean Connery.", "La paix mondiale.", "La dépression nerveuse.", "Les amputés.", "Une mama black en colère.",
  "Les Talibans.", "Le cœur d'un enfant.", "Etre riche.", "Des bananes en pyjamas.",
  "Se gratter le cul ni vu ni connu.", "Les golden showers (pratique urophile).", "Des victimes civiles.",
  "Une érection qui dure plus de quatre heures.", "Ces moments où vous avez du sable dans le vagin.",
  "Se pavaner.", "L'obésité.", "Les gays.", "Les petits chanteurs à la croix de bois.",
  "Faire un petit pipi.", "Mourir.", "Essayer de pécho de la meuf à la sortie des cliniques d'avortement.",
  "Les asiatiques qui ne sont pas bons en maths.", "Les garçons qui n'appellent pas.",
  "L'odeur des vieux.", "Un singe qui fume le cigare.", "Une détonation thermonucléaire.", "Kim Jong II.",
  "Faire un câlin.", "La vieille qui joue dans Arabesques.",
  "La diarrhée des lendemains de fêtes arrosées.", "L'alcoolisme.", "Le racisme.", "Le catéchisme.",
  "Les préservatifs parfumés.", "Se réveiller à moitié nu sur le parking du McDo.",
  "Le vagin de Whoopi Goldberg.", "Monsieur Propre.", "Les pauvres.", "L'envie de pénis.",
  "Les Mexicains qui travaillent dur.", "Douce, douce vengeance...",
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
      {pick > 1 && <div className="pick-badge">PIOCHER {pick}</div>}
      <style jsx>{`
        .black-card { background:#111; border:2px solid #2a2a2a; border-radius:16px; padding:20px 20px 16px; width:100%; max-width:360px; margin:0 auto; }
        .card-label { font-size:10px; color:#444; font-weight:700; letter-spacing:2px; margin-bottom:10px; }
        .black-card-text { color:#fff; font-size:20px; font-weight:700; line-height:1.35; margin:0 0 16px; }
        .blank-filled { border-bottom:2px solid rgba(255,255,255,0.5); padding-bottom:2px; font-style:italic; color:#eee; }
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
      <div className="sb-label">SCORES · PREMIER À {WIN_SCORE}</div>
      {sorted.map((p, i) => (
        <div key={p.id} className="sb-row" style={{ borderBottom: i < sorted.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
          <div className="sb-left">
            <div className="sb-avatar">{p.name[0].toUpperCase()}</div>
            <span className="sb-name" style={{ color: p.id === myId ? '#fff' : '#888', fontWeight: p.id === myId ? 700 : 500 }}>
              {p.name}{p.id === myId ? ' ·vous' : ''}{p.id === czarId ? ' 👑' : ''}
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
    if (!myName.trim()) return setError('Entre ton prénom !');
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
    if (!myName.trim()) return setError('Entre ton prénom !');
    if (!joinCode.trim()) return setError('Entre le code de la salle !');
    setLoading(true); setError('');
    const code = joinCode.trim().toUpperCase();
    const state = await loadRoom(code);
    if (!state) { setLoading(false); return setError('Salle introuvable'); }
    if (state.phase !== 'lobby') { setLoading(false); return setError('La partie a déjà commencé'); }
    if (state.players.find(p => p.name.toLowerCase() === myName.trim().toLowerCase())) {
      setLoading(false); return setError('Ce prénom est déjà pris dans cette salle');
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
    if (state.players.length < 2) return setError('Il faut au moins 2 joueurs !');
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
    if (!state || Object.keys(state.submissions).length === 0) return setError('Personne n\'a encore joué !');
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
      <Head><title>Cards Against Humanity · En ligne</title></Head>
      <div style={{ width:'100%', flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div className="card-shadow" style={{ display:'inline-block', background:'#fff', color:'#000', borderRadius:16, padding:'20px 28px', marginBottom:14 }}>
            <div className="bebas" style={{ fontSize:34, letterSpacing:2, lineHeight:1.1 }}>Cards Against<br />Humanity</div>
          </div>
          <div style={{ color:'#444', fontSize:13 }}>En ligne · Sans inscription</div>
        </div>
        {error && <div style={{ background:'#1a0a0a', border:'1px solid #5a1a1a', borderRadius:10, padding:'12px 16px', marginBottom:16, color:'#ff6b6b', fontSize:14 }}>{error}</div>}
        <Inp placeholder="Ton prénom" value={myName} onChange={e => { setMyName(e.target.value); setError(''); }} maxLength={20} style={{ marginBottom:12, fontSize:18, fontWeight:700 }} />
        <div style={{ marginBottom:20 }}><Btn onClick={createRoom} disabled={loading}>{loading ? 'Création…' : '+ Créer une salle'}</Btn></div>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
          <span style={{ color:'#333', fontSize:13 }}>ou rejoindre avec un code</span>
          <div style={{ flex:1, height:1, background:'#1e1e1e' }} />
        </div>
        <Inp placeholder="CODE DE SALLE" value={joinCode} onChange={e => { setJoinCode(e.target.value.toUpperCase()); setError(''); }} maxLength={6} style={{ marginBottom:12, textAlign:'center', letterSpacing:6, fontSize:22, fontWeight:900 }} />
        <Btn onClick={joinRoom} disabled={loading} variant="secondary">{loading ? 'Connexion…' : 'Rejoindre →'}</Btn>
      </div>
    </div>
  );

  if (screen === 'lobby') {
    const isHost = gs?.hostId === myId;
    return (
      <div style={page}>
        <Head><title>Salon · {roomCode}</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:32 }}>
            <div style={{ color:'#444', fontSize:11, letterSpacing:3, marginBottom:8 }}>CODE DE LA SALLE</div>
            <div onClick={copyCode} className="btn-press bebas" style={{ cursor:'pointer', fontSize:60, letterSpacing:12, lineHeight:1, userSelect:'none' }}>{roomCode}</div>
            <div style={{ color:copied ? '#4ade80' : '#333', fontSize:13, marginTop:8 }}>{copied ? '✓ Copié !' : 'Appuie pour copier · Partage avec tes amis'}</div>
          </div>
          <div style={{ background:'#111', border:'1px solid #1a1a1a', borderRadius:14, padding:16, marginBottom:24 }}>
            <div style={{ fontSize:10, color:'#444', letterSpacing:2, marginBottom:12 }}>JOUEURS ({gs?.players?.length})</div>
            {gs?.players?.map(p => (
              <div key={p.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid #1a1a1a' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'#1e1e1e', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, color:'#666' }}>{p.name[0].toUpperCase()}</div>
                  <span style={{ fontWeight:p.id===myId?700:500, color:p.id===myId?'#fff':'#888', fontSize:15 }}>
                    {p.name}{p.id===myId && <span style={{ color:'#444', fontWeight:400, fontSize:12 }}> (vous)</span>}
                  </span>
                </div>
                {p.id === gs?.hostId && <span style={{ fontSize:11, color:'#f59e0b', fontWeight:700 }}>HÔTE</span>}
              </div>
            ))}
          </div>
          {error && <div style={{ color:'#ff6b6b', fontSize:13, marginBottom:12, textAlign:'center' }}>{error}</div>}
          {isHost
            ? <Btn onClick={startGame} disabled={loading}>{loading ? 'Démarrage…' : `Lancer la partie → (${gs?.players?.length} joueur${gs?.players?.length!==1?'s':''})`}</Btn>
            : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>En attente que l'hôte lance la partie…</div>
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
          <Head><title>Fin de partie !</title></Head>
          <div style={{ width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:60, marginBottom:8 }}>🏆</div>
            <div className="bebas" style={{ fontSize:50, letterSpacing:2 }}>{sorted[0].name} gagne !</div>
            <div style={{ color:'#555', marginBottom:28 }}>{sorted[0].score} points glorieux</div>
            <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
            {gs.hostId === myId
              ? <div style={{ marginTop:20 }}><Btn onClick={resetGame}>Rejouer</Btn></div>
              : <div style={{ color:'#444', marginTop:20, fontSize:14 }}>En attente que l'hôte relance…</div>
            }
          </div>
        </div>
      );
    }

    if (phase === 'winner') return (
      <div style={page}>
        <Head><title>Vainqueur du tour !</title></Head>
        <div style={{ width:'100%' }}>
          <div style={{ textAlign:'center', marginBottom:18 }}>
            <div style={{ fontSize:44, marginBottom:4 }}>🎉</div>
            <div className="bebas" style={{ fontSize:38, letterSpacing:1 }}>{wd.name} remporte le tour !</div>
          </div>
          <BlackCard text={currentBlackCard.text} pick={currentBlackCard.pick} filled={wd.cards} />
          <div style={{ margin:'14px 0 18px' }}>
            {wd.cards.map((c,i) => <div key={i} className="card-shadow" style={{ background:'#fff', color:'#000', borderRadius:12, padding:'12px 16px', fontWeight:700, fontSize:16, marginBottom:8 }}>{c}</div>)}
          </div>
          <Scoreboard players={gs.players} czarId={czar?.id} myId={myId} />
          <div style={{ marginTop:20 }}>
            {isCzar
              ? <Btn onClick={nextRound} disabled={loading}>{loading ? 'Chargement…' : 'Tour suivant →'}</Btn>
              : <div className="pulse" style={{ textAlign:'center', color:'#333', fontSize:14 }}>En attente que {czar?.name} lance le tour suivant…</div>
            }
          </div>
        </div>
      </div>
    );

    if (phase === 'judging') {
      if (!isCzar) return (
        <div style={{ ...page, justifyContent:'center' }}>
          <div style={{ fontSize:52, marginBottom:12 }}>⚖️</div>
          <div className="bebas" style={{ fontSize:34, textAlign:'center' }}>{czar?.name} est en train de juger…</div>
          <div style={{ color:'#444', marginTop:8 }}>Patience !</div>
        </div>
      );
      const orderedSubs = (submissionOrder||[]).filter(pid => submissions[pid]).map((pid,i) => ({ pid, cards:submissions[pid], num:i+1 }));
      return (
        <div style={page}>
          <div style={{ width:'100%' }}>
            <div style={{ background:'#f59e0b', color:'#000', borderRadius:10, padding:'8px 16px', textAlign:'center', fontWeight:700, fontSize:13, marginBottom:16 }}>
              👑 Tu es le Maître Czar — choisis ta favorite !
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:12, paddingBottom:24 }}>
              {orderedSubs.map(sub => (
                <button key={sub.pid} onClick={() => !loading && pickWinner(sub.pid)} className="btn-press card-shadow"
                  style={{ background:'#fff', color:'#000', borderRadius:14, padding:'16px 18px', textAlign:'left', border:'none', cursor:'pointer' }}>
                  <div style={{ fontSize:11, color:'#999', fontWeight:700, marginBottom:8 }}>RÉPONSE {sub.num}</div>
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
              👑 Tu es le Maître Czar — attends les réponses
            </div>
            <BlackCard text={currentBlackCard.text} pick={pick} />
            <div style={{ background:'#111', border:'1px solid #1e1e1e', borderRadius:14, padding:20, textAlign:'center', marginTop:18 }}>
              <div className="bebas" style={{ fontSize:52, letterSpacing:2 }}>{submittedCount}/{nonCzarCount}</div>
              <div style={{ color:'#555', fontSize:14 }}>joueurs ont joué</div>
              {submittedCount > 0 && (
                <button onClick={forceJudging} style={{ marginTop:14, background:'transparent', border:'none', color:'#444', fontSize:12, cursor:'pointer', textDecoration:'underline' }}>
                  Forcer le jugement (passer les AFK)
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
          <div className="bebas" style={{ fontSize:34 }}>Cartes jouées !</div>
          <div style={{ color:'#555', marginTop:6 }}>{submittedCount}/{nonCzarCount} joueurs prêts</div>
          <div className="pulse" style={{ color:'#333', marginTop:6, fontSize:13 }}>En attente des autres…</div>
        </div>
      );

      return (
        <div style={{ ...page, padding:'16px 16px 28px' }}>
          <div style={{ width:'100%' }}>
            <BlackCard text={currentBlackCard.text} pick={pick} filled={selected.map(idx => myHand[idx])} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', margin:'14px 0 12px' }}>
              <div style={{ color:'#555', fontSize:13 }}>
                Choisis {pick} carte{pick>1?'s':''} &nbsp;·&nbsp;
                <span style={{ color:selected.length===pick?'#4ade80':'#777' }}>{selected.length}/{pick}</span>
              </div>
              <button onClick={submitCards} disabled={selected.length!==pick||loading} className="btn-press"
                style={{ background:selected.length===pick?'#fff':'#1a1a1a', color:selected.length===pick?'#000':'#444', border:'none', borderRadius:10, padding:'10px 18px', fontWeight:700, fontSize:14, cursor:selected.length===pick?'pointer':'not-allowed', fontFamily:'inherit' }}>
                {loading ? '…' : 'Jouer →'}
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

  return <div style={{ ...page, justifyContent:'center' }}><div className="pulse" style={{ color:'#333' }}>Chargement…</div></div>;
}
