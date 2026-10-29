
const DATA = window.XESS_DATA || JSON.parse(document.getElementById('data').textContent);
const LEGAL = window.XESS_LEGAL || JSON.parse(document.getElementById('legal').textContent);
const ACTS = DATA.acts, EVENTS = DATA.events, CATS = DATA.cats;
const BIG = [
  ['Physical & Athletic','🏃','신체 & 운동'],
  ['Creative & Performing Arts','🎨','창작 & 공연 예술'],
  ['Leisure & Nature','🌲','여가 & 자연'],
  ['Social & Strategic','🧠','사회 & 전략']];
const SUB_KR = {'Team Sport':'팀 스포츠','Individual Sport':'개인 스포츠','Racket Sport':'라켓 스포츠','Individual Exercise':'개인 운동',
  'Outdoor Exercise':'야외 운동','Mind-Body Wellness':'심신 웰니스','Visual Art':'시각 예술','Creative Art':'창작 예술',
  'Artistic Expression':'예술적 표현','Performing Arts':'공연 예술','Music / Sensory':'음악 / 감각','Nature Activity':'자연 활동',
  'Outdoor Leisure':'야외 여가','Daily Living':'일상생활','Strategy Game':'전략 게임','Recreational Social':'레크리에이션',
  'Music / Social':'음악 / 사교'};

/* ---------- copy ---------- */
const T = {
 en:{home:'Home',activities:'Activities',events:'Events',profile:'Profile',langBtn:'KO',langLabel:'한국어로 보기',
  heroTitle:'Turn Barriers into Beginnings.',
  purpose:'Xess is a free app that helps people with disabilities, and their families and friends, find leisure activities they can enjoy without barriers: adaptive sports, arts and hobbies, local clubs, inclusive events and helpful equipment, all in one place.',
  heroText:'“Turn Barriers into Beginnings” is about seeing challenges as chances to grow—transforming every obstacle into a fresh start and every setback into momentum for what comes next.',
  getStarted:'Get Started',learnMore:'Learn more',trending:'Trending Activities',categories:'Categories',faq:'Frequently Asked Questions',
  viewMoreQ:'View more questions',catFilter:'Category filter',reset:'Reset',allActs:'All Activities',search:'Search activities',
  noMatch:'No activities match these filters.',localEvents:'Local Events',upcoming:'Upcoming',past:'Past events',
  whatIs:n=>`What is ${n}?`,equip:'Equipments',instr:'Instructions',dis:'Disabilities:',fac:'Facilities',comm:'Community',prod:'Products',
  buy:'Click to purchase products above',listen:'Listen',stop:'Stop',listenLong:'Listen to this guide',listenSub:'Reads the guide aloud',listening:'Playing… tap to stop',viewProduct:'View product',download:'Download',notListed:'Not listed yet.',
  viewEvent:'View event page',date:'Date',tbd:'Date to be announced',
  welcome:'Welcome back',
  createTitle:'Create your account',
  pwHint:'At least 6 characters.',pwConfirm:'Confirm password',privacy:'Privacy Policy',terms:'Terms of Service',agree:(a,b)=>`By signing up, you agree to the ${a} and ${b}.`,inKorea:'In Korea',errPwMatch:'Passwords do not match.',fav:'Add to favorites',unfav:'Remove from favorites',favAdded:'Added to favorites',favRemoved:'Removed from favorites',favLogin:'Log in to save favorites',myFavs:'My Favorites',favEmpty:'Tap the heart on any activity to save it here.',browseActs:'Browse activities',or:'or',browse:'Browse without an account',showPw:'Show password',hidePw:'Hide password',
  backLogin:'Back to login',google:'Continue with Google',apple:'Sign in with Apple',googleOff:'Google sign-in works on the live site, not in this preview.',loading:'Loading…',emailPending:'Check your new inbox. Your email changes once you confirm it.',googleEmail:'Your email comes from your Google account.',errMany:'Too many attempts. Wait a few minutes and try again.',errNet:'Could not reach the server. Check your connection and try again.',errRecent:'For security, log out and log in again, then try once more.',errDomain:'This website is not on Firebase’s authorized domains list yet.',errProvider:'This sign-in method is not turned on in Firebase yet.',errGeneric:'Something went wrong. Please try again.',login:'Login',email:'Email',password:'Password',forgot:'Forgot your password?',noAcct:"Don't have an account?",signup:'Sign up',
  haveAcct:'Already have an account?',name:'Name',save:'Save',del:'Delete account',logout:'Logout',saved:'Profile saved',
  delQ:'Delete your account? This permanently removes your account and profile.',cancel:'Cancel',delYes:'Delete',
  reset_pw:'Reset password',resetText:'Enter the email you signed up with and we will send a reset link.',sendLink:'Send reset link',
  resetSent:'If an account exists for that email, a reset link is on its way.',
  errEmail:'Enter a valid email address.',errPw:'Password needs at least 6 characters.',errLogin:'Email or password is incorrect.',
  errExists:'An account with this email already exists. Log in instead.',errName:'Enter your name.',
  about:'About Us',story:'Our Story',
  storyText:'<b>Xess</b> is a platform where every person can enjoy leisure activities <b>without impediment</b>. We aim to organize information tailored for <b>disabled people</b>, breaking the higher barrier that they need to confront when engaging in any community.',
  statNum:'47%',statText:'Nearly half (47%) of adults with disabilities in the U.S. who are able to exercise get no aerobic physical activity.',statSrc:'U.S. Centers for Disease Control and Prevention (CDC), 2014',
  nfTitle:'Page not found',nfText:"We couldn't find that page. It may have moved.",goHome:'Back to Home',
  faqs:[
   ['Do I need an account to participate in activities?','No, you can access the information without logging in.'],
   ['Is it possible to download the information uploaded on the website?','Yes, the rules and instructions are available to download in audio and visual formats.']]},
 ko:{home:'홈',activities:'활동',events:'행사',profile:'프로필',langBtn:'EN',langLabel:'View in English',
  heroTitle:'장벽을 새로운 시작으로.',
  purpose:'Xess는 장애인과 가족, 친구들이 장벽 없이 즐길 수 있는 여가 활동을 찾도록 돕는 무료 앱입니다. 어댑티브 스포츠, 예술과 취미, 지역 클럽, 포용적인 행사, 유용한 장비 정보를 한곳에서 확인하세요.',
  heroText:'“장벽을 새로운 시작으로”는 어려움을 성장의 기회로 바라보는 것입니다. 모든 장애물을 새로운 출발로, 모든 좌절을 다음을 위한 원동력으로 바꿉니다.',
  getStarted:'시작하기',learnMore:'더 알아보기',trending:'인기 활동',categories:'카테고리',faq:'자주 묻는 질문',
  viewMoreQ:'질문 더 보기',catFilter:'카테고리 필터',reset:'초기화',allActs:'전체 활동',search:'활동 검색',
  noMatch:'조건에 맞는 활동이 없습니다.',localEvents:'지역 행사',upcoming:'다가오는 행사',past:'지난 행사',
  whatIs:n=>`${n}란?`,equip:'장비',instr:'활동 방법',dis:'장애 유형:',fac:'시설',comm:'커뮤니티',prod:'추천 제품',
  buy:'위 제품 구매하러 가기',listen:'듣기',stop:'정지',listenLong:'이 가이드 듣기',listenSub:'가이드를 소리 내어 읽어 드려요',listening:'재생 중… 누르면 멈춰요',viewProduct:'제품 보기',download:'다운로드',notListed:'아직 등록된 정보가 없습니다.',
  viewEvent:'행사 페이지 보기',date:'일정',tbd:'일정 추후 공지',
  welcome:'다시 오신 것을 환영해요',
  createTitle:'계정 만들기',
  pwHint:'6자 이상 입력하세요.',pwConfirm:'비밀번호 확인',privacy:'개인정보처리방침',terms:'서비스 이용약관',agree:(a,b)=>`가입하면 ${a} 및 ${b}에 동의하게 됩니다.`,inKorea:'국내 기관',errPwMatch:'비밀번호가 일치하지 않습니다.',fav:'즐겨찾기에 추가',unfav:'즐겨찾기에서 삭제',favAdded:'즐겨찾기에 추가했어요',favRemoved:'즐겨찾기에서 삭제했어요',favLogin:'로그인하면 즐겨찾기를 저장할 수 있어요',myFavs:'나의 즐겨찾기',favEmpty:'활동 페이지에서 하트를 누르면 여기에 저장됩니다.',browseActs:'활동 둘러보기',or:'또는',browse:'로그인 없이 둘러보기',showPw:'비밀번호 보기',hidePw:'비밀번호 숨기기',
  backLogin:'로그인으로 돌아가기',google:'Google로 계속하기',apple:'Apple로 로그인',googleOff:'Google 로그인은 실제 사이트에서 사용할 수 있습니다. (미리보기에서는 작동하지 않아요)',loading:'불러오는 중…',emailPending:'새 이메일함을 확인해 주세요. 인증하면 이메일이 변경됩니다.',googleEmail:'이메일은 Google 계정의 이메일을 사용합니다.',errMany:'시도 횟수가 너무 많습니다. 몇 분 후 다시 시도해 주세요.',errNet:'서버에 연결할 수 없습니다. 인터넷 연결을 확인해 주세요.',errRecent:'보안을 위해 로그아웃 후 다시 로그인한 다음 시도해 주세요.',errDomain:'이 웹사이트가 아직 Firebase 승인 도메인에 등록되지 않았습니다.',errProvider:'이 로그인 방식이 Firebase에서 아직 켜져 있지 않습니다.',errGeneric:'문제가 발생했습니다. 다시 시도해 주세요.',login:'로그인',email:'이메일',password:'비밀번호',forgot:'비밀번호를 잊으셨나요?',noAcct:'계정이 없으신가요?',signup:'회원가입',
  haveAcct:'이미 계정이 있으신가요?',name:'이름',save:'저장',del:'계정 삭제',logout:'로그아웃',saved:'프로필이 저장되었습니다',
  delQ:'계정을 삭제할까요? 계정과 프로필이 영구적으로 삭제됩니다.',cancel:'취소',delYes:'삭제',
  reset_pw:'비밀번호 재설정',resetText:'가입한 이메일을 입력하시면 재설정 링크를 보내드립니다.',sendLink:'재설정 링크 보내기',
  resetSent:'해당 이메일로 가입된 계정이 있다면 재설정 링크가 발송됩니다.',
  errEmail:'올바른 이메일 주소를 입력하세요.',errPw:'비밀번호는 6자 이상이어야 합니다.',errLogin:'이메일 또는 비밀번호가 올바르지 않습니다.',
  errExists:'이미 가입된 이메일입니다. 로그인해 주세요.',errName:'이름을 입력하세요.',
  about:'소개',story:'우리의 이야기',
  storyText:'<b>Xess</b>는 누구나 <b>제약 없이</b> 여가 활동을 즐길 수 있는 플랫폼입니다. <b>장애인</b>이 공동체에 참여할 때 마주하는 높은 장벽을 허물기 위해, 장애인에게 맞춘 정보를 정리합니다.',
  statNum:'47%',statText:'미국에서 운동이 가능한 장애인 성인의 약 절반(47%)이 유산소 신체 활동을 전혀 하지 않습니다.',statSrc:'미국 질병통제예방센터(CDC), 2014',
  nfTitle:'페이지를 찾을 수 없습니다',nfText:'요청하신 페이지가 없거나 이동되었습니다.',goHome:'홈으로 가기',
  faqs:[
   ['활동에 참여하려면 계정이 필요한가요?','아니요, 로그인 없이도 모든 정보를 볼 수 있습니다.'],
   ['웹사이트의 정보를 다운로드할 수 있나요?','네, 규칙과 활동 방법을 음성 및 시각 자료로 다운로드할 수 있습니다.']]}
};


