
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')


export function createEventId() {
  return String(Date.now());
}


