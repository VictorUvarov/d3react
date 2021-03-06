export default class Utils {
  static filterObjectList(list, key, keyIsNum) {
    let filteredList = list.filter(d => {
      return keyIsNum ? d[key] !== "" && +d[key] !== 0.0 : d[key] !== "";
    });
    return filteredList;
  }

  static getListFromListOfObjects(list, key, isKeyNum) {
    let l = [];
    list.forEach(element => {
      isKeyNum === true ? l.push(+element[key]) : l.push(element[key]);
    });
    return l;
  }

  static getRandomColor() {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }

  static cleanTime(timeString) {
    // 012345678 [index]
    // 13:34:00\0 [value]
    let hr = timeString.substring(0, 2);

    return parseInt(hr) % 24 + ":00:00";
  }

  static getUniqueListFromKey(list, key) {
    let uniqueList = [];
    list.forEach(item => {
      let i = uniqueList.findIndex(x => x[key] === item[key]);
      if (i <= -1) {
        uniqueList.push(item[key]);
      }
    });
    uniqueList = [...new Set(uniqueList)];
    return uniqueList;
  }
  /*
    For each data element in power outage data
    match the config name with the power outage geographic area
    e.g. config.name ="Alaska"  filteredData.geographicAreas = "Alaska"
    if they match add the color to the config so the map can color that state
  */
  static addKeyToObjectFromMatchingListKey(
    list,
    object,
    valueFunction,
    config
  ) {
    list.forEach(d => {
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          if (
            d[config.matchingKeyInList].includes(
              element[config.matchingKeyInObject]
            )
          ) {
            const num = +d[config.valueKey];
            object[key][config.keyToAdd] = valueFunction(num);
          }
        }
      }
    });

    return object;
  }
}