/* ---------- storage (safe) ---------- */
const store = {
  get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
  del(k){try{localStorage.removeItem(k)}catch(e){}}
};
let lang = store.get('xess_lang','en');
let selCats = new Set(), query = '';

/* ---------- accounts ----------
   Live site: Firebase Authentication (+ Firestore for the profile photo, if the database exists).
   Claude preview: Google's servers are blocked there, so a browser-only demo stands in. */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCmXQLoCC5lagnPgGl1GEKdojoYhJf2sXk",
  authDomain: "xess-82d37.firebaseapp.com",
  projectId: "xess-82d37",
  storageBucket: "xess-82d37.firebasestorage.app",
  messagingSenderId: "530637679630",
  appId: "1:530637679630:web:94cab31ed6500be6dbe05f"
};
const FB_VER = '10.12.2';
const IN_PREVIEW = /claude|anthropic|usercontent/i.test(location.hostname);
const CAP = window.Capacitor, NATIVE = !!(CAP && CAP.isNativePlatform && CAP.isNativePlatform());
const PLATFORM = NATIVE ? CAP.getPlatform() : 'web';           // 'android' | 'ios' | 'web'
const plugin = name => (NATIVE && CAP.Plugins && CAP.Plugins[name]) || null;
const USE_FB = !!FIREBASE_CONFIG && !IN_PREVIEW;
const fail = code => Object.assign(new Error(code),{code});
const Acct = { user:null, ready:false, onChange:()=>{} };

