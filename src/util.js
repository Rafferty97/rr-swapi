export function toSingular(plural) {
  if (plural == 'people')
    return 'person';
  if (plural.substr(plural.length-1) == 's')
    return plural.substr(0, plural.length-1);
  throw 'Cannot convert "'+plural+'" to singular';
}
