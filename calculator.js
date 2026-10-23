/* Pure calculation helpers; usable in a browser and Node.js. */
(function (root) {
  function numeric(value) {
    if (String(value ?? "").trim() === "") return null;
    const text = String(value).trim().replace(",", ".");
    if (!/^[+-]?(?:[0-9]+(?:[.][0-9]*)?|[.][0-9]+)$/.test(text)) return null;
    const n = Number(text);
    return Number.isFinite(n) ? n : null;
  }
  function calculate(row, mode, threshold) {
    const h = numeric(row.held), total = numeric(row.total), t = numeric(threshold);
    const empty = String(row.held ?? "").trim() === "";
    if (empty) return {state:"empty"};
    if (h === null || !Number.isInteger(h) || h < 1 || h > 10000 || t === null || t < 0 || t > 100) return {state:"invalid"};
    let rate, low, high;
    if (mode === "points") {
      const e = numeric(row.earned), m = numeric(row.maximum);
      if (String(row.earned ?? "").trim() === "" || String(row.maximum ?? "").trim() === "") return {state:"empty"};
      if (e === null || m === null || m <= 0 || e < 0 || e > m) return {state:"invalid"};
      rate = 100 * e / m;
      low = high = h * (m-e) / m;
    } else {
      const p = numeric(row.percent);
      if (String(row.percent ?? "").trim() === "") return {state:"empty"};
      if (p === null || p < 0 || p > 100) return {state:"invalid"};
      const decimals = (String(row.percent).replace(",", ".").split(".")[1] || "").length;
      const half = 0.5 * Math.pow(10, -Math.min(decimals, 10));
      rate = p;
      low = h * (100 - Math.min(100, p+half)) / 100;
      high = h * (100 - Math.max(0, p-half)) / 100;
    }
    const result = {state:"valid",rate, missed:h*(100-rate)/100,low,high,held:h,below:rate<t};
    if (String(row.total ?? "").trim() === "") return {...result,forecast:"unknown"};
    if (total === null || !Number.isInteger(total) || total < h || total > 10000) return {...result,state:"invalidTotal"};
    const budget = total*(100-t)/100, future=total-h;
    const minRemaining=Math.floor(budget-high+1e-9), maxRemaining=Math.floor(budget-low+1e-9);
    const min=Math.min(future,Math.max(0,minRemaining)), max=Math.min(future,Math.max(0,maxRemaining));
    const forecast=maxRemaining<0?"unreachable":minRemaining<0?"uncertain":max===0?"exhausted":"available";
    return {...result,total,future,min,max,forecast};
  }
  function quickLimit(weekly, weeks, missed, threshold) {
    const values=[weekly,weeks,missed,threshold].map(numeric);
    const [w,n,m,t]=values;
    if(values.some(v=>v===null)||!Number.isInteger(w)||!Number.isInteger(n)||!Number.isInteger(m)||w<1||w>100||n<1||n>100||m<0||m>w*n||t<0||t>100)return {state:"invalid"};
    const total=w*n,allowed=Math.floor(total*(100-t)/100+1e-9);
    return {state:"valid",total,allowed,remaining:allowed-m};
  }
  const api={calculate,numeric,quickLimit};
  if(typeof module!=="undefined"&&module.exports)module.exports=api;
  else root.AttendanceMath=api;
})(typeof globalThis!=="undefined"?globalThis:this);