if(USE_FB){
  let auth, db=null;
  const add = src => new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
  const base=`https://cdn.jsdelivr.net/npm/firebase@${FB_VER}/`;
  const FB_ERR={'auth/invalid-credential':'errLogin','auth/invalid-login-credentials':'errLogin','auth/wrong-password':'errLogin','auth/user-not-found':'errLogin',
    'auth/email-already-in-use':'errExists','auth/invalid-email':'errEmail','auth/weak-password':'errPw','auth/too-many-requests':'errMany',
    'auth/network-request-failed':'errNet','auth/requires-recent-login':'errRecent','auth/unauthorized-domain':'errDomain',
    'auth/operation-not-allowed':'errProvider','auth/popup-closed-by-user':'','auth/cancelled-popup-request':''};
  const wrap = e => fail(e && e.code in FB_ERR ? FB_ERR[e.code] : 'errGeneric');
  const localPhoto = uid => store.get('xess_avatar_'+uid,'');
  const localFavs = uid => store.get('xess_favs_'+uid,[]);
  async function profileOf(u){
    let photo='', favs=null;
    if(db){ try{ const s=await db.collection('users').doc(u.uid).get(); const d=s.exists?s.data():{}; photo=d.photo||''; favs=Array.isArray(d.favorites)?d.favorites:null; }catch(e){ db=null; } }
    return {uid:u.uid,name:u.displayName||(u.email||'').split('@')[0],email:u.email||'',avatar:photo||localPhoto(u.uid)||u.photoURL||'',
      favs:favs||localFavs(u.uid),
      google:u.providerData.some(p=>p.providerId==='google.com')};
  }
  async function saveDoc(uid,data){
    if(!db) return false;
    try{ await db.collection('users').doc(uid).set(data,{merge:true}); return true; }catch(e){ return false; }
  }
  const ready = add(base+'firebase-app-compat.js')
    .then(()=>Promise.all([add(base+'firebase-auth-compat.js'),add(base+'firebase-firestore-compat.js').catch(()=>null)]))
    .then(()=>{
      firebase.initializeApp(FIREBASE_CONFIG); auth=firebase.auth();
      try{ db=firebase.firestore(); }catch(e){ db=null; }
      auth.onAuthStateChanged(async u=>{ Acct.user = u ? await profileOf(u) : null; Acct.ready=true; Acct.onChange(); });
      auth.getRedirectResult().catch(()=>{});
    })
    .catch(()=>{ Acct.ready=true; Acct.failed=true; Acct.onChange(); });
  const A_ = async fn => { await ready; if(!auth) throw fail('errNet'); try{ return await fn(); }catch(e){ if(e && /^(err|google)/.test(e.code||'')) throw e; throw wrap(e); } };
  Object.assign(Acct,{
    login:(em,pw)=>A_(async()=>{ auth.languageCode=lang; const {user}=await auth.signInWithEmailAndPassword(em,pw); Acct.user=await profileOf(user); }),
    signup:(nm,em,pw)=>A_(async()=>{ const {user}=await auth.createUserWithEmailAndPassword(em,pw);
      await user.updateProfile({displayName:nm}); await saveDoc(user.uid,{name:nm,email:em,createdAt:Date.now()}); Acct.user=await profileOf(user); }),
    google:()=>A_(async()=>{ auth.languageCode=lang; const pr=new firebase.auth.GoogleAuthProvider();
      const FA=plugin('FirebaseAuthentication');
      if(FA){ const r=await FA.signInWithGoogle(); if(!r||!r.credential) throw fail('');
        const {user}=await auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(r.credential.idToken));
        Acct.user=await profileOf(user); return; }
      try{ const {user}=await auth.signInWithPopup(pr); Acct.user=await profileOf(user); }
      catch(e){ if(e.code==='auth/popup-blocked') return auth.signInWithRedirect(pr); throw e; } }),
    apple:()=>A_(async()=>{ const FA=plugin('FirebaseAuthentication'); if(!FA) throw fail('errProvider');
      const r=await FA.signInWithApple(); if(!r||!r.credential) throw fail('');
      const cred=new firebase.auth.OAuthProvider('apple.com').credential({idToken:r.credential.idToken,rawNonce:r.credential.nonce});
      const {user}=await auth.signInWithCredential(cred);
      const nm=(r.user&&r.user.displayName)||''; // Apple only shares the name on the first sign-in
      if(nm&&!user.displayName){ await user.updateProfile({displayName:nm}); await saveDoc(user.uid,{name:nm}); }
      Acct.user=await profileOf(user); }),
    reset:em=>A_(async()=>{ auth.languageCode=lang; try{ await auth.sendPasswordResetEmail(em); }catch(e){ if(e.code!=='auth/user-not-found') throw e; } }),
    save:(nm,em)=>A_(async()=>{ const u=auth.currentUser; let pending=false;
      if(nm!==u.displayName) await u.updateProfile({displayName:nm});
      if(em!==(u.email||'').toLowerCase()){ auth.languageCode=lang; await u.verifyBeforeUpdateEmail(em); pending=true; }
      await saveDoc(u.uid,{name:nm}); Acct.user=Object.assign(Acct.user,{name:nm}); return {pending}; }),
    setAvatar:url=>A_(async()=>{ const u=auth.currentUser;
      if(!(await saveDoc(u.uid,{photo:url}))) store.set('xess_avatar_'+u.uid,url);   // no database yet: keep it on this device
      Acct.user.avatar=url||u.photoURL||''; }),
    setFavs:favs=>A_(async()=>{ const u=auth.currentUser;
      if(!(await saveDoc(u.uid,{favorites:favs}))) store.set('xess_favs_'+u.uid,favs);
      Acct.user.favs=favs; }),
    remove:()=>A_(async()=>{ const u=auth.currentUser; store.del('xess_favs_'+u.uid);
      if(db){ try{ await db.collection('users').doc(u.uid).delete(); }catch(e){} }
      store.del('xess_avatar_'+u.uid); await u.delete(); Acct.user=null; }),
    logout:()=>A_(async()=>{ await auth.signOut(); Acct.user=null; })
  });
} else {
  // browser-only demo for the preview
  const all = () => store.get('xess_accounts',{}), put = v => store.set('xess_accounts',v);
  const load = () => { const s=store.get('xess_session',null), a=s&&all()[s]; Acct.user = a ? {uid:s,name:a.name,email:a.email,avatar:a.avatar||'',favs:a.favs||[]} : null; };
  const setSession = em => { store.set('xess_session',em); load(); };
  load(); Acct.ready=true;
  Object.assign(Acct,{
    login:async(em,pw)=>{ const a=all()[em]; if(!a||a.pw!==pw) throw fail('errLogin'); setSession(em); },
    signup:async(nm,em,pw)=>{ const x=all(); if(x[em]) throw fail('errExists'); x[em]={name:nm,email:em,pw,avatar:''}; put(x); setSession(em); },
    google:async()=>{ throw fail('googleOff'); },
    apple:async()=>{ throw fail('googleOff'); },
    reset:async()=>{},
    save:async(nm,em)=>{ const x=all(),s=Acct.user.uid; if(em!==s&&x[em]) throw fail('errExists');
      const a=x[s]; delete x[s]; a.name=nm; a.email=em; x[em]=a; put(x); setSession(em); return {pending:false}; },
    setAvatar:async url=>{ const x=all(); x[Acct.user.uid].avatar=url; put(x); load(); },
    setFavs:async favs=>{ const x=all(); x[Acct.user.uid].favs=favs; put(x); load(); },
    remove:async()=>{ const x=all(); delete x[Acct.user.uid]; put(x); store.del('xess_session'); load(); },
    logout:async()=>{ store.del('xess_session'); load(); }
  });
}
const t = k => T[lang][k];
const L = (o,f) => (lang==='ko' && o[f+'_kr']) ? o[f+'_kr'] : o[f];

