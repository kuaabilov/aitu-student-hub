"use strict";
const quickTranslations={
  "ru": {
    "title": "Быстрая проверка",
    "intro": "Как в прежней версии: рассчитай один предмет без добавления в таблицу.",
    "limit": "Лимит пропусков",
    "percent": "По проценту attendance",
    "weekly": "Пар в неделю",
    "weeks": "Недель в триместре",
    "missed": "Уже пропущено",
    "threshold": "Минимальная посещаемость, %",
    "held": "Уже проведено занятий",
    "rate": "Attendance, %",
    "help": "Используй число занятий, по которым рассчитан процент в журнале, а не все занятия триместра.",
    "left": "Ещё можно пропустить",
    "over": "Сверх допустимого лимита",
    "total": "Всего занятий",
    "allowed": "Лимит за триместр",
    "equivalent": "Эквивалент пропусков",
    "round": "Оценка по проценту: частичные отметки и округление могут отличаться от точного числа отсутствий.",
    "error": "Проверь значения: число занятий должно быть целым и положительным, пропуски — от 0 до общего числа, процент — от 0 до 100.",
    "note": "Порог задаётся правилами курса. Этот расчёт независим от таблицы выше.",
    "reset": "Сбросить",
    "plan": "При одинаковом весе занятий; уже пропущенные занятия вычитаются из лимита."
  },
  "kz": {
    "title": "Жылдам тексеру",
    "intro": "Бұрынғы нұсқадағыдай: бір пәнді кестеге қоспай есепте.",
    "limit": "Сабақ босату шегі",
    "percent": "Қатысу пайызы бойынша",
    "weekly": "Аптасына сабақ саны",
    "weeks": "Триместрдегі апта саны",
    "missed": "Босатқан сабақ саны",
    "threshold": "Ең төменгі қатысу деңгейі, %",
    "held": "Өткізілген сабақ саны",
    "rate": "Қатысу деңгейі, %",
    "help": "Триместрдегі барлық сабақты емес, журналдағы пайыз есептелген сабақтар санын қолдан.",
    "left": "Әлі босатуға болатын сабақ саны",
    "over": "Рұқсат етілген шектен асқан",
    "total": "Барлық сабақ саны",
    "allowed": "Триместрдегі босату шегі",
    "equivalent": "Босатқан сабақтар баламасы",
    "round": "Пайыз бойынша жуық есеп: ішінара қатысу мен дөңгелектеу нақты болмаған сабақтар санынан өзгеше нәтиже беруі мүмкін.",
    "error": "Мәндерді тексер: сабақ саны оң бүтін сан, босатқан сабақтар 0 мен жалпы сан арасында, пайыз 0–100 аралығында болуы керек.",
    "note": "Шек пән ережелерімен белгіленеді. Бұл есеп жоғарыдағы кестеге тәуелсіз.",
    "reset": "Қалпына келтіру",
    "plan": "Сабақтардың салмағы бірдей деп есептеледі; босатқан сабақтар шектен шегеріледі."
  },
  "en": {
    "title": "Quick check",
    "intro": "Like the previous version: calculate one course without adding it to the table.",
    "limit": "Absence allowance",
    "percent": "From attendance %",
    "weekly": "Classes per week",
    "weeks": "Weeks in trimester",
    "missed": "Classes already missed",
    "threshold": "Minimum attendance, %",
    "held": "Classes already held",
    "rate": "Attendance, %",
    "help": "Use the number of classes included in your attendance record, not the full trimester total.",
    "left": "Classes you can still miss",
    "over": "Classes over the allowance",
    "total": "Total classes",
    "allowed": "Trimester absence allowance",
    "equivalent": "Equivalent absences",
    "round": "An estimate from the percentage: partial marks and rounding may differ from the actual number of absences.",
    "error": "Check your values: class counts must be positive whole numbers, absences between 0 and the total, and percentages between 0 and 100.",
    "note": "Use your course's attendance threshold. This calculation is independent of the table above.",
    "reset": "Reset",
    "plan": "Assumes equally weighted classes; existing absences are subtracted from the allowance."
  }
};
let quickMode="limit";
const quickDefaults={weekly:"3",weeks:"10",missed:"0",threshold:"70",held:"30",rate:"80"};
function quickUpdate(){
  const q=quickTranslations[language];
  const r=AttendanceMath.quickLimit($("quick-weekly").value,$("quick-weeks").value,$("quick-missed").value,$("quick-threshold").value);
  $("quick-limit-error").hidden=r.state==="valid";
  $("quick-limit-result").hidden=r.state!=="valid";
  if(r.state==="valid"){
    $("quick-limit-caption").textContent=q[r.remaining<0?"over":"left"];
    $("quick-left").textContent=fmt(Math.abs(r.remaining));
    $("quick-total").textContent=fmt(r.total);
    $("quick-allowed").textContent=fmt(r.allowed);
    $("quick-limit-result").classList.toggle("over",r.remaining<0);
  }
  const p=AttendanceMath.calculate({held:$("quick-held").value,percent:$("quick-rate").value,total:""},"percent",70);
  $("quick-percent-error").hidden=p.state==="valid";
  $("quick-percent-result").hidden=p.state!=="valid";
  if(p.state==="valid")$("quick-equivalent").textContent="≈ "+fmt(p.missed);
}
function quickTranslate(){
  document.querySelectorAll("[data-quick-i18n]").forEach(n=>n.textContent=quickTranslations[language][n.dataset.quickI18n]);
  quickUpdate();
}
function quickSelect(next){
  quickMode=next;
  for(const name of ["limit","percent"]){
    $("quick-"+name+"-tab").setAttribute("aria-selected",String(name===next));
    $("quick-"+name+"-tab").tabIndex=name===next?0:-1;
    $("quick-"+name+"-panel").hidden=name!==next;
  }
}
for(const name of ["limit","percent"]){
  const tab=$("quick-"+name+"-tab");
  tab.addEventListener("click",()=>quickSelect(name));
  tab.addEventListener("keydown",e=>{
    if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){
      e.preventDefault();
      quickSelect(e.key==="Home"?"limit":e.key==="End"?"percent":quickMode==="limit"?"percent":"limit");
      $("quick-"+quickMode+"-tab").focus();
    }
  });
}
for(const id of Object.keys(quickDefaults))$("quick-"+id).addEventListener("input",quickUpdate);
$("quick-reset").addEventListener("click",()=>{
  for(const [id,value] of Object.entries(quickDefaults))$("quick-"+id).value=value;
  quickUpdate();
});
document.querySelectorAll("[data-lang]").forEach(n=>n.addEventListener("click",quickTranslate));
quickTranslate();
