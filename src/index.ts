if (typeof global.crypto !== "object") {
  // @ts-ignore
  global.crypto = {};
}

if (typeof global.crypto.getRandomValues !== "function") {
  global.crypto.getRandomValues = require('polyfill-crypto.getrandomvalues');
}

export * from "typeorm";

export { DateUtils } from "typeorm/browser/util/DateUtils";
export { OrmUtils } from "typeorm/browser/util/OrmUtils";
