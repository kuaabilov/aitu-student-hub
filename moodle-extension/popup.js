'use strict';
const readButton=document.getElementById('read'),sendButton=document.getElementById('send'),status=document.getElementById('status'),preview=document.getElementById('preview');
let packet=null;
readButton.addEventListener('click',async()=>{
  readButton.disabled=true;sendButton.hidden=true;packet=null;preview.replaceChildren();status.textContent='Читаю открытую таблицу…';
  try{
    const [tab]=await chrome.tabs.query({active:true,currentWindow:true});
    if(!tab?.id||!tab.url||new URL(tab.url).origin!=='https://lms.astanait.edu.kz')throw Error('Открой Moodle AITU в активной вкладке этого браузера и нажми значок расширения.');
    const results=await chrome.scripting.executeScript({target:{tabId:tab.id},files:['read-attendance.js']});
    const result=results[0]?.result;if(!result?.ok)throw Error(result?.error||'Не удалось прочитать страницу.');
    packet=result.packet;
    for(const row of packet.rows){const box=document.createElement('div');box.className='row';const name=document.createElement('strong'),detail=document.createElement('small');name.textContent=row.name;detail.textContent=`${row.held} занятий · ${row.earned} / ${row.maximum} · ${row.percent}%`;box.append(name,detail);preview.append(box);}
    status.textContent=`Найдено предметов: ${packet.rows.length}. Пропущено строк: ${result.skipped}. Проверь список перед передачей.`;sendButton.hidden=false;
  }catch(error){status.textContent=error.message;}finally{readButton.disabled=false;}
});
sendButton.addEventListener('click',async()=>{
  if(!packet)return;sendButton.disabled=true;status.textContent='Передаю предпросмотр…';
  try{const result=await chrome.runtime.sendMessage({type:'aitu-send',packet});if(!result?.ok)throw Error(result?.error||'Не удалось передать данные.');status.textContent='Предпросмотр открыт в кабинете. Нажми там «Импортировать».';}catch(error){status.textContent=error.message;}finally{sendButton.disabled=false;}
});
