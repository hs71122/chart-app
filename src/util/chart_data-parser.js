export function aggregate(data, keyFields, accumulator) {
  var createNewObj = (ref, fields) => {
    return fields.reduce((result, key) => {
      return Object.assign(result, { [key]: ref[key] });
    }, {});
  };
  return Object.values(
    data.reduce((result, object, index, ref) => {
      let key = keyFields.map((key) => object[key]).join("");
      let val = result[key] || createNewObj(object, keyFields);
      val[accumulator] = (val[accumulator] || 0) + object[accumulator];
      return Object.assign(result, { [key]: val });
    }, {})
  );
}

export function csvFileToArray(string) {
  const csvHeader = string.slice(0, string.indexOf("\n")).trim().split(",");
  const csvRows = string
    .slice(string.indexOf("\n") + 1)
    .trim()
    .split("\n");

  const array = csvRows.map((i) => {
    const values = i.trim().split(",");
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
  });
  return array;
}
