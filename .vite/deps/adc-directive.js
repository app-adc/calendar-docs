import "./chunk-PZ5AY32C.js";

// node_modules/adc-directive/dist/index.mjs
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function ci(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    case 10:
      return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
    case 11:
      return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
    case 12:
      return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
    case 13:
      return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
    case 14:
      return mn(
        lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))
      );
    case 15:
      return no(
        mn(
          lm(
            kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))
          )
        )
      );
    case 16:
      return op(
        no(
          mn(
            lm(
              kl(
                jk(
                  ij(
                    hi(
                      gh(fg(ef(de(cd(bc(ab(a)))))))
                    )
                  )
                )
              )
            )
          )
        )
      );
    default: {
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
function withCi(ab, bc, cd, de, ef, fg, gh, hi, ij) {
  switch (arguments.length) {
    case 1:
      return ab;
    case 2:
      return function() {
        return bc(ab.apply(null, arguments));
      };
    case 3:
      return function() {
        return cd(bc(ab.apply(null, arguments)));
      };
    case 4:
      return function() {
        return de(cd(bc(ab.apply(null, arguments))));
      };
    case 5:
      return function() {
        return ef(de(cd(bc(ab.apply(null, arguments)))));
      };
    case 6:
      return function() {
        return fg(ef(de(cd(bc(ab.apply(null, arguments))))));
      };
    case 7:
      return function() {
        return gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))));
      };
    case 8:
      return function() {
        return hi(
          gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))))
        );
      };
    case 9:
      return function() {
        return ij(
          hi(
            gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))))
          )
        );
      };
  }
  return;
}
var copyDeep = (source) => {
  if (source === null || source === void 0) {
    return source;
  }
  const refs = /* @__PURE__ */ new WeakMap();
  const copy = (value) => {
    if (value === null || typeof value !== "object") {
      return value;
    }
    if (refs.has(value)) {
      return refs.get(value);
    }
    if (value instanceof Date) {
      return new Date(value);
    }
    if (value instanceof RegExp) {
      return new RegExp(value.source, value.flags);
    }
    if (value instanceof Map) {
      const mapCopy = /* @__PURE__ */ new Map();
      refs.set(value, mapCopy);
      value.forEach((val, key) => {
        mapCopy.set(copy(key), copy(val));
      });
      return mapCopy;
    }
    if (value instanceof Set) {
      const setCopy = /* @__PURE__ */ new Set();
      refs.set(value, setCopy);
      value.forEach((val) => {
        setCopy.add(copy(val));
      });
      return setCopy;
    }
    const cloned = Array.isArray(value) ? [] : {};
    refs.set(value, cloned);
    return Object.keys(value).reduce((obj, key) => {
      obj[key] = copy(value[key]);
      return obj;
    }, cloned);
  };
  return copy(source);
};
function delayPromise(ms, callbackFn, value) {
  return __async(this, null, function* () {
    if (ms < 0) {
      throw new Error("Delay time cannot be negative");
    }
    if (ms === 0) {
      return callbackFn == null ? void 0 : callbackFn(value);
    }
    yield new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
    try {
      if (callbackFn) {
        return yield callbackFn(value);
      }
      return void 0;
    } catch (error) {
      console.error("Error in delay callback:", error);
      throw error;
    }
  });
}
function checkItemDuplicate(items, getKey, options = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }
  const { ignoreCase = false, trim = false } = options;
  const processValue = (value) => {
    if (typeof value === "string") {
      let processed = value;
      if (trim) processed = processed.trim();
      if (ignoreCase) processed = processed.toLowerCase();
      return processed;
    }
    return value;
  };
  const uniqueKeys = new Set(items.map((item) => processValue(getKey(item))));
  return uniqueKeys.size !== items.length;
}
var checkEmpty = (value) => {
  const _value = copyDeep(value);
  if (_value === null || _value === void 0) {
    return true;
  }
  if (typeof _value === "string") {
    return _value.trim().length === 0;
  }
  if (Array.isArray(_value)) {
    return _value.length === 0;
  }
  if (_value instanceof Map || _value instanceof Set) {
    return _value.size === 0;
  }
  if (typeof _value === "object") {
    return Object.keys(_value).length === 0;
  }
  if (typeof _value === "number" || typeof _value === "boolean") {
    return false;
  }
  return false;
};
var checkObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
function checkEmail(email) {
  if (typeof email !== "string") {
    return false;
  }
  const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  return emailRegex.test(email.trim());
}
var checkNumber = (value) => {
  if (value === null || value === void 0) {
    return false;
  }
  if (typeof value === "number") {
    return !isNaN(value);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return false;
    }
    return !isNaN(Number(trimmed));
  }
  return false;
};
var checkFormatDate = (dateStr, format = "YYYY-MM-DD") => {
  if (!dateStr || typeof dateStr !== "string") {
    return false;
  }
  let data = dateStr;
  let regExp = /[^0-9\-\/\.]/;
  if (data.split(regExp).length > 1) {
    data = data.split(regExp)[0];
  }
  const patterns = {
    YYYY: "^\\d{4}$",
    // ปี 4 หลัก
    YY: "^\\d{2}$",
    // ปี 2 หลัก
    MM: "^(0[1-9]|1[0-2])$",
    // เดือน 01-12
    DD: "^(0[1-9]|[12]\\d|3[01])$",
    // วันที่ 01-31
    M: "^([1-9]|1[0-2])$",
    // เดือน 1-12
    D: "^([1-9]|[12]\\d|3[01])$"
    // วันที่ 1-31
  };
  const dateParts = data.split(/[-/.]/);
  const formatParts = format.toLocaleUpperCase().split(/[-/.]/);
  if (dateParts.length !== formatParts.length) {
    return false;
  }
  for (let i = 0; i < formatParts.length; i++) {
    const part = dateParts[i];
    const formatPart = formatParts[i];
    const pattern = patterns[formatPart];
    if (!pattern || !new RegExp(pattern).test(part)) {
      return false;
    }
    if (formatPart === "DD" || formatPart === "D") {
      const year = parseInt(
        dateParts[formatParts.indexOf("YYYY")] || dateParts[formatParts.indexOf("YY")]
      );
      const month = parseInt(
        dateParts[formatParts.indexOf("MM")] || dateParts[formatParts.indexOf("M")]
      );
      const day = parseInt(part);
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        return false;
      }
    }
  }
  return true;
};
var regexPatterns = {
  /** รูปแบบตัวอักษรภาษาอังกฤษ (a-z, A-Z) */
  en: /[a-zA-Z]/,
  /** รูปแบบตัวอักษรภาษาไทย (ก-ฮ, สระ, วรรณยุกต์) */
  th: /[\u0E00-\u0E7F]/,
  /** รูปแบบตัวเลข (0-9) */
  number: /\d/,
  /** รูปแบบที่ไม่ใช่ตัวเลข */
  notNumber: /\D/,
  /** รูปแบบตัวอักษรและตัวเลข (a-z, A-Z, 0-9, _) */
  character: /\w/,
  /** รูปแบบตัวเลขและจุดทศนิยม สำหรับข้อมูลการเงิน */
  finance: /^\d*\.?\d{0,2}$/,
  space: /\s/,
  /**
   * รูปแบบผสมที่อนุญาตทั้งหมด ประกอบด้วย:
   * - ตัวอักษรภาษาอังกฤษ (a-z, A-Z)
   * - ตัวอักษรภาษาไทย
   * - ตัวเลข (0-9)
   * - อักขระพิเศษ (-, /, _, ช่องว่าง)
   */
  mixed: /[a-zA-Z0-9\u0E00-\u0E7F\s\-\/_]/
};
function toCombineText(items, delimiter = " ") {
  if (!Array.isArray(items)) return "";
  return items.filter((v) => v && typeof v === "string" || typeof v === "number").join(delimiter);
}
function toHasKey(text) {
  if (typeof text != "string" && typeof text != "number") return "";
  let str = String(text || "").replace(/[^a-zA-Z0-9_\u0E00-\u0E7F ]/g, "");
  return str.replace(/ /g, "").toLocaleLowerCase();
}
var toNumber = (value) => checkNumber(value) ? Number(value) : 0;
function toCurrency(number, decimals = 0) {
  let value = toNumber(number);
  return value.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals
  });
}
function toRandomNumber(number1, number2 = 0) {
  const n1 = typeof number1 == "number" ? number1 : 0;
  const n2 = typeof number2 == "number" ? number2 : 0;
  const min = Math.min(n1, n2);
  const res = Math.abs(n1 - n2);
  const result = Math.round(Math.random() * res + min);
  return result || 0;
}
function toUid(count = 13, character) {
  let result = "";
  let characters = character || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}
