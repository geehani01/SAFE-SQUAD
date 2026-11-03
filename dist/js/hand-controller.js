(function(root){
class SafeHandController{
 constructor({video,cursor,status,onPinch}){this.video=video;this.cursor=cursor;this.status=status;this.onPinch=onPinch;this.generation=0;this.stream=null;this.model=null;this.frame=0;this.last=-1;this.pinch=false;this.cooldown=0;this.hover=null;this.slow=0;this.x=.5;this.y=.5;this.recalibrate()}
 say(text){this.status(text)}
 recalibrate(){this.pinch=false;this.cooldown=performance.now()+700;this.x=.5;this.y=.5;this.cursor.hidden=true;if(this.hover)this.hover.classList.remove('hand-hover');this.hover=null}
 async start(){this.stop();const generation=this.generation;const live=()=>generation===this.generation;if(!navigator.mediaDevices?.getUserMedia){this.say('Kamera tidak disokong. Semua situasi boleh diselesaikan dalam mod sentuhan.');return false}
 this.say('Membuka kamera… Kamu masih boleh menggunakan sentuhan.');
 try{
 const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:640},height:{ideal:480}},audio:false});
 if(!live()){stream.getTracks().forEach(t=>t.stop());return false}this.stream=stream;this.video.srcObject=stream;this.video.hidden=false;await this.video.play();if(!live())return false;
 this.say('Memuatkan pengesanan tangan… Gunakan sentuhan sementara menunggu.');
 const timeout=new Promise((_,reject)=>{this.timer=setTimeout(()=>reject(new Error('model-timeout')),25000)});
 const load=async()=>{const vision=await import('./vision_bundle.mjs');if(!live())return null;const fs=await vision.FilesetResolver.forVisionTasks('assets/mediapipe');if(!live())return null;return vision.HandLandmarker.createFromOptions(fs,{baseOptions:{modelAssetPath:'assets/mediapipe/hand_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.6,minHandPresenceConfidence:.6,minTrackingConfidence:.6})};
 const loading=load();loading.then(m=>{if(m&&(!live()||this.timedOut))m.close()}).catch(()=>{});
 const model=await Promise.race([loading,timeout]);clearTimeout(this.timer);if(!live())return false;if(!model)return false;this.model=model;this.recalibrate();this.say('Halakan telunjuk ke jawapan. Rapatkan ibu jari dan telunjuk untuk memilih. Sentuhan juga boleh digunakan.');this.lastVideoTime=-1;this.tick(performance.now());return true;
 }catch(error){if(!live())return false;this.timedOut=true;this.stop();const permission=['NotAllowedError','PermissionDeniedError'].includes(error.name);this.say(permission?'Kebenaran kamera tidak diberikan. Teruskan dalam mod sentuhan.':'Kamera atau pengesanan tangan belum tersedia. Teruskan dalam mod sentuhan.');return false}}
 tick(now){if(!this.model||!this.stream)return;this.frame=requestAnimationFrame(t=>this.tick(t));if(now-this.last<80||this.video.readyState<2||this.lastVideoTime===this.video.currentTime)return;this.last=now;this.lastVideoTime=this.video.currentTime;
 try{const began=performance.now();const result=this.model.detectForVideo(this.video,now);if(performance.now()-began>130)this.slow++;else this.slow=Math.max(0,this.slow-1);if(this.slow>=12){this.stop();this.say('Mod sentuhan diaktifkan supaya permainan kekal lancar.');return}const hand=result.landmarks?.[0];if(!hand){this.cursor.hidden=true;this.pinch=false;if(this.hover)this.hover.classList.remove('hand-hover');this.hover=null;return}
 const rect=this.video.getBoundingClientRect(),scale=Math.min(rect.width/this.video.videoWidth,rect.height/this.video.videoHeight),vw=this.video.videoWidth*scale,vh=this.video.videoHeight*scale;
 const tx=(rect.left+(rect.width-vw)/2+(1-hand[8].x)*vw),ty=(rect.top+(rect.height-vh)/2+hand[8].y*vh);this.x=this.x*.25+tx*.75;this.y=this.y*.25+ty*.75;this.cursor.hidden=false;this.cursor.style.left=this.x+'px';this.cursor.style.top=this.y+'px';
 const hit=document.elementFromPoint(this.x,this.y)?.closest('[data-hand]');const target=hit&&!hit.disabled?hit:null;if(target!==this.hover){this.hover?.classList.remove('hand-hover');this.hover=target;target?.classList.add('hand-hover')}
 const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);const ratio=distance(hand[4],hand[8])/Math.max(.01,distance(hand[0],hand[9]));const pressed=ratio<(this.pinch ? 0.43 : 0.3);this.cursor.classList.toggle('pinching',pressed);
 if(pressed&&!this.pinch&&now>this.cooldown){this.cooldown=now+950;if(target)this.onPinch(target)}this.pinch=pressed;
 }catch{this.stop();this.say('Pengesanan tangan terganggu. Gunakan jawapan sentuhan untuk meneruskan.')}}
 stop(){this.generation++;clearTimeout(this.timer);this.timedOut=false;cancelAnimationFrame(this.frame);this.frame=0;this.stream?.getTracks().forEach(t=>t.stop());this.stream=null;this.video.pause();this.video.srcObject=null;this.video.hidden=true;this.model?.close();this.model=null;this.cursor.hidden=true;this.hover?.classList.remove('hand-hover');this.hover=null;this.pinch=false}
}
root.SafeHandController=SafeHandController;
})(window);
