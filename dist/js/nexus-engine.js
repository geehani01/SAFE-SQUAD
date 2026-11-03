(function(root){
'use strict';
const cards=[
 {title:'Apa itu buli?',text:'Buli ialah perbuatan menyakitkan atau menakutkan orang lain, biasanya berulang dan melibatkan ketidakseimbangan kuasa.'},
 {title:'Kenali 3 ciri buli',text:'Menyakitkan atau menakutkan. Berulang atau berpotensi berulang. Ketidakseimbangan kuasa.'},
 {title:'Buli, gurauan atau konflik?',text:'Buli: perbuatan menyakitkan atau menakutkan yang mempunyai ciri-ciri buli. Gurauan: kedua-dua pihak selesa dan menghormati batas. Konflik: perselisihan antara pihak yang mempunyai kedudukan relatif seimbang. Jika sesuatu perbuatan menyakitkan atau membuat kamu takut, dapatkan bantuan guru walaupun kamu tidak pasti sama ada itu buli.'}
];
const scenarios=[
 {text:'Sekumpulan murid berulang kali mengejek dan mengugut Amir.',answer:'BULI',feedback:'Ejekan berulang dan ugutan merupakan petunjuk kuat buli.'},
 {text:'Dua rakan tidak bersetuju tentang giliran bermain bola.',answer:'KONFLIK',feedback:'Perselisihan pendapat ini lebih menyerupai konflik biasa.'},
 {text:'Dua rakan bergurau. Kedua-duanya selesa dan berhenti apabila diminta.',answer:'GURAUAN',feedback:'Gurauan yang baik menghormati perasaan dan batas rakan.'},
 {text:'Seorang murid berulang kali memaksa rakannya menyerahkan wang dengan ugutan.',answer:'BULI',feedback:'Paksaan, ugutan dan ketidakseimbangan kuasa ialah petunjuk buli.'},
 {text:'Dua murid berselisih pendapat dan akhirnya berbincang dengan baik.',answer:'KONFLIK',feedback:'Mereka menyelesaikan perselisihan melalui perbincangan.'}
];
const maps=[
 {id:'nexus',name:'NEXUS',sub:'Pusat Kesedaran Buli',badge:'Mata Bijak',color:'#1688ed',file:'Peta_1_NEXUS.png'},
 {id:'cyber',name:'CYBER GRID',sub:'Bijak di Dunia Digital',badge:'Pakar Kenal',color:'#6263e9',file:'Peta_2_CYBER_GRID.png'},
 {id:'empathy',name:'EMPATHY CORE',sub:'Fahami Perasaan Rakan',badge:'Hati Prihatin',color:'#d277c7',file:'Peta_3_EMPATHY_CORE.png'},
 {id:'guardian',name:'GUARDIAN ZONE',sub:'Berani Bertindak Selamat',badge:'Wira Pelindung',color:'#e6a821',file:'Peta_4_GUARDIAN_ZONE.png'}
];
function normalize(raw){const p=raw&&typeof raw==='object'?raw:{};const learned=[...new Set((Array.isArray(p.learned)?p.learned:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<3))];const solved=learned.length===3&&Number.isInteger(p.solved)&&p.solved>=0&&p.solved<=5?p.solved:0;return {learned,solved,started:!!p.started,challengeStarted:learned.length===3&&!!p.challengeStarted,completedAt:solved===5&&typeof p.completedAt==='string'?p.completedAt:null};}
function create(raw){let state=normalize(raw);return {
 snapshot:()=>({...state,learned:[...state.learned]}),
 status:()=>state.solved===5?'completed':(state.challengeStarted||state.solved>0)?'challenge':state.learned.length?'learning':state.started?'intro':'not_started',
 start(){state.started=true},
 visit(i){if(!Number.isInteger(i)||i<0||i>2)return false;if(i>0&&!state.learned.includes(i-1))return false;if(!state.learned.includes(i))state.learned.push(i);state.started=true;return true},
 canChallenge:()=>state.learned.length===3,
 beginChallenge(){if(state.learned.length!==3)return false;state.challengeStarted=true;return true},
 answer(value){if(state.learned.length!==3||state.solved>=5)return {accepted:false,correct:false};const q=scenarios[state.solved];const correct=value===q.answer;if(correct){state.solved++;if(state.solved===5)state.completedAt=new Date().toISOString()}return {accepted:true,correct,feedback:q.feedback,complete:state.solved===5}},
 hasBadge:()=>state.learned.length===3&&state.solved===5,
 unlocked(i){return i===0||(i===1&&this.hasBadge())}
};}
const api={cards,scenarios,maps,normalize,create};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NexusEngine=api;
})(typeof window!=='undefined'?window:globalThis);
