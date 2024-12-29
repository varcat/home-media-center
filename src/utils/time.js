export function getTimeInfo(number) {
  const minute = 60;
  const hour = minute * 60;
  let n = number;
  let h = Math.floor(number / hour);
  n -= h * hour;
  let m = Math.floor(n / minute);
  n -= m * minute;
  return {
    h,
    m,
    s: Math.round(n),
  };
}

export function fmtTileMinSec(duration) {
  const i = getTimeInfo(duration);
  return `${i.m}:${i.s}`;
}