/* ---------- routing: clean paths when hosted, #names inside the preview frame ---------- */
const CLEAN = !NATIVE && location.protocol.startsWith('http') && !/claude|anthropic|usercontent/i.test(location.hostname);
const BASE = window.XESS_BASE ?? ((document.querySelector('meta[name="xess-base"]')||{}).content || '');
function toHash(p){ if(p==='/')return '';
  return p.slice(1).replace(/^activities\//,'activity-').replace(/^events\//,'event-'); }
function fromHash(h){ h=h.replace(/^#/,''); if(!h)return '/';
  if(h.startsWith('activity-'))return '/activities/'+h.slice(9);
  if(h.startsWith('event-'))return '/events/'+h.slice(6); return '/'+h; }
const href = p => CLEAN ? BASE+p : (p==='/'?'#':'#'+toHash(p));
function curPath(){ if(CLEAN){let p=location.pathname.slice(BASE.length)||'/';return p.replace(/\/+$/,'')||'/'} return fromHash(location.hash); }
function go(p,replace){ if(CLEAN){history[replace?'replaceState':'pushState']({},'',BASE+p);render()}
  else{ const h=toHash(p); if(('#'+h)===location.hash||(!h&&!location.hash))render(); else location.hash=h; } }
function back(fallback){ if(history.length>1) history.back(); else go(fallback); }
document.addEventListener('click',e=>{
  const x=NATIVE && e.target.closest('a[target="_blank"]');
  if(x){ e.preventDefault(); const B=plugin('Browser'); if(B) B.open({url:x.href}); else window.open(x.href,'_system'); return; }
  const a=e.target.closest('a[data-link]'); if(!a||e.metaKey||e.ctrlKey)return;
  e.preventDefault(); go(a.dataset.link);
});
window.addEventListener('popstate',()=>CLEAN&&render());
window.addEventListener('hashchange',()=>!CLEAN&&render());

/* ---------- helpers ---------- */
const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const A = (p,inner,cls='',extra='') => `<a href="${href(p)}" data-link="${p}" class="${cls}" ${extra}>${inner}</a>`;
const ext = (u,inner) => `<a href="${esc(u)}" target="_blank" rel="noopener">${inner}</a>`;
function bb(s){ // the Bubble BBCode used in CommunityENG / ProductList
  return esc(s)
    .replace(/\[url=([^\]]+?)\]/g,(m,u)=>`<a href="${u.trim()}" target="_blank" rel="noopener">`).replace(/\[\/url\]/g,'</a>')
    .replace(/\[\/?color[^\]]*\]/g,'').replace(/\[b\]/g,'<strong>').replace(/\[\/b\]/g,'</strong>')
    .replace(/\[\/?(i|u)\]/g,'');
}
// split a one-line list on commas that are not inside brackets
function splitTop(s){ const out=[];let depth=0,cur='';
  for(const ch of s){ if(ch==='(')depth++; if(ch===')')depth--; if(ch===','&&depth===0){out.push(cur);cur=''} else cur+=ch; }
  out.push(cur); return out.map(x=>x.trim()).filter(Boolean); }
const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
function bulletItem(l){
  l=l.replace(/^\d+[.)]\s*/,'').trim();
  if(!/[.!?]\s/.test(l)) l=l.replace(/\.$/,'');   // one-sentence bullets drop the full stop
  let m=l.match(/^([^:(]{2,40}?)(?::| — | – )\s*(.+)$/) || l.match(/^([^.]{2,40}\.)\s+(.+)$/);
  return m ? `<li><strong>${esc(cap(m[1].replace(/\.$/,'')))}</strong>${m[0].includes(':')||m[0].includes(' — ')||m[0].includes(' – ')?':':'.'} ${esc(m[2])}</li>` : `<li>${esc(cap(l))}</li>`;
}
const bullets = items => `<ul class="bullets">${items.map(bulletItem).join('')}</ul>`;
// mode 'list': comma lists (equipment, disabilities, facilities); mode 'steps': instructions
function listify(s,mode){
  const lines=String(s||'').replace(/\r/g,'').split(/\n+/).map(l=>l.trim()).filter(Boolean);
  if(lines.length>=2) return bullets(lines);
  const one=lines[0]||'';
  const semi=one.split(/;\s+/).filter(Boolean);
  if(semi.length>=2) return bullets(semi.map(p=>p.replace(/^(and|or)\s+/i,'')));
  if(mode==='steps'){ // several sentences read better as steps
    const sents=one.split(/(?<=[.!?])\s+(?=[A-Z가-힣])/); if(sents.length>=2) return bullets(sents);
  }
  if(mode==='list' && !/[.]\s/.test(one.replace(/\.$/,''))){
    let parts=splitTop(one.replace(/\.$/,'')).map(p=>p.replace(/^(and|or|및)\s+/i,''));
    // a trailing qualifier ("depending on…") belongs to the item before it
    parts=parts.reduce((acc,p)=>{ if(acc.length&&/^(depending|depends|if |when |as needed)/i.test(p)) acc[acc.length-1]+=', '+p; else acc.push(p); return acc; },[]);
    if(parts.length>=2 && parts.every(p=>p.length<=80)) return bullets(parts);
  }
  return paras(s);
}
function paras(s){
  const lines=String(s||'').replace(/\r/g,'').split(/\n+/).map(l=>l.trim()).filter(Boolean);
  return `<div class="paras">${lines.map(l=>{
    const m=l.match(/^([^:.!?]{2,32}):\s+(.+)$/);
    return `<p>${m?`<strong>${esc(m[1])}:</strong> ${esc(m[2])}`:esc(l)}</p>`;
  }).join('')}</div>`;
}
const fixUrl = u => /^https?:/.test(u)?u:'https://'+u;
const host = u => {try{return new URL(fixUrl(u)).hostname.replace(/^www\./,'')}catch(e){return u}};
function iconImg(a,cls=''){
  const emo=`<span class="emo ${cls}" aria-hidden="true">${a.emoji}</span>`;
  return a.img ? `<img src="${esc(a.img)}" alt="" class="${cls}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'emo ${cls}',textContent:'${a.emoji}'}))">` : emo;
}
const tile = a => A('/activities/'+a.slug, `<div class="art">${iconImg(a)}</div><div class="lbl">${esc(L(a,'name'))}</div>`, 'tile');
const IP = {
 book:'<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2zM22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
 bag:'<path d="M5 9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6M9 13h6M9 17h6"/>',
 steps:'<path d="M3 6l1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17M11 6h10M11 12h10M11 18h10"/>',
 access:'<circle cx="15.5" cy="4.5" r="1.5"/><path d="m18 19 1-7-6 1M5.5 8.5l3-3 5.5 3-2.4 3.5M4.2 14.5a5 5 0 0 0 6.9 6M13.8 17.5a5 5 0 0 0-6.9-6"/>',
 building:'<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M9.5 21.5v-4h5v4M8.5 7h.01M12 7h.01M15.5 7h.01M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 15h.01M12 15h.01M15.5 15h.01"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
 cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2.6l2.4 11.6a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.5L21.5 8H6.1"/>',
 dumbbell:'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
 palette:'<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.4-4.5-8.6-10-8.6z"/>',
 tree:'<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17zM12 22v-3"/>',
 puzzle:'<path d="M15.4 4.4a1 1 0 0 0 1.7-.5 2.5 2.5 0 1 1 3 3 1 1 0 0 0-.5 1.7l1.7 1.7a2.4 2.4 0 0 1 0 3.4l-1.7 1.7a1 1 0 0 1-1.7-.5 2.5 2.5 0 1 0-3 3 1 1 0 0 1 .5 1.7l-1.7 1.7a2.4 2.4 0 0 1-3.4 0l-1.7-1.7a1 1 0 0 0-1.7.5 2.5 2.5 0 1 1-3-3 1 1 0 0 0 .5-1.7l-1.7-1.7a2.4 2.4 0 0 1 0-3.4l1.7-1.7a1 1 0 0 1 1.7.5 2.5 2.5 0 1 0 3-3 1 1 0 0 1-.5-1.7l1.7-1.7a2.4 2.4 0 0 1 3.4 0z"/>',
 volume:'<path d="M11 5 6 9H2.5v6H6l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
 play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
 stop:'<rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor"/>',
 download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
 mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
 lock:'<rect x="4" y="11" width="16" height="10.5" rx="2.5"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
 eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 eyeOff:'<path d="M3 3l18 18M10.6 5.1Q11.3 5 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3.1M6.6 6.6C3.8 8.4 2 12 2 12s3.5 7 10 7c1.8 0 3.4-.5 4.8-1.3M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
 person:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
 extLink:'<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.8-9.8M17 6l3 3M14.5 8.5l2 2"/>',
 check:'<path d="M20 6 9 17l-5-5"/>'
};
const ico = (n,s=20) => `<svg class="i" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IP[n]}</svg>`;
const SVG = {
 globe:'<svg width="17" height="17" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm88,104a87.61,87.61,0,0,1-3.33,24H174.16a157.44,157.44,0,0,0,0-48h38.51A87.61,87.61,0,0,1,216,128ZM102,168H154a115.11,115.11,0,0,1-26,45A115.27,115.27,0,0,1,102,168Zm-3.9-16a140.84,140.84,0,0,1,0-48h59.88a140.84,140.84,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.84a157.44,157.44,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154,88H102a115.11,115.11,0,0,1,26-45A115.27,115.27,0,0,1,154,88Zm52.33,0H170.71a135.28,135.28,0,0,0-22.3-45.6A88.29,88.29,0,0,1,206.37,88ZM107.59,42.4A135.28,135.28,0,0,0,85.29,88H49.63A88.29,88.29,0,0,1,107.59,42.4ZM49.63,168H85.29a135.28,135.28,0,0,0,22.3,45.6A88.29,88.29,0,0,1,49.63,168Zm98.78,45.6a135.28,135.28,0,0,0,22.3-45.6h35.66A88.29,88.29,0,0,1,148.41,213.6Z"/></svg>',
 back:'<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>',
 x:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
 home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path class="home-shape" d="M3.5 10.2 12 3.4l8.5 6.8V19a2 2 0 0 1-2 2h-3.6v-5.6a1.3 1.3 0 0 0-1.3-1.3h-3.2a1.3 1.3 0 0 0-1.3 1.3V21H5.5a2 2 0 0 1-2-2z"/></svg>',
 ball:'<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm76.52,147.42H170.9l-9.26-12.76,12.63-36.78,15-4.89,26.24,20.13A87.38,87.38,0,0,1,204.52,171.42Zm-164-34.3L66.71,117l15,4.89,12.63,36.78L85.1,171.42H51.48A87.38,87.38,0,0,1,40.47,137.12Zm10-50.64,5.51,18.6L40.71,116.77A87.33,87.33,0,0,1,50.43,86.48ZM109,152,97.54,118.65,128,97.71l30.46,20.94L147,152Zm91.07-46.92,5.51-18.6a87.33,87.33,0,0,1,9.72,30.29Zm-6.2-35.38-9.51,32.08-15.07,4.89L136,83.79V68.21l29.09-20A88.58,88.58,0,0,1,193.86,69.7ZM146.07,41.87,128,54.29,109.93,41.87a88.24,88.24,0,0,1,36.14,0ZM90.91,48.21l29.09,20V83.79L86.72,106.67l-15.07-4.89L62.14,69.7A88.58,88.58,0,0,1,90.91,48.21ZM63.15,187.42H83.52l7.17,20.27A88.4,88.4,0,0,1,63.15,187.42ZM110,214.13,98.12,180.71,107.35,168h41.3l9.23,12.71-11.83,33.42a88,88,0,0,1-36.1,0Zm55.36-6.44,7.17-20.27h20.37A88.4,88.4,0,0,1,165.31,207.69Z"/></svg>',
 cal:'<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"/></svg>',
 user:'<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg>',
 person:'<svg width="62%" viewBox="0 0 100 100" fill="var(--ph-ink)"><circle cx="50" cy="33" r="19"/><path d="M14 92c3-20 18-31 36-31s33 11 36 31z"/></svg>'
};
const langPill = () => `<button class="lang-pill" id="lang-toggle" type="button" aria-label="${t('langLabel')}">${SVG.globe}${t('langBtn')}</button>`;
const topbar = (title,fallback,right='<span></span>') => `<header class="card topbar"><button class="icon-btn" data-back="${fallback}" aria-label="Back">${SVG.back}</button><h1>${esc(title)}</h1>${right}</header>`;
const HEART = '<svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"/></svg>', HEART_FILL = '<svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M240,102c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,228.66,16,172,16,102A62.07,62.07,0,0,1,78,40c20.65,0,38.73,8.88,50,23.89C139.27,48.88,157.35,40,178,40A62.07,62.07,0,0,1,240,102Z"/></svg>';
const isFav = slug => !!(Acct.user && (Acct.user.favs||[]).includes(slug));
const favBtn = slug => `<button class="icon-btn fav-btn" id="fav" type="button" aria-pressed="${isFav(slug)}" aria-label="${t(isFav(slug)?'unfav':'fav')}">${isFav(slug)?HEART_FILL:HEART}</button>`;
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>el.hidden=true,2200)}
const today = new Date().toISOString().slice(0,10);
function catChips(clickable){
  return BIG.map(([big,ic,bigKr])=>{
    const subs=Object.keys(CATS).filter(s=>CATS[s]===big);
    return `<div class="cat-group"><h3><span aria-hidden="true">${ic}</span>${lang==='ko'?bigKr:big}</h3><div class="chips">${
      subs.map(s=>`<button type="button" class="chip" data-cat="${esc(s)}" aria-pressed="${selCats.has(s)}">${lang==='ko'?SUB_KR[s]:s}</button>`).join('')
    }</div></div>`}).join('');
}