function toChangePositionArray(items) {
  if (!Array.isArray(items)) return [];
  for (let j, x, i = items.length; i; j = parseInt(Math.random() * i + ""), x = items[--i], items[i] = items[j], items[j] = x) ;
  return items;
}
function toConvertData(content, allow = true) {
  function formatUndefined(payload) {
    const data = copyDeep(payload);
    if (data === null) return "null";
    if (data === void 0) return "undefined";
    if (Array.isArray(data)) {
      return data.map((item) => formatUndefined(item));
    }
    if (checkObject(data)) {
      return Object.entries(data).reduce(
        (acc, [key, value]) => __spreadProps(__spreadValues({}, acc), {
          [key]: formatUndefined(value)
        }),
        {}
      );
    }
    return data;
  }
  const res = formatUndefined(content);
  if (allow) return JSON.stringify(res).replace(/'|"|null|undefined/g, "");
  else return JSON.stringify(res).replace(/'|"/g, "");
}
function toPayloadByGroup(array, iteratee) {
  return array.reduce((acc, item) => {
    const key = String(iteratee(item));
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}
function toNumberByAverage(array, iteratee) {
  if (!array.length) return 0;
  const sum = array.reduce((acc, item) => acc + iteratee(item), 0);
  return sum / array.length;
}
function toNumberBySum(array, iteratee) {
  return array.reduce((sum, item) => sum + iteratee(item), 0);
}
function toPayloadByKey(array, iteratee) {
  return array.reduce((acc, item) => {
    acc[String(iteratee(item))] = item;
    return acc;
  }, {});
}
function toNumberByMax(array, iteratee) {
  if (!array.length) return 0;
  return Math.max(...array.map(iteratee));
}
function toNumberByMin(array, iteratee) {
  if (!array.length) return 0;
  return Math.min(...array.map(iteratee));
}
var toRegExp = (patterns, flags = "g") => {
  const combinedPattern = patterns.map((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.source;
    }
    return regexPatterns[pattern].source;
  }).join("|");
  return new RegExp(combinedPattern, flags);
};
function toReplaceTextByRegExp(text, patterns, flags = "g") {
  if (patterns.length === 0) return text;
  if (!text) return "";
  try {
    const pattern = toRegExp(patterns, flags);
    const matches = text.match(pattern) || [];
    return matches.join("");
  } catch (error) {
    console.error("Error in replaceTextByRegExp:", error);
    return text;
  }
}
function dateDiff(a, b = /* @__PURE__ */ new Date()) {
  if (!(a instanceof Date) || !(b instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const diffMs = Math.abs(a.valueOf() - b.valueOf());
  const secs = Math.floor(Math.abs(diffMs) / 1e3);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  return {
    days,
    hours: hours % 24,
    // Hours within the same day
    hoursTotal: hours,
    // Total hours
    minutesTotal: mins,
    // Total minutes
    minutes: mins % 60,
    // Minutes within the same hour
    seconds: secs % 60,
    // Seconds within the same minute
    secondsTotal: secs,
    // Total seconds
    milliseconds: diffMs
    // Total milliseconds
  };
}
function dateDiffToString(a, b = /* @__PURE__ */ new Date(), locale = "th") {
  if (!(a instanceof Date) || !(b instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const { days } = dateDiff(a, b);
  const isFuture = a.valueOf() > b.valueOf();
  const isThai = locale === "th";
  const msPerYear = 1e3 * 60 * 60 * 24 * 365.25;
  const yearDiff = Math.floor(Math.abs(a.valueOf() - b.valueOf()) / msPerYear);
  const remainingMs = Math.abs(a.valueOf() - b.valueOf()) % msPerYear;
  const msPerMonth = msPerYear / 12;
  const monthDiff = Math.floor(remainingMs / msPerMonth);
  const units = {
    year: isThai ? "ปี" : "year",
    month: isThai ? "เดือน" : "months",
    day: isThai ? "วัน" : "days",
    hour: isThai ? "ชั่วโมง" : "hours",
    minute: isThai ? "นาที" : "mins",
    recent: isThai ? "เมื่อสักครู่" : "just now"
  };
  const suffix = isFuture ? "" : isThai ? "ที่แล้ว" : " ago";
  if (yearDiff > 0) return `${yearDiff} ${units.year}${suffix}`;
  if (monthDiff > 0) return `${monthDiff} ${units.month}${suffix}`;
  if (days > 0) return `${days} ${units.day}${suffix}`;
  const { hoursTotal, minutesTotal } = dateDiff(a, b);
  if (hoursTotal > 0) return `${hoursTotal} ${units.hour}${suffix}`;
  if (minutesTotal > 0) return `${minutesTotal} ${units.minute}${suffix}`;
  return units.recent;
}
function addDate(value, days) {
  if (!(value instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const result = new Date(value.valueOf());
  result.setDate(result.getDate() + days);
  return result;
}
function addMonth(value, months) {
  if (!(value instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const result = new Date(value.valueOf());
  result.setMonth(result.getMonth() + months);
  return result;
}
function addHour(value, hours) {
  if (!(value instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const result = new Date(value.valueOf());
  result.setHours(result.getHours() + hours);
  return result;
}
function addMinute(value, minutes) {
  if (!(value instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const result = new Date(value.valueOf());
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}
function dateToCombine(value) {
  if (!(value instanceof Date)) {
    throw new Error("Invalid date input");
  }
  const year = value.getFullYear().toString();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate().toString().padStart(2, "0");
  const hour = value.getHours().toString().padStart(2, "0");
  const minute = value.getMinutes().toString().padStart(2, "0");
  const second = value.getSeconds().toString().padStart(2, "0");
  const valueOfDate = toCombineText([year, month, day], "-");
  const valueOfTime = toCombineText([hour, minute, second], ":");
  const valueOfValue = `${valueOfDate} ${valueOfTime}`;
  const thaiDate = value.toLocaleDateString("th", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    valueOfDate,
    // YYYY-MM-DD
    valueOfTime,
    // HH:mm:ss
    valueOfValue,
    // YYYY-MM-DD HH:mm:ss
    th: thaiDate
    // Thai date format
  };
}
var GROUP_DEFAULT = "anonymous";
var TIME_TO_LIVE_DEFAULT = 15 * 60 * 1e3;
var getDefaultKey = (key) => key || "undefined";
var getDefaultGroup = (group) => group || GROUP_DEFAULT;
var calculateExpiryTime = (timeToLive, minute = TIME_TO_LIVE_DEFAULT) => ci(timeToLive, (ttl) => {
  if (typeof ttl === "function") return ttl();
  if (typeof ttl === "number") return Date.now() + ttl;
  return addMinute(/* @__PURE__ */ new Date(), minute).getTime();
});
var createStorageItem = (key, value, expires) => ({
  [key]: {
    data: value,
    expires
  }
});
var GlobalPageStorage = class _GlobalPageStorage {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
    window.addEventListener("beforeunload", () => {
      this.clear();
    });
  }
  static getInstance() {
    if (!_GlobalPageStorage.instance) {
      _GlobalPageStorage.instance = new _GlobalPageStorage();
    }
    return _GlobalPageStorage.instance;
  }
  // เก็บข้อมูลตาม group และ key
  set(groupKey, value, timeToLive) {
    const { key, group } = groupKey;
    const storageItem = createStorageItem(key, value, timeToLive);
    const newItemRecord = __spreadValues(__spreadValues({}, this.getByGroup(group)), storageItem);
    this.cache.set(group, newItemRecord);
  }
  // ดึงข้อมูลตาม group
  getByGroup(group) {
    return this.cache.get(group) || {};
  }
  // ดึงข้อมูลตาม group และ key
  get(groupKey) {
    const { key, group } = groupKey;
    const item = this.cache.get(group);
    if (item && item[key]) {
      return item[key];
    }
    return null;
  }
  // ลบข้อมูลตาม group
  remove(group) {
    this.cache.delete(group);
  }
  // ล้างข้อมูลทั้งหมด
  clear() {
    this.cache.clear();
  }
};
function mapArray(items) {
  return items.reduce((pre, cur) => {
    if (Array.isArray(cur)) pre.push(...mapArray(cur));
    else pre.push(cur);
    return pre;
  }, []);
}
function chunkArray(items, n) {
  const result = [];
  for (let i = 0; i <= items.length; i += n) {
    result.push(items.slice(i, i + n));
  }
  return result.filter((v) => v.length);
}
var withDateDiff = (a) => (b) => dateDiff(a, b);
function withAddMonth(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number") return addMonth(a, b);
    else return addMonth(b, +a);
  };
}
function withAddDate(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number") return addDate(a, b);
    else return addDate(b, +a);
  };
}
function withAddHour(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number") return addHour(a, b);
    else return addHour(b, +a);
  };
}
function withAddMinute(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number") return addMinute(a, b);
    else return addMinute(b, +a);
  };
}
function withCombineText(a) {
  return function(b) {
    if (Array.isArray(a) && typeof b == "string") return toCombineText(a, b);
    else
      return toCombineText(b, typeof a == "string" ? a : " ");
  };
}
function mapToKeys(key) {
  return key.replace(/\[([^\[\]]*)\]/g, ".$1.").split(".").filter((t) => t).filter((t) => t !== "length");
}
function findObjectByKey(payload, keyNames) {
  if (typeof payload != "object" || payload == null) return false;
  const keys = keyNames.map((key) => mapToKeys(key));
  let isValue = false;
  for (let k = 0; k < keys.length; k++) {
    let items = keys[k];
    let data = payload;
    for (let i = 0; i < items.length; i++) {
      data = data[items[i]];
      isValue = data !== void 0;
      if (isValue == false) {
        break;
      }
    }
    if (isValue == false) {
      break;
    }
  }
  return isValue;
}
function mergeObject(...objects) {
  try {
    if (!objects.length) {
      throw new Error("At least one object is required");
    }
    return mapArray(objects).reduce((prev, obj) => {
      if (checkObject(obj)) {
        Object.keys(obj).forEach((key) => {
          const preValue = obj[key];
          const value = prev[key];
          if (Array.isArray(value) && Array.isArray(preValue)) {
            prev[key] = value.concat(...preValue);
          } else if (checkObject(value) && checkObject(preValue)) {
            prev[key] = mergeObject(value, preValue);
          } else {
            prev[key] = preValue;
          }
        });
      }
      return prev;
    }, {});
  } catch (error) {
    console.error("Error in mergeObject:", error);
    return {};
  }
}
function createObj(payload, key) {
  if (findObjectByKey(payload, [key])) {
    let handleArrayValue2 = function(data2, key2) {
      return { [key2]: data2[key2] };
    };
    var handleArrayValue = handleArrayValue2;
    let keys = mapToKeys(key);
    let length = keys.length;
    let data = payload;
    keys.forEach((_key, index) => {
      const dataValue = data[_key];
      if (dataValue) {
        if (Array.isArray(dataValue))
          data = handleArrayValue2(data, _key);
        else if (checkObject(dataValue)) data = dataValue;
        else data = { [`${_key}`]: data[_key] };
      }
      if (index === length - 1) {
        keys.reverse().forEach((k, indexKey) => {
          if (indexKey != 0) {
            data = { [`${k}`]: __spreadValues({}, data) };
          }
        });
        payload = Object.assign(data);
      }
    });
    return payload;
  }
  return {};
}
function selectObject(payload, items) {
  if (typeof payload != "object" || payload == null) return {};
  const objArray = [];
  items.forEach((keys) => {
    if (findObjectByKey(payload, [keys])) {
      objArray.push(createObj(payload, keys));
    }
  });
  return mergeObject(objArray);
}
function checkNestedValue(content, rules) {
  let conditions = [];
  const keys = Object.keys(rules);
  JSON.stringify(content, (_, nestedValue) => {
    keys.forEach((key) => {
      if (Array.isArray(rules[key]) && Array.isArray(nestedValue[key]) || rules[key] && typeof rules[key] == "object" && nestedValue[key] && typeof nestedValue[key] == "object") {
        const check = toConvertData(nestedValue[key]) == toConvertData(rules[key]);
        conditions.push(check);
      } else {
        conditions.push(nestedValue[key] == rules[key]);
      }
    });
    return nestedValue;
  });
  return conditions.filter((v) => v).length === keys.length;
}
var payloadByMax = (array, iteratee) => {
  if (!array.length) return void 0;
  return array.reduce((max, item) => {
    return iteratee(item) > iteratee(max) ? item : max;
  }, array[0]);
};
var payloadByMin = (array, iteratee) => {
  if (!array.length) return void 0;
  return array.reduce((max, item) => {
    return iteratee(item) < iteratee(max) ? item : max;
  }, array[0]);
};
function runProcess(items, next, startIndex = 0) {
  return _runProcess(items, next, startIndex);
}
function _runProcess(items, next, startIndex = 0) {
  const [index, length] = Array.isArray(startIndex) ? startIndex : [startIndex, items.length];
  const n = Array.isArray(startIndex) ? 1 : 0;
  if (index < length + n && index < items.length) {
    const data = items[index];
    next(data, index);
    _runProcess(items, next, [index + 1, length]);
  }
}
function validateObject(payload, keys, msgError = "") {
  if (typeof payload != "object" || !Array.isArray(keys)) {
    return {
      status: -1,
      message: "Error Data is Invalid!!"
    };
  }
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!findObjectByKey(payload, [key])) {
      return {
        status: 0,
        message: `!!${msgError} (${key} is undefined)`
      };
    }
  }
  return {
    status: 1,
    message: ""
  };
}
var validateEmail = (email, options = {}) => {
  const {
    allowEmpty = false,
    maxLength = 254,
    // ตามมาตรฐาน RFC 5321
    allowedDomains = [],
    blockDisposable = false
  } = options;
  if (!email) {
    return {
      isValid: allowEmpty,
      message: allowEmpty ? "" : "กรุณากรอกอีเมล"
    };
  }
  if (email.length > maxLength) {
    return {
      isValid: false,
      message: `อีเมลต้องไม่เกิน ${maxLength} ตัวอักษร`
    };
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: "รูปแบบอีเมลไม่ถูกต้อง"
    };
  }
  if (allowedDomains.length > 0) {
    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      return {
        isValid: false,
        message: `อีเมลต้องลงท้ายด้วย ${allowedDomains.join(" หรือ ")}`
      };
    }
  }
  if (blockDisposable) {
    const disposableDomains = [
      "fake.com",
      "hack.com",
      "block.org"
      // เพิ่มโดเมนอีเมลชั่วคราวอื่นๆ ตามต้องการ
    ];
    const domain = email.split("@")[1];
    if (disposableDomains.includes(domain)) {
      return {
        isValid: false,
        message: "ไม่อนุญาตให้ใช้อีเมลชั่วคราว"
      };
    }
  }
  return {
    isValid: true,
    message: ""
  };
};
function validatePayloadEmptyToNull(obj) {
  const data = copyDeep(obj);
  if (checkEmpty(data)) return null;
  if (Array.isArray(data)) {
    data.map((item) => validatePayloadEmptyToNull(item));
  }
  if (checkObject(data)) {
    return Object.entries(data).reduce(
      (acc, [key, value]) => __spreadProps(__spreadValues({}, acc), {
        [key]: validatePayloadEmptyToNull(value)
      }),
      {}
    );
  }
  return data;
}
var HttpError = class extends Error {
  constructor(status, statusText, data) {
    super(`HTTP Error: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = "HttpError";
  }
};
var StorageManager = class {
  constructor(storageType) {
    this.cache = /* @__PURE__ */ new Map();
    this.storageType = storageType;
  }
  // เก็บข้อมูลลง storage
  set(groupKey, value, timeToLive) {
    const { key, group } = groupKey;
    const storageItem = createStorageItem(key, value, timeToLive);
    const newItemRecord = __spreadValues(__spreadValues({}, this.getByGroup(group)), storageItem);
    switch (this.storageType) {
      case "localStorage":
        localStorage.setItem(group, JSON.stringify(newItemRecord));
        break;
      case "session":
        sessionStorage.setItem(group, JSON.stringify(newItemRecord));
        break;
      default:
        this.cache.set(group, newItemRecord);
    }
  }
  getByGroup(group) {
    let item = null;
    switch (this.storageType) {
      case "localStorage": {
        const stored = localStorage.getItem(group);
        item = stored ? JSON.parse(stored) : null;
        break;
      }
      case "session": {
        const stored = sessionStorage.getItem(group);
        item = stored ? JSON.parse(stored) : null;
        break;
      }
      default:
        item = this.cache.get(group) || null;
    }
    return item || {};
  }
  // ดึงข้อมูลจาก storage
  get(groupKey) {
    let item = null;
    const { key, group } = groupKey;
    switch (this.storageType) {
      case "localStorage": {
        const stored = localStorage.getItem(group);
        item = stored ? JSON.parse(stored) : null;
        break;
      }
      case "session": {
        const stored = sessionStorage.getItem(group);
        item = stored ? JSON.parse(stored) : null;
        break;
      }
      default:
        item = this.cache.get(group) || null;
    }
    if (item && item[key]) {
      const expires = item[key].expires;
      if (expires && Date.now() > expires) {
        this.remove(group);
        return null;
      }
      return item[key].data;
    }
    return null;
  }
  // ลบข้อมูลออกจาก storage
  remove(group) {
    switch (this.storageType) {
      case "localStorage":
        localStorage.removeItem(group);
        break;
      case "session":
        sessionStorage.removeItem(group);
        break;
      default:
        this.cache.delete(group);
    }
  }
  // ล้างข้อมูลทั้งหมดใน storage
  clear() {
    switch (this.storageType) {
      case "localStorage":
        localStorage.clear();
        break;
      case "session":
        sessionStorage.clear();
        break;
      default:
        this.cache.clear();
    }
  }
};
var PageStorageManager = class extends StorageManager {
  constructor() {
    super("store");
    this.pageStore = GlobalPageStorage.getInstance();
  }
  // เก็บข้อมูลแบบเดียวกับ StorageManager
  set(groupKey, value, timeToLive) {
    this.pageStore.set(groupKey, value, timeToLive);
  }
  // ดึงข้อมูลพร้อมตรวจสอบ expires
  get(groupKey) {
    const item = this.pageStore.get(groupKey);
    if (!item) return null;
    if (item.expires && Date.now() > item.expires) {
      this.remove(groupKey.group);
      return null;
    }
    return item.data;
  }
  // ลบข้อมูลตาม group
  remove(group) {
    this.pageStore.remove(group);
  }
  // ล้างข้อมูลทั้งหมด
  clear() {
    this.pageStore.clear();
  }
};
var TIME_OUT = 8e3;
var ADC = class {
  // สำหรับเก็บข้อมูล context จาก response ที่ต้องการเก็บไว้ใช้งาน
  constructor() {
    this.responseInterceptors = [];
    this.HttpError = null;
    this.context = void 0;
    this.storageManagers = {
      cache: new StorageManager("cache"),
      store: new PageStorageManager(),
      // สร้าง instance ของ PageStorageManager
      localStorage: new StorageManager("localStorage"),
      session: new StorageManager("session")
    };
  }
  /**
   * ทำการแปลงข้อมูลเป็น string และ return เพื่อใช้เป็น key ในการเก็บ cache
   * group คือชื่อกลุ่มของข้อมูลประกอบไปด้วย storage baseURL, method, query default คือ 'anonymous'
   * key คือข้อมูลที่จะถูกเก็บ ประกอบไปด้วย variables ที่ถูกแปลงเป็น string default คือ 'undefined'
   */
  getGroupAndKey(config) {
    const check = !checkEmpty(config.variables) && checkObject(config.variables);
    const group = toCombineText(
      [config.storage, config.baseURL, config.method, config.query],
      ""
    );
    const key = check ? toHasKey(toConvertData(config.variables || {}, true)) : "";
    return {
      group: toHasKey(getDefaultGroup(group)),
      key: getDefaultKey(key)
    };
  }
  /**
   * เพิ่ม interceptor สำหรับจัดการ response
   *  สามารถ เพิ่ม ลบ แก้ไข หรือปรับปรุงข้อมูล  response ก่อนที่จะถูก return
   * คืนค่าฟังก์ชันสำหรับลบ interceptor
   */
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index !== -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }
  /**
   * สร้าง AbortController สำหรับจัดการ timeout
   */
  createAbortController(timeout = TIME_OUT) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), timeout);
    return controller;
  }
  /**
   * ประมวลผล response ผ่าน interceptors ทั้งหมด
   */
  processResponse(response, nameKeys) {
    return __async(this, null, function* () {
      const names = nameKeys.split(".");
      let result = response;
      for (const name of names) {
        result = result[name] || result;
      }
      for (const interceptor of this.responseInterceptors) {
        result = yield interceptor(result);
      }
      return result;
    });
  }
  /**
   * ประมวลผล response หา error และ return ข้อมูล
   */
  processResponseConTextApi(response, errorKeys) {
    if (!errorKeys) return;
    const names = errorKeys.split(".");
    let result = response;
    for (const name of names) {
      if (result[name] === void 0) return;
      result = result[name];
    }
    if (result) {
      this.context = result;
    }
  }
  handleStorage(config, fetcher) {
    return __async(this, null, function* () {
      const groupKey = this.getGroupAndKey(config);
      const timeToLive = calculateExpiryTime(config.timeToLive);
      if (config.storage) {
        const responseStorage = this.storageManagers[config.storage].get(groupKey);
        if (responseStorage) {
          return responseStorage;
        }
      }
      const response = yield fetcher();
      if (config.storage) {
        this.storageManagers[config.storage].set(
          groupKey,
          response,
          timeToLive
        );
      }
      return response;
    });
  }
  /**
   * ส่ง HTTP request
   * @template T ประเภทข้อมูลที่คาดว่าจะได้รับกลับมา
   */
  request(config) {
    return __async(this, null, function* () {
      return this.handleStorage(config, () => __async(this, null, function* () {
        config.token = config.token || "";
        config.retries = config.retries || 0;
        config.contentType = config.contentType || "application/json";
        config.interceptors = config.interceptors || [];
        config.query = config.query || "";
        config.variables = config.variables || {};
        config.timeout = config.timeout || TIME_OUT;
        config.name = config.name || "";
        config.baseURL = config.baseURL || "";
        config.method = config.method || "POST";
        config.retries = config.retries || 0;
        config.beforeEach = config.beforeEach || [];
        config.contextApi = config.contextApi || "";
        const headersForApi = new Headers(__spreadValues(__spreadProps(__spreadValues({}, config.headers), {
          "Content-Type": config.contentType
        }), config.token && {
          Authorization: `Bearer ${config.token}`
        }));
        for (const interceptor of config.interceptors) {
          this.addResponseInterceptor(interceptor);
        }
        const payload = config.query ? { query: config.query, variables: config.variables } : config.variables;
        const controller = this.createAbortController(config.timeout);
        try {
          this.context = null;
          this.HttpError = null;
          const options = {
            method: config.method,
            headers: headersForApi,
            signal: controller.signal
          };
          if (!checkEmpty(payload)) {
            options.body = JSON.stringify(payload);
          }
          const response = yield fetch(config.baseURL, options);
          const data = yield response.json();
          for (const before of config.beforeEach) {
            before(data);
          }
          this.processResponseConTextApi(data, config.contextApi);
          if (!response.ok || response.status >= 400) {
            this.HttpError = new HttpError(
              response.status,
              response.statusText
            );
            throw new HttpError(response.status, response.statusText);
          }
          const processedData = yield this.processResponse(
            data,
            config.name
          );
          return processedData;
        } catch (error) {
          if (error instanceof HttpError && config.retries > 0) {
            return this.request(__spreadProps(__spreadValues({}, config), {
              retries: config.retries - 1
            }));
          }
          throw error;
        }
      }));
    });
  }
  /**
   * Shorthand methods สำหรับ HTTP methods ต่างๆ
   */
  get(config) {
    return __async(this, null, function* () {
      return this.request(__spreadProps(__spreadValues({}, config), { method: "GET" }));
    });
  }
  post(config) {
    return __async(this, null, function* () {
      return this.request(__spreadProps(__spreadValues({}, config), { method: "POST" }));
    });
  }
  put(config) {
    return __async(this, null, function* () {
      return this.request(__spreadProps(__spreadValues({}, config), { method: "PUT" }));
    });
  }
  delete(config) {
    return __async(this, null, function* () {
      return this.request(__spreadProps(__spreadValues({}, config), { method: "DELETE" }));
    });
  }
};
var GPS = GlobalPageStorage.getInstance();
export {
  ADC,
  GPS,
  HttpError,
  addDate,
  addHour,
  addMinute,
  addMonth,
  checkEmail,
  checkEmpty,
  checkFormatDate,
  checkItemDuplicate,
  checkNestedValue,
  checkNumber,
  checkObject,
  chunkArray,
  ci,
  copyDeep,
  createObj,
  dateDiff,
  dateDiffToString,
  dateToCombine,
  delayPromise,
  findObjectByKey,
  mapArray,
  mapToKeys,
  mergeObject,
  payloadByMax,
  payloadByMin,
  runProcess,
  selectObject,
  toChangePositionArray,
  toCombineText,
  toConvertData,
  toCurrency,
  toHasKey,
  toNumber,
  toNumberByAverage,
  toNumberByMax,
  toNumberByMin,
  toNumberBySum,
  toPayloadByGroup,
  toPayloadByKey,
  toRandomNumber,
  toRegExp,
  toReplaceTextByRegExp,
  toUid,
  validateEmail,
  validateObject,
  validatePayloadEmptyToNull,
  withAddDate,
  withAddHour,
  withAddMinute,
  withAddMonth,
  withCi,
  withCombineText,
  withDateDiff
};
//# sourceMappingURL=adc-directive.js.map
