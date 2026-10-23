'use strict';
const HUB='https://kuaabilov.github.io/aitu-student-hub/';
chrome.runtime.onMessage.addListener((message,sender,respond)=>{
  if(sender.id!==chrome.runtime.id||sender.url!==chrome.runtime.getURL('popup.html')||message?.type!=='aitu-send')return;
  sendToHub(message.packet).then(()=>respond({ok:true})).catch(error=>respond({ok:false,error:error.message}));return true;
});
async function sendToHub(packet){
  if(packet?.version!==1||packet.source!=='https://lms.astanait.edu.kz'||!Array.isArray(packet.rows)||!packet.rows.length||packet.rows.length>30||JSON.stringify(packet).length>30000)throw Error('Некорректный пакет данных.');
  // No data in URLs, network requests, extension storage or disk.
  const tabs=(await chrome.tabs.query({url:'https://kuaabilov.github.io/aitu-student-hub/*'})).filter(t=>{
    try{const u=new URL(t.url);return u.origin===new URL(HUB).origin&&(u.pathname==='/aitu-student-hub/'||u.pathname==='/aitu-student-hub/index.html');}catch{return false;}
  });
  if(!tabs.length)throw Error('Открой https://kuaabilov.github.io/aitu-student-hub/ в этом же Chrome/Edge, затем повтори передачу.');
  if(tabs.length>1)throw Error('Оставь одну вкладку кабинета, чтобы выбрать получателя однозначно.');
  const tab=tabs[0],requestId=crypto.randomUUID();
  const result=await chrome.scripting.executeScript({target:{tabId:tab.id},func:(payload,id)=>{
    if(location.origin!=='https://kuaabilov.github.io'||!['/aitu-student-hub/','/aitu-student-hub/index.html'].includes(location.pathname)||document.documentElement.dataset.aituBridge!=='student-hub-web-v1')return {ok:false};
    return new Promise(resolve=>{
      const timeout=setTimeout(()=>{window.removeEventListener('message',ack);resolve({ok:false});},4000);
      function ack(event){if(event.source!==window||event.origin!==location.origin||event.data?.type!=='aitu-web-preview-ack'||event.data.requestId!==id)return;clearTimeout(timeout);window.removeEventListener('message',ack);resolve({ok:event.data.ok===true});}
      window.addEventListener('message',ack);window.postMessage({type:'aitu-web-attendance-preview',requestId:id,packet:payload},location.origin);
    });
  },args:[packet,requestId]});
  if(!result[0]?.result?.ok)throw Error('Кабинет не принял данные. Обнови локальную страницу и повтори. Несохранённый предпросмотр сначала импортируй или отмени.');
  await chrome.tabs.update(tab.id,{active:true});
}