/* ---------- views ---------- */
const V = {};
V.home = () => `
 <section class="card stack" style="gap:18px">
   <div class="brand"><span class="logo">Xess<b>.</b></span>${langPill()}</div>
   <h1 class="h-xl">${t('heroTitle')}</h1>
   <p class="purpose">${t('purpose')}</p>
   <p>${t('heroText')}</p>
   <div class="btn-row">${A('/activities',t('getStarted'),'btn')}${A('/about',t('learnMore'),'btn ghost')}</div>
 </section>
 <section class="hero-art"><img src="images/hero.avif" width="768" height="450" alt="${lang==='ko'?'그림을 그리는 사람과 메달을 들고 기뻐하는 장애인 선수들':'A painter at her easel beside athletes, one in a wheelchair, celebrating with medals'}"></section>
 <section class="card stack" style="gap:18px">
   <h2 class="h-lg">${t('trending')}</h2>
   <div class="grid3">${ACTS.filter(a=>a.featured).map(tile).join('')}</div>
 </section>
 <section class="card stack" style="gap:18px">
   <h2 class="h-lg">${t('categories')}</h2>${catChips()}
 </section>
 <section class="card stack" style="gap:18px">
   <h2 class="h-lg">${t('faq')}</h2>
   <dl class="faq">${t('faqs').map(([q,a])=>`<dt>Q. ${q}</dt><dd>A. ${a}</dd>`).join('')}</dl>
   <div class="center">${A('/faq',t('viewMoreQ'),'btn')}</div>
 </section>
 ${legalLinks()}`;

function filteredActs(){
  const q=query.trim().toLowerCase();
  return ACTS.filter(a=>(!selCats.size||selCats.has(a.cat)) &&
    (!q||a.name.toLowerCase().includes(q)||a.name_kr.includes(q)||a.cat.toLowerCase().includes(q)));
}
V.activities = () => `
 <section class="card stack" style="gap:16px">
   <div class="card-head"><h1 class="h-lg">${t('catFilter')}</h1><button class="link-btn" id="reset" type="button">${t('reset')}</button></div>
   ${catChips()}
 </section>
 <section class="card stack" style="gap:18px">
   <h2 class="h-lg">${t('allActs')}</h2>
   <input class="search" id="q" type="search" placeholder="${t('search')}" aria-label="${t('search')}" value="${esc(query)}">
   <div id="act-grid"></div>
 </section>`;
function paintGrid(){
  const g=document.getElementById('act-grid'); if(!g)return;
  const list=filteredActs();
  g.innerHTML = list.length ? `<div class="grid3">${list.map(tile).join('')}</div>` : `<p class="empty">${t('noMatch')}</p>`;
}

