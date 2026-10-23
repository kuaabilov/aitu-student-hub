/* Runs only after the user clicks Read. No requests, tokens or session extraction. */
(() => {
  if(location.origin!=='https://lms.astanait.edu.kz'||location.pathname!=='/mod/attendance/view.php')return {ok:false,error:'Открой предмет → Attendance → All courses. Вход, главная и страницы оценок не подходят.'};
  if(new URL(location.href).searchParams.get('mode')!=='1')return {ok:false,error:'Выбери вкладку All courses (Все курсы) внутри Attendance: в других вкладках цифры могут относиться только к выбранному месяцу.'};
  const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
  const tables=[...document.querySelectorAll('#region-main table')];
  const table=tables.find(t=>[...t.querySelectorAll('tr')].some(r=>r.cells.length===5&&r.querySelector('a[href*="/course/view.php"]')));
  if(!table)return {ok:false,error:'Сводная таблица не найдена. Выбери All courses. Если таблица видна, её формат мог измениться.'};
  const rows=[];let skipped=0;const seen=new Set();
  for(const tr of table.querySelectorAll('tr')){
    const cells=[...tr.cells];if(cells.length!==5||!cells[0].querySelector('a[href*="/course/view.php"]'))continue;
    const name=clean(cells[0].innerText),held=clean(cells[2].innerText),points=clean(cells[3].innerText).match(/^(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)$/),percent=clean(cells[4].innerText).replace(/%$/,'').trim().replace(',','.');
    if(!name||name.length>100||!/^\d+$/.test(held)||Number(held)<1||Number(held)>10000||!points||!/^\d+(?:\.\d+)?$/.test(percent)||Number(percent)>100){skipped++;continue;}
    const earned=points[1].replace(',','.'),maximum=points[2].replace(',','.');
    if(Number(maximum)<=0||Number(earned)>Number(maximum)||seen.has(name.toLowerCase())){skipped++;continue;}
    seen.add(name.toLowerCase());rows.push({name,held,earned,maximum,percent,total:''});
  }
  if(!rows.length)return {ok:false,error:'Нет строк с проведёнными занятиями и числовыми баллами. Нулевые и некорректные строки пропускаются.'};
  if(rows.length>30)return {ok:false,error:'Больше 30 предметов: текущий кабинет поддерживает до 30. Используй ручной импорт нужных строк.'};
  return {ok:true,skipped,packet:{version:1,source:'https://lms.astanait.edu.kz',capturedAt:new Date().toISOString(),rows}};
})();
