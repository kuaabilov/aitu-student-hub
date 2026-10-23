"use strict";
const translations = {
  "ru": {
    "title": "AITU · Attendance planner",
    "tag": "ПО ТВОЕМУ ЖУРНАЛУ",
    "headline": "Attendance без догадок.",
    "intro": "Перенеси цифры из таблицы Moodle. Узнай эквивалент пропусков и сколько ещё можно пропустить за триместр.",
    "language": "Язык",
    "private": "Данные остаются в этом браузере",
    "courses": "Предметов с данными",
    "average": "Среднее по предметам",
    "risk": "Ниже выбранного порога",
    "step1": "1. Занятия",
    "step1body": "Taken sessions — сколько занятий уже проведено.",
    "step2": "2. Баллы или процент",
    "step2body": "Points over taken sessions — например, 36 / 40. Можно ввести и процент.",
    "step3": "3. План триместра",
    "step3body": "Всего занятий по предмету за триместр — чтобы рассчитать остаток.",
    "tableTitle": "Мои предметы",
    "tableSub": "Считаем отдельно по каждому предмету.",
    "pointsMode": "По баллам",
    "percentMode": "По проценту",
    "threshold": "Порог посещаемости",
    "add": "+ Добавить предмет",
    "example": "Добавить пример",
    "course": "Предмет",
    "held": "Проведено",
    "points": "Баллы",
    "percentage": "Процент",
    "rate": "Attendance",
    "missed": "Эквивалент пропусков",
    "total": "Всего за триместр",
    "left": "Ещё можно пропустить",
    "remove": "Удалить предмет",
    "placeholder": "Название предмета",
    "empty": "Введи данные",
    "invalid": "Проверь числа: занятия — целое число от 1 до 10 000, баллы от 0 до максимума, процент от 0 до 100.",
    "invalidTotal": "Всего за триместр должно быть не меньше проведённых занятий и не больше 10 000.",
    "needTotal": "Укажи всего за триместр",
    "unreachable": "Порог уже недостижим",
    "uncertain": "Уточни баллы в журнале",
    "exhausted": "Больше пропускать нельзя",
    "available": "При полном посещении остальных",
    "exampleName": "Пример: математика",
    "unit": "зан.",
    "equivNote": "Эквивалент, а не точное число отсутствий",
    "equivBody": "При 20 занятиях и 36 / 40 баллах недобор равен 4 баллам — это эквивалент 2 полностью пропущенных занятий, если каждое стоит 2 балла. Частичные отметки могут дать тот же результат.",
    "forecastNote": "Как считается остаток",
    "forecastBody": "Предполагаем одинаковый вес занятий и полный балл за все будущие посещения. Остаток = округлить вниз(всего × (1 − порог / 100) − эквивалент пропусков), не больше оставшихся занятий. Если баллы округлены, используй более точные значения.",
    "percentNote": "Процент может быть округлён",
    "percentBody": "Вводи процент ровно как в журнале: 90.0 и 90 имеют разную точность. Для округлённого процента покажем диапазон остатка; надёжнее ориентироваться на меньшее число.",
    "foot": "Неофициальный инструмент. Уточняй порог и правила подсчёта своего курса.",
    "source": "Учебный процесс AITU ↗",
    "saved": "Значения сохраняются на этом устройстве",
    "thresholdError": "Порог должен быть числом от 0 до 100.",
    "undo": "Вернуть удалённый предмет",
    "maxLabel": "Максимум баллов",
    "earnedLabel": "Набрано баллов",
    "exactHeading": "Как читать результат",
    "storageError": "Сохранение недоступно: значения сохранятся только до закрытия страницы.",
    "limit": "Можно добавить до 30 предметов.",
    "approx": "Оценка по округлённому проценту"
  },
  "kk": {
    "title": "AITU · Қатысу жоспары",
    "tag": "ЖУРНАЛЫҢДАҒЫ ДЕРЕКТЕР БОЙЫНША",
    "headline": "Қатысу көрсеткіші түсінікті.",
    "intro": "Moodle кестесіндегі сандарды енгіз. Босатқан сабақтардың баламасын және триместрде тағы қанша сабақ босатуға болатынын біл.",
    "language": "Тіл",
    "private": "Деректер осы браузерде қалады",
    "courses": "Деректері бар пәндер",
    "average": "Пәндер бойынша орташа мән",
    "risk": "Таңдалған шектен төмен",
    "step1": "1. Сабақтар",
    "step1body": "Taken sessions — осы уақытқа дейін өткізілген сабақ саны.",
    "step2": "2. Балл немесе пайыз",
    "step2body": "Points over taken sessions — мысалы, 36 / 40. Пайызды да енгізуге болады.",
    "step3": "3. Триместр жоспары",
    "step3body": "Қалған шекті есептеу үшін пәннің триместрдегі барлық сабақ санын енгіз.",
    "tableTitle": "Менің пәндерім",
    "tableSub": "Әр пәнді бөлек есептейміз.",
    "pointsMode": "Балл бойынша",
    "percentMode": "Пайыз бойынша",
    "threshold": "Қатысу шегі",
    "add": "+ Пән қосу",
    "example": "Мысал қосу",
    "course": "Пән",
    "held": "Өткізілген",
    "points": "Балл",
    "percentage": "Пайыз",
    "rate": "Қатысу",
    "missed": "Босатқан сабақтар баламасы",
    "total": "Триместрде барлығы",
    "left": "Әлі босатуға болады",
    "remove": "Пәнді жою",
    "placeholder": "Пән атауы",
    "empty": "Деректерді енгіз",
    "invalid": "Сандарды тексер: сабақ саны 1–10 000 аралығындағы бүтін сан, балл 0 мен ең жоғары балл арасында, пайыз 0–100 аралығында болуы керек.",
    "invalidTotal": "Триместрдегі барлық сабақ саны өткізілген сабақтардан кем емес және 10 000-нан аспауы керек.",
    "needTotal": "Триместрдегі жалпы санды енгіз",
    "unreachable": "Шекке жету мүмкін емес",
    "uncertain": "Журналдағы балдарды нақтыла",
    "exhausted": "Енді сабақ босатуға болмайды",
    "available": "Қалған сабақтарға толық қатысқанда",
    "exampleName": "Мысал: математика",
    "unit": "сабақ",
    "equivNote": "Бұл — нақты болмаған сабақ саны емес, балама",
    "equivBody": "20 сабақта 36 / 40 балл жиналса, жетіспейтін 4 балл — әр сабақ 2 балл болғанда, толық босатқан 2 сабақтың баламасы. Ішінара қатысу бағалары да осындай нәтиже беруі мүмкін.",
    "forecastNote": "Қалған шек қалай есептеледі",
    "forecastBody": "Барлық сабақтың салмағы бірдей және алдағы қатысқан сабақтарға толық балл беріледі деп есептейміз. Қалған шек = төмен қарай дөңгелектеу(барлық сабақ × (1 − шек / 100) − босатқан сабақтар баламасы), бірақ қалған сабақ санынан аспайды. Балдар дөңгелектелсе, нақтырақ мәндерді қолдан.",
    "percentNote": "Пайыз дөңгелектелуі мүмкін",
    "percentBody": "Пайызды журналдағыдай енгіз: 90.0 және 90 мәндерінің дәлдігі әртүрлі. Дөңгелектелген пайыз үшін қалған шектің аралығын көрсетеміз; төменгі санға сүйенген дұрыс.",
    "foot": "Бейресми құрал. Пәніңнің қатысу шегі мен есептеу ережелерін нақтыла.",
    "source": "AITU оқу процесі ↗",
    "saved": "Мәндер осы құрылғыда сақталады",
    "thresholdError": "Шек 0–100 аралығындағы сан болуы керек.",
    "undo": "Жойылған пәнді қайтару",
    "maxLabel": "Ең жоғары балл",
    "earnedLabel": "Жиналған балл",
    "exactHeading": "Нәтижені қалай түсінуге болады",
    "storageError": "Сақтау қолжетімсіз: мәндер бет жабылғанға дейін ғана сақталады.",
    "limit": "30 пәнге дейін қосуға болады.",
    "approx": "Дөңгелектелген пайыз бойынша бағалау"
  },
  "en": {
    "title": "AITU · Attendance planner",
    "tag": "BASED ON YOUR ATTENDANCE RECORD",
    "headline": "Make attendance make sense.",
    "intro": "Copy the numbers from your Moodle table. See equivalent absences and how many more classes you can miss this trimester.",
    "language": "Language",
    "private": "Your data stays in this browser",
    "courses": "Courses with data",
    "average": "Average across courses",
    "risk": "Below your threshold",
    "step1": "1. Sessions",
    "step1body": "Taken sessions is the number of classes already held.",
    "step2": "2. Points or percentage",
    "step2body": "Points over taken sessions — for example, 36 / 40. You can also enter a percentage.",
    "step3": "3. Trimester plan",
    "step3body": "Enter the total classes for this course over the whole trimester to calculate your allowance.",
    "tableTitle": "My courses",
    "tableSub": "Each course is calculated separately.",
    "pointsMode": "From points",
    "percentMode": "From percentage",
    "threshold": "Attendance threshold",
    "add": "+ Add course",
    "example": "Add example",
    "course": "Course",
    "held": "Sessions held",
    "points": "Points",
    "percentage": "Percentage",
    "rate": "Attendance",
    "missed": "Equivalent absences",
    "total": "Trimester total",
    "left": "More classes you can miss",
    "remove": "Remove course",
    "placeholder": "Course name",
    "empty": "Enter your data",
    "invalid": "Check the numbers: sessions must be whole numbers from 1 to 10,000, points between 0 and the maximum, and percentage between 0 and 100.",
    "invalidTotal": "The trimester total must be at least the sessions held and no more than 10,000.",
    "needTotal": "Enter trimester total",
    "unreachable": "Threshold is no longer reachable",
    "uncertain": "Check the exact points",
    "exhausted": "No more absences available",
    "available": "With full credit for all other classes",
    "exampleName": "Example: mathematics",
    "unit": "classes",
    "equivNote": "Equivalent absences, not an exact absence count",
    "equivBody": "With 20 sessions and 36 / 40 points, the 4-point shortfall equals 2 fully missed classes if each class is worth 2 points. Partial attendance marks can produce the same result.",
    "forecastNote": "How the allowance works",
    "forecastBody": "We assume equally weighted classes and full credit for future classes you attend. Allowance = floor(total × (1 − threshold / 100) − equivalent absences), capped at the number of future classes. If points are rounded, use more precise values.",
    "percentNote": "Percentages may be rounded",
    "percentBody": "Enter the percentage exactly as shown: 90.0 and 90 have different precision. For rounded percentages we show an allowance range; use the lower number as the safer estimate.",
    "foot": "Unofficial tool. Check your course's threshold and attendance rules.",
    "source": "Studying at AITU ↗",
    "saved": "Values are saved on this device",
    "thresholdError": "The threshold must be a number from 0 to 100.",
    "undo": "Restore removed course",
    "maxLabel": "Maximum points",
    "earnedLabel": "Points earned",
    "exactHeading": "Understanding your results",
    "storageError": "Storage is unavailable: values will last only until you close the page.",
    "limit": "You can add up to 30 courses.",
    "approx": "Estimate from a rounded percentage"
  }
};
const $ = id => document.getElementById(id);
let language="ru",mode="points",threshold="70",rows=[],deleted=null,storageOk=true,nextId=1;
function blank(){return {id:nextId++,name:"",held:"",earned:"",maximum:"",percent:"",total:""};}
try {
  const saved=JSON.parse(localStorage.getItem("aitu-student-web-planner-v1")||"null");
  const preferred=localStorage.getItem("aitu-student-web-language");
  if(translations[preferred])language=preferred;
  if(saved&&typeof saved==="object"){
    if(saved.mode==="percent")mode="percent";
    if(typeof saved.threshold==="string")threshold=saved.threshold.slice(0,20);
    if(Array.isArray(saved.rows))rows=saved.rows.slice(0,30).filter(r=>r&&typeof r==="object").map(r=>{
      const clean=blank();
      for(const key of ["name","held","earned","maximum","percent","total"])clean[key]=typeof r[key]==="string"?r[key].slice(0,key==="name"?100:24):"";
      return clean;
    });
  }
}catch{storageOk=false;}
if(!rows.length)rows=[blank()];
const t=key=>translations[language][key];
const fmt=n=>new Intl.NumberFormat(language==="kk"?"kk-KZ":language,{maximumFractionDigits:2}).format(n);
function save(){
  try{localStorage.setItem("aitu-student-web-planner-v1",JSON.stringify({rows,threshold,mode}));localStorage.setItem("aitu-student-web-language",language);storageOk=true;}catch{storageOk=false;}
  $("save-state").textContent=t(storageOk?"saved":"storageError");
}
function element(tag,className,text){
  const n=document.createElement(tag);if(className)n.className=className;if(text!==undefined)n.textContent=text;return n;
}
function input(row,key,label,placeholder){
  const n=element("input","cell-input"+(key==="name"?" course-input":""));
  n.type="text";n.value=row[key];n.maxLength=key==="name"?100:24;n.placeholder=placeholder;
  n.setAttribute("aria-label",label);n.dataset.key=key;
  if(key!=="name")n.inputMode=["held","total"].includes(key)?"numeric":"decimal";
  n.addEventListener("input",()=>{row[key]=n.value;update();save();});
  return n;
}
function cell(label){const n=element("td");n.dataset.label=label;return n;}
function drawRows(){
  $("courses").replaceChildren();
  for(const row of rows){
    const tr=element("tr");tr.dataset.id=String(row.id);
    const name=cell(t("course"));name.append(input(row,"name",t("course"),t("placeholder")));tr.append(name);
    const held=cell(t("held"));held.append(input(row,"held",t("held"),"20"));tr.append(held);
    const points=cell(t(mode==="points"?"points":"percentage"));
    if(mode==="points"){
      const wrap=element("div","points-input");
      wrap.append(input(row,"earned",t("earnedLabel"),"36"),element("span","","/"),input(row,"maximum",t("maxLabel"),"40"));points.append(wrap);
    }else points.append(input(row,"percent",t("percentage"),"90.0"));
    tr.append(points);
    const rate=cell(t("rate"));rate.className="rate-cell";tr.append(rate);
    const missed=cell(t("missed"));missed.className="missed-cell";tr.append(missed);
    const total=cell(t("total"));total.append(input(row,"total",t("total"),"—"));tr.append(total);
    const remaining=cell(t("left"));remaining.className="remaining-cell";remaining.setAttribute("aria-live","polite");tr.append(remaining);
    const remove=cell("");const button=element("button","delete","×");button.type="button";button.setAttribute("aria-label",t("remove"));
    button.addEventListener("click",()=>{
      deleted={row:{...row},index:rows.indexOf(row)};
      rows=rows.filter(r=>r.id!==row.id);drawRows();update();save();$("undo").focus();
    });remove.append(button);tr.append(remove);
    $("courses").append(tr);
  }
  $("undo").hidden=!deleted;
  $("add").disabled=rows.length>=30;$("example").disabled=rows.length>=30;
  $("limit-message").hidden=rows.length<30;
}
function update(){
  const thresholdNumber=AttendanceMath.numeric(threshold);
  const thresholdValid=thresholdNumber!==null&&thresholdNumber>=0&&thresholdNumber<=100;
  $("threshold-error").hidden=thresholdValid;
  const validResults=[];
  for(const row of rows){
    const tr=document.querySelector('tr[data-id="'+row.id+'"]');
    const rate=tr.querySelector(".rate-cell"),missed=tr.querySelector(".missed-cell"),remaining=tr.querySelector(".remaining-cell");
    rate.replaceChildren();missed.replaceChildren();remaining.replaceChildren();
    const r=AttendanceMath.calculate(row,mode,threshold);
    tr.classList.remove("below");
    if(!thresholdValid||r.state==="empty"||r.state==="invalid"){
      rate.append(element("span","empty","—"));missed.append(element("span","empty","—"));
      remaining.append(element("span",r.state==="invalid"?"warning":"empty",t(!thresholdValid?"thresholdError":r.state==="invalid"?"invalid":"empty")));
      continue;
    }
    validResults.push(r);
    tr.classList.toggle("below",r.below);
    rate.append(element("strong","row-rate",fmt(r.rate)+"%"));
    const bar=element("div","rate-bar"),fill=element("span");fill.style.width=Math.min(100,r.rate)+"%";bar.append(fill);rate.append(bar);
    missed.append(element("span","equivalent",(mode==="percent"?"≈ ":"")+fmt(r.missed)));
    missed.append(element("span","cell-note",t(mode==="percent"?"approx":"unit")));
    if(r.state==="invalidTotal"){
      remaining.append(element("span","warning",t("invalidTotal")));continue;
    }
    if(r.forecast==="unknown"){remaining.append(element("span","empty",t("needTotal")));continue;}
    if(r.forecast==="unreachable"||r.forecast==="uncertain"){
      remaining.append(element("span","warning",t(r.forecast)));continue;
    }
    const value=r.min===r.max?fmt(r.min):fmt(r.min)+"–"+fmt(r.max);
    remaining.append(element("strong","remaining"+(r.max===0?" zero":""),value+" "+t("unit")));
    remaining.append(element("span","cell-note",t(r.forecast)));
  }
  $("stat-count").textContent=fmt(validResults.length);
  $("stat-average").textContent=validResults.length?fmt(validResults.reduce((s,r)=>s+r.rate,0)/validResults.length)+"%":"—";
  $("stat-risk").textContent=fmt(validResults.filter(r=>r.below).length);
}
function translate(){
  document.documentElement.lang=language;document.title="AITU · Student Hub";
  document.querySelectorAll("[data-i18n]").forEach(n=>{n.textContent=t(n.dataset.i18n);});
  document.querySelectorAll("[data-lang]").forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.lang===language)));
  document.querySelectorAll("[data-mode]").forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.mode===mode)));
  $("input-heading").textContent=t(mode==="points"?"points":"percentage");
  $("input-subheading").textContent=mode==="points"?"Points over taken sessions":"Percentage over taken sessions";
  $("threshold").value=threshold;
  drawRows();update();
  $("save-state").textContent=t(storageOk?"saved":"storageError");
}
function add(example){
  if(rows.length>=30)return;
  const r=blank();
  if(example)Object.assign(r,{name:t("exampleName"),held:"20",earned:"36",maximum:"40",percent:"90.0",total:"30"});
  rows.push(r);drawRows();update();save();
  document.querySelector('tr[data-id="'+r.id+'"] input').focus();
}
$("add").addEventListener("click",()=>add(false));
$("example").addEventListener("click",()=>add(true));
$("undo").addEventListener("click",()=>{
  if(!deleted||rows.length>=30)return;
  rows.splice(Math.min(rows.length,deleted.index),0,deleted.row);deleted=null;drawRows();update();save();
});
$("threshold").addEventListener("input",event=>{threshold=event.target.value;update();save();});
document.querySelectorAll("[data-lang]").forEach(n=>n.addEventListener("click",()=>{language=n.dataset.lang;translate();save();}));
document.querySelectorAll("[data-mode]").forEach(n=>n.addEventListener("click",()=>{mode=n.dataset.mode;translate();save();}));
translate();