function sec(icon,title,body){ return `<section class="card sec"><h2><span class="ic" aria-hidden="true">${icon}</span>${title}</h2>${body}</section>`; }
V.activity = slug => {
  const a=ACTS.find(x=>x.slug===slug); if(!a) return null;
  const nm=L(a,'name'); const none=`<p class="muted">${t('notListed')}</p>`;
  const para = s => s ? paras(s) : none; const list = (s,m='list') => s ? listify(s,m) : none;
  const arrow = `<span class="ext" aria-hidden="true">↗</span>`;
  // in Korean, Korean organizations come first, then the translated local clubs
  const korOrgs = lang==='ko' ? (a.kor_orgs||[]).map(o=>({name:o.name||host(o.url),url:fixUrl(o.url),desc:'',kr:true})) : [];
  const clubs = [...korOrgs, ...a.clubs.map(c=>({name:c.name,url:c.url,desc:L(c,'desc')}))];
  const comm = clubs.length ? `<ul class="items">${clubs.map(c=>`<li>
      <a class="item-link" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}${arrow}</a>
      ${c.kr?`<span class="tag kr-tag">${t('inKorea')}</span>`:''}${c.desc?`<p>${esc(c.desc)}</p>`:''}</li>`).join('')}</ul>` : para('');
  const summary = (a.product||a.product_link) ? `<div class="prod-sum${a.prods.length?' has-list':''}">${a.product?`<p>${esc(L(a,'product'))}</p>`:''}${a.product_link?`<a class="item-link" href="${esc(a.product_link)}" target="_blank" rel="noopener">${t('buy')}${arrow}</a>`:''}</div>` : '';
  const prod = (summary||a.prods.length) ? `${summary}${a.prods.length?`<ul class="items">${a.prods.map((g,i)=>`<li>
      <h3 class="item-title"><span class="num">${i+1}</span>${esc(L(g,'title'))}</h3>
      ${g.intro?`<p>${esc(g.intro)}</p>`:''}
      ${g.options.map(o=>`<div class="opt"><a class="item-link" href="${esc(o.url)}" target="_blank" rel="noopener">${esc(L(o,'label')||t('viewProduct'))}${arrow}</a>${o.desc?`<p>${esc(L(o,'desc'))}</p>`:''}</div>`).join('')}
    </li>`).join('')}</ul>`:''}` : para('');
  const instr=L(a,'instr');
  return `${topbar(nm,'/activities',favBtn(a.slug))}
  <section class="card sec">
    ${iconImg(a,'lead-icon')}
    <span class="tag">${lang==='ko'?SUB_KR[a.cat]:a.cat}</span>
    <h2>${esc(t('whatIs')(nm))}</h2>
    ${para(L(a,'about'))}
    <div class="audio">
      <button class="audio-btn" id="listen" type="button" aria-pressed="false">
        <span class="play" id="listen-ic">${ico('play',20)}</span>
        <span class="audio-txt"><strong>${t('listenLong')}</strong><small id="listen-sub">${t('listenSub')}</small></span>
        <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      </button>
      ${CLEAN?`<button class="audio-dl" id="dl" type="button" aria-label="${t('download')}">${ico('download',20)}</button>`:''}
    </div>
  </section>
  ${sec('🎒',t('equip'),list(L(a,'equip')))}
  ${sec('📋',t('instr'),list(instr,'steps'))}
  ${sec('♿',t('dis'),list(L(a,'dis')))}
  ${sec('🏟️',t('fac'),list(L(a,'fac')))}
  ${sec('💞',t('comm'),comm)}
  ${sec('🛒',t('prod'),prod)}`;
};
function guideText(a){ return [L(a,'name'),L(a,'about'),t('equip')+': '+L(a,'equip'),t('instr')+': '+L(a,'instr'),t('dis')+' '+L(a,'dis'),t('fac')+': '+L(a,'fac')].filter(Boolean).join('\n\n'); }

function evDate(e){
  if(lang!=='ko'||!e.iso) return e.date;
  const dt=new Date(e.iso+'T12:00:00'), wd='일월화수목금토'[dt.getDay()];
  let s=`${dt.getMonth()+1}월 ${dt.getDate()}일 (${wd})`;
  const tm=(e.date.split('•')[1]||'').trim();
  const k=x=>x.replace(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/gi,(m,h,mi,ap)=>`${ap.toUpperCase()==='AM'?'오전':'오후'} ${h}시${mi&&mi!=='00'?` ${mi}분`:''}`);
  if(tm) s+=' • '+(/^Starts at/i.test(tm) ? k(tm.replace(/^Starts at\s*/i,''))+' 시작' : k(tm).replace(/\s*-\s*/,' - '));
  return s;
}
const evPic = e => e.img ? `<img src="${esc(e.img)}" alt="" loading="lazy" onerror="this.remove()">` : '';
const evCard = e => A('/events/'+e.slug,
  `<div class="pic"><span class="emo" aria-hidden="true">📅</span>${evPic(e)}</div>
   <div class="txt">${e.date?`<span class="d">${esc(evDate(e))}</span>`:''}<h3>${esc(L(e,'title'))}</h3><p>${esc(L(e,'desc'))}</p></div>`,
  'ev'+(e.iso&&e.iso<today?' past':''));
V.events = () => {
  const up=EVENTS.filter(e=>!e.iso||e.iso>=today).sort((a,b)=>(a.iso||'9')<(b.iso||'9')?-1:1);
  const past=EVENTS.filter(e=>e.iso&&e.iso<today).sort((a,b)=>a.iso<b.iso?1:-1);
  return `<section class="card stack" style="gap:18px">
    <h1 class="h-lg">${t('localEvents')}</h1>
    <span class="tag">${t('upcoming')}</span>
    <div class="grid2">${up.map(evCard).join('')}</div>
    ${past.length?`<span class="tag" style="margin-top:10px">${t('past')}</span><div class="grid2">${past.map(evCard).join('')}</div>`:''}
  </section>`;
};
V.event = slug => {
  const e=EVENTS.find(x=>x.slug===slug); if(!e) return null;
  const body = lang==='ko' ? e.desc_kr||e.desc : (e.body||e.desc);
  return `${topbar(t('events'),'/events')}
  <section class="card stack">
    ${e.img?`<img class="ev-hero" src="${esc(e.img)}" alt="" onerror="this.remove()">`:''}
    <h1 class="h-md" style="font-size:24px">${esc(L(e,'title'))}</h1>
    <div class="meta"><span aria-hidden="true">📅</span><span>${esc(evDate(e)||t('tbd'))}</span></div>
    ${paras(body)}
    <div class="ev-cta">${ext(e.url,`<span class="btn">${t('viewEvent')} ↗</span>`).replace('<a ','<a style="text-decoration:none" ')}</div>
  </section>`;
};

V.about = () => `${topbar(t('about'),'/')}
 <section class="card stack" style="gap:18px">
   <h1 class="h-lg" style="font-size:clamp(30px,7vw,40px)">${t('story')}</h1>
   <p style="font-size:16.5px">${t('storyText')}</p>
   <p class="stat">${t('statNum')}</p>
   <div><p style="font-size:16.5px">${t('statText')}</p><p class="src">${t('statSrc')}</p></div>
   <div class="hero-art" style="padding:8px"><img src="images/our-story.avif" width="768" height="695" alt="${lang==='ko'?'다양한 사람들의 손이 모여 만든 하트':'Many different hands joining to form a heart'}"></div>
 </section>`;

V.faq = () => `${topbar(t('faq'),'/')}
 <section class="card"><dl class="faq">${t('faqs').map(([q,a])=>`<dt>Q. ${q}</dt><dd>A. ${a}</dd>`).join('')}</dl></section>`;

const authHead = (icon,title,sub) => `<div class="auth-head"><span class="badge lg">${ico(icon,26)}</span><h1 class="h-lg">${title}</h1>${sub?`<p class="muted">${sub}</p>`:''}</div>`;
const fld = (id,label,icon,type,ac,extra='') => `<div class="field"><label for="${id}">${label}</label>
  <div class="input-wrap">${ico(icon,20)}<input class="input" id="${id}" type="${type}" autocomplete="${ac}" ${extra}>${type==='password'?`<button type="button" class="pw-eye" data-eye="${id}" aria-label="${t('showPw')}">${ico('eye',20)}</button>`:''}</div></div>`;
const appleBtn = () => PLATFORM==='ios' ? `<button class="btn apple block" type="button" data-apple><svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor" aria-hidden="true"><path d="M788 341c-6 4-108 62-108 190 0 148 130 200 134 202-1 3-21 72-69 142-43 62-88 124-156 124s-86-40-165-40c-77 0-104 41-166 41s-106-57-156-127C44 791 0 669 0 553 0 367 121 268 240 268c63 0 116 42 156 42 38 0 97-44 169-44 27 0 126 2 191 75zM554 160c30-35 51-84 51-133 0-7-1-14-2-19-48 2-106 32-140 72-27 31-53 80-53 130 0 8 1 15 2 18 3 1 8 1 13 1 43 0 98-29 129-69z"/></svg><span>${t('apple')}</span></button>` : '';
const googleBtn = () => `<button class="btn google block" type="button" data-google><svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg><span>${t('google')}</span></button>`;
const browse = () => `<div class="or"><span>${t('or')}</span></div>${A('/activities',`${t('browse')}${ico('arrow',18)}`,'btn ghost block')}`;
V.login = () => `${topbar(t('login'),'/')}
 <section class="card auth"><form class="form" id="f-login" novalidate>
   ${authHead('person',t('welcome'),'')}
   ${fld('li-email',t('email'),'mail','email','email','placeholder="you@example.com" required')}
   ${fld('li-pw',t('password'),'lock','password','current-password','required')}
   <p class="right">${A('/forgot',t('forgot'),'subtle-link')}</p>
   <p class="err" id="li-err" role="alert"></p>
   <button class="btn block" type="submit">${t('login')}</button>
   <div class="or"><span>${t('or')}</span></div>
   ${appleBtn()}${googleBtn()}
   <p class="swap">${A('/signup',`${t('noAcct')} <strong>${t('signup')}</strong>`,'swap-link')}</p>
 </form></section>`;
V.signup = () => `${topbar(t('signup'),'/login')}
 <section class="card auth"><form class="form" id="f-signup" novalidate>
   ${authHead('person',t('createTitle'),'')}
   ${fld('su-name',t('name'),'person','text','name','required')}
   ${fld('su-email',t('email'),'mail','email','email','placeholder="you@example.com" required')}
   ${fld('su-pw',t('password'),'lock','password','new-password','required minlength="6" aria-describedby="su-hint"')}
   <p class="hint" id="su-hint">${t('pwHint')}</p>
   ${fld('su-pw2',t('pwConfirm'),'lock','password','new-password','required')}
   <p class="err" id="su-err" role="alert"></p>
   <p class="agree">${t('agree')(A('/terms',t('terms')),A('/privacy',t('privacy')))}</p>
   <button class="btn block" type="submit">${t('signup')}</button>
   <div class="or"><span>${t('or')}</span></div>
   ${appleBtn()}${googleBtn()}
   <p class="swap">${A('/login',`${t('haveAcct')} <strong>${t('login')}</strong>`,'swap-link')}</p>
 </form></section>`;
V.forgot = () => `${topbar(t('reset_pw'),'/login')}
 <section class="card auth"><form class="form" id="f-forgot" novalidate>
   ${authHead('key',t('reset_pw'),t('resetText'))}
   ${fld('fp-email',t('email'),'mail','email','email','placeholder="you@example.com" required')}
   <p class="err" id="fp-err" role="status"></p>
   <button class="btn block" type="submit">${t('sendLink')}</button>
   <p class="swap">${A('/login',t('backLogin'),'strong-link')}</p>
 </form></section>`;
V.profile = () => {
  if(!Acct.ready) return `<section class="card nf"><p class="muted">${t('loading')}</p></section>`;
  const u=Acct.user; if(!u) return V.login();
  return `<section class="card stack" style="gap:16px">
   <h1 class="h-lg" style="text-align:center;font-size:clamp(32px,8vw,44px)">${t('profile')}</h1>
   <div class="avatar-wrap">
     <button class="avatar" id="avatar" type="button" aria-label="Change photo">${u.avatar?`<img src="${u.avatar}" alt="">`:SVG.person}</button>
     ${u.avatar?`<button class="icon-btn avatar-x muted" id="avatar-x" type="button" aria-label="Remove photo">${SVG.x}</button>`:''}
   </div>
   <form class="form" id="f-profile" novalidate>
     <div class="field"><label for="pf-name">${t('name')}</label><input class="input" id="pf-name" value="${esc(u.name)}" autocomplete="name"></div>
     <div class="field"><label for="pf-email">${t('email')}</label><input class="input" id="pf-email" type="email" value="${esc(u.email)}" autocomplete="email" ${u.google?'readonly aria-describedby="pf-gnote"':''}></div>
     ${u.google?`<p class="hint" id="pf-gnote">${t('googleEmail')}</p>`:''}
     <p class="err" id="pf-err" role="alert"></p>
     <div class="center"><button class="btn wide" type="submit">${t('save')}</button></div>
   </form>
   <div class="split"><button class="danger" id="del" type="button">${t('del')}</button><button id="logout" type="button">${t('logout')}</button></div>
   <div class="confirm" id="del-confirm" hidden><p>${t('delQ')}</p><p class="err" id="del-err" role="alert"></p><div class="center btn-row"><button class="btn ghost" id="del-no" type="button">${t('cancel')}</button><button class="btn" id="del-yes" type="button">${t('delYes')}</button></div></div>
   <div class="center">${langPill()}</div>
 </section>
 <section class="card stack" style="gap:18px">
   <div class="card-head"><h2 class="h-lg">${t('myFavs')}</h2>${(u.favs||[]).length?`<span class="count">${(u.favs||[]).length}</span>`:''}</div>
   ${(()=>{ const list=(u.favs||[]).map(s=>ACTS.find(a=>a.slug===s)).filter(Boolean);
      return list.length ? `<div class="grid3">${list.map(tile).join('')}</div>`
        : `<div class="fav-empty"><span class="fav-empty-ic">${HEART}</span><p>${t('favEmpty')}</p>${A('/activities',t('browseActs'),'btn')}</div>`; })()}
 </section>
 ${legalLinks()}`;
};
V.doc = kind => { const d=LEGAL[kind][lang==='ko'?'ko':'en'];
  return `${topbar(d.title,'/')}
 <article class="card doc"><p class="doc-meta">${d.meta}</p>${d.body}</article>`; };
const legalLinks = () => `<nav class="legal-links" aria-label="Legal">${A('/privacy',t('privacy'))}<span aria-hidden="true">·</span>${A('/terms',t('terms'))}</nav>`;
V.notFound = () => `<section class="card nf"><span class="big">404</span><h1 class="h-md">${t('nfTitle')}</h1><p class="muted">${t('nfText')}</p>${A('/',t('goHome'),'btn')}</section>`;

/* ---------- render ---------- */
function route(p){
  let m;
  if(p==='/') return ['home',V.home()];
  if(p==='/activities') return ['activities',V.activities()];
  if((m=p.match(/^\/activities\/([\w-]+)$/))) return ['activities',V.activity(m[1])];
  if(p==='/events') return ['events',V.events()];
  if((m=p.match(/^\/events\/([\w-]+)$/))) return ['events',V.event(m[1])];
  if(p==='/profile') return ['profile',V.profile()];
  if(['/login','/signup','/forgot'].includes(p)) return [p==='/forgot'?'auth':'auth',V[p.slice(1)]()];
  if(p==='/about') return ['home',V.about()];
  if(p==='/faq') return ['home',V.faq()];
  if(p==='/privacy'||p==='/terms') return ['none',V.doc(p.slice(1))];
  return ['none',null];
}
const TABS=[['/','home','home'],['/activities','activities','ball'],['/events','events','cal'],['/profile','profile','user']];
function render(){
  try{ window.speechSynthesis&&speechSynthesis.cancel(); const T=plugin('TextToSpeech'); T&&T.stop(); }catch(e){}
  document.documentElement.lang = lang==='ko'?'ko':'en';
  const p=curPath(); let [tab,html]=route(p);
  if(html==null){ tab='none'; html=V.notFound(); }
  const app=document.getElementById('app'); app.innerHTML=html;
  const noNav = tab==='auth';
  document.body.classList.toggle('no-nav',noNav);
  document.getElementById('tabbar').hidden = noNav;
  document.getElementById('tabs').innerHTML = TABS.map(([path,key,ic])=>
    A(path,`${SVG[ic]}<span>${t(key)}</span>`,'',tab===key?'aria-current="page"':'')).join('');
  const h1=document.querySelector('#app .topbar h1, #app h1');
  document.title = p==='/' ? 'Xess · '+(lang==='ko'?'장벽 없이 누구나 즐기는 여가 활동':'Leisure activities for everyone, without barriers') : 'Xess · '+((h1&&h1.textContent.trim())||'');
  bind(p);
  if(!render.keepScroll) window.scrollTo(0,0); render.keepScroll=false;
}
function bind(p){
  const $=id=>document.getElementById(id);
  $('lang-toggle')?.addEventListener('click',()=>{lang=lang==='en'?'ko':'en';store.set('xess_lang',lang);render.keepScroll=true;render()});
  document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>back(b.dataset.back)));
  document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
    const s=c.dataset.cat;
    if(p==='/'){ selCats=new Set([s]); go('/activities'); return; }
    selCats.has(s)?selCats.delete(s):selCats.add(s); c.setAttribute('aria-pressed',selCats.has(s)); paintGrid();
  }));
  if(p==='/activities'){ paintGrid();
    $('reset').addEventListener('click',()=>{selCats.clear();query='';$('q').value='';document.querySelectorAll('.chip').forEach(c=>c.setAttribute('aria-pressed','false'));paintGrid()});
    $('q').addEventListener('input',e=>{query=e.target.value;paintGrid()});
  }
  const am=p.match(/^\/activities\/([\w-]+)$/), act=am&&ACTS.find(x=>x.slug===am[1]);
  if(act){
    $('fav')?.addEventListener('click',async e=>{
      const b=e.currentTarget;
      if(!Acct.user){ toast(t('favLogin')); go('/login'); return; }
      const cur=Acct.user.favs||[], on=!cur.includes(act.slug);
      const next=on?[...cur,act.slug]:cur.filter(s=>s!==act.slug);
      Acct.user.favs=next; b.setAttribute('aria-pressed',on); b.innerHTML=on?HEART_FILL:HEART; b.setAttribute('aria-label',t(on?'unfav':'fav'));
      b.classList.remove('pop'); void b.offsetWidth; if(on) b.classList.add('pop');
      toast(t(on?'favAdded':'favRemoved'));
      try{ await Acct.setFavs(next); }catch(err){ Acct.user.favs=cur; toast(t('errGeneric')); render.keepScroll=true; render(); }
    });
    const lb=$('listen');
    const setPlaying=on=>{ if(!document.body.contains(lb))return; lb.classList.toggle('playing',on); lb.setAttribute('aria-pressed',on);
      $('listen-ic').innerHTML=ico(on?'stop':'play',20); $('listen-sub').textContent=t(on?'listening':'listenSub'); };
    const TTS=plugin('TextToSpeech');
    lb?.addEventListener('click',async()=>{
      if(TTS){
        if(lb.classList.contains('playing')){ await TTS.stop(); setPlaying(false); return; }
        setPlaying(true);
        try{ await TTS.speak({text:guideText(act),lang:lang==='ko'?'ko-KR':'en-US',rate:1.0}); }catch(e){}
        setPlaying(false); return;
      }
      const s=window.speechSynthesis; if(!s)return;
      if(s.speaking){s.cancel();setPlaying(false);return}
      const u=new SpeechSynthesisUtterance(guideText(act)); u.lang=lang==='ko'?'ko-KR':'en-US';
      u.onend=u.onerror=()=>setPlaying(false); s.speak(u); setPlaying(true);
    });
    $('dl')?.addEventListener('click',()=>{
      const b=new Blob([guideText(act)],{type:'text/plain'});const a=document.createElement('a');
      a.href=URL.createObjectURL(b);a.download=`xess-${act.slug}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    });
  }
  document.querySelectorAll('[data-eye]').forEach(b=>b.addEventListener('click',()=>{
    const inp=$(b.dataset.eye),show=inp.type==='password'; inp.type=show?'text':'password';
    b.innerHTML=ico(show?'eyeOff':'eye',20); b.setAttribute('aria-label',t(show?'hidePw':'showPw')); inp.focus();
  }));
  document.querySelectorAll('[data-apple]').forEach(b=>b.addEventListener('click',()=>
    run(b,$(p==='/signup'?'su-err':'li-err'),async()=>{ await Acct.apple(); if(Acct.user) go('/profile',true); })));
  const okEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  // run an account action with the button disabled and errors shown in place
  async function run(btn,errEl,fn){
    if(btn){ if(btn.disabled) return; btn.disabled=true; btn.classList.add('busy'); }
    errEl.className='err'; errEl.textContent='';
    try{ return await fn(); }
    catch(e){ errEl.textContent = e.code==='' ? '' : (t(e.code)||t('errGeneric')); }
    finally{ if(btn&&document.body.contains(btn)){ btn.disabled=false; btn.classList.remove('busy'); } }
  }
  document.querySelectorAll('[data-google]').forEach(b=>b.addEventListener('click',()=>
    run(b,$(p==='/signup'?'su-err':'li-err'),async()=>{ await Acct.google(); if(Acct.user) go('/profile',true); })));
  $('f-login')?.addEventListener('submit',e=>{e.preventDefault();
    const em=$('li-email').value.trim().toLowerCase(),pw=$('li-pw').value,err=$('li-err');
    if(!okEmail(em)) return err.textContent=t('errEmail');
    if(!pw) return err.textContent=t('errLogin');
    run(e.submitter,err,async()=>{ await Acct.login(em,pw); go('/profile',true); })});
  $('f-signup')?.addEventListener('submit',e=>{e.preventDefault();
    const nm=$('su-name').value.trim(),em=$('su-email').value.trim().toLowerCase(),pw=$('su-pw').value,err=$('su-err');
    if(!nm) return err.textContent=t('errName');
    if(!okEmail(em)) return err.textContent=t('errEmail');
    if(pw.length<6) return err.textContent=t('errPw');
    if(pw!==$('su-pw2').value) return err.textContent=t('errPwMatch');
    run(e.submitter,err,async()=>{ await Acct.signup(nm,em,pw); go('/profile',true); })});
  $('f-forgot')?.addEventListener('submit',e=>{e.preventDefault();
    const em=$('fp-email').value.trim(); const m=$('fp-err');
    if(!okEmail(em)){m.className='err';m.textContent=t('errEmail');return}
    run(e.submitter,m,async()=>{ await Acct.reset(em); m.className='ok'; m.textContent=t('resetSent'); })});
  if($('f-profile')){
    $('f-profile').addEventListener('submit',e=>{e.preventDefault();
      const nm=$('pf-name').value.trim(),em=$('pf-email').value.trim().toLowerCase(),err=$('pf-err');
      if(!nm) return err.textContent=t('errName');
      if(!okEmail(em)) return err.textContent=t('errEmail');
      run(e.submitter,err,async()=>{ const r=await Acct.save(nm,em); toast(t(r&&r.pending?'emailPending':'saved')); })});
    $('avatar').addEventListener('click',()=>$('avatar-input').click());
    $('avatar-x')?.addEventListener('click',()=>run(null,$('pf-err'),async()=>{ await Acct.setAvatar(''); render.keepScroll=true; render(); }));
    $('logout').addEventListener('click',()=>run(null,$('pf-err'),async()=>{ await Acct.logout(); go('/login',true); }));
    $('del').addEventListener('click',()=>{$('del-confirm').hidden=false});
    $('del-no').addEventListener('click',()=>{$('del-confirm').hidden=true});
    $('del-yes').addEventListener('click',e=>run(e.currentTarget,$('del-err'),async()=>{ await Acct.remove(); go('/',true); }));
  }
}
document.getElementById('avatar-input').addEventListener('change',e=>{
  const f=e.target.files[0]; if(!f)return; const r=new FileReader();
  r.onload=()=>{ const img=new Image(); img.onload=()=>{ // downscale so it fits in storage
      const c=document.createElement('canvas'),s=320,k=Math.max(s/img.width,s/img.height);c.width=c.height=s;
      c.getContext('2d').drawImage(img,(s-img.width*k)/2,(s-img.height*k)/2,img.width*k,img.height*k);
      const url=c.toDataURL('image/jpeg',.82);
      Acct.setAvatar(url).then(()=>{ render.keepScroll=true; render(); }).catch(err=>{ const el=document.getElementById('pf-err'); if(el) el.textContent=t(err.code)||t('errGeneric'); }); };
    img.src=r.result; };
  r.readAsDataURL(f); e.target.value='';
});
// GitHub Pages 404.html hands the original path back via ?p=
(function(){ const q=new URLSearchParams(location.search).get('p'); if(CLEAN&&q) history.replaceState({},'',BASE+q); })();
Acct.onChange = () => { if(['/profile','/login','/signup'].includes(curPath())){ render.keepScroll=true; render(); } };
render();
