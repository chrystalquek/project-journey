// helpers for table filtering

// takes in an enum and returns a string array with all its keys
// e.g. enum {"a", "b"} => ["a", "b"]
export const getEnumKeys = (enumObj: any) => Object.keys(enumObj).filter(key => !isNaN(Number(enumObj[key])));

// takes in an enum and returns a filter object containing enum key to boolean pairs, initialized to true
// e.g. enum {"a", "b"} => {"a": true, "b": true}
export const initializeFilterObject = (enumObj: any) => {
    const keys = getEnumKeys(enumObj);
    const filterObject: Record<any, boolean> = {};
    keys.forEach(key => filterObject[key] = true);
    return filterObject;
}

// takes in a filter object and returns a comma-separated string representation
// e.g. {"a": true, "b": false, "c": true} => ",a,c"
export const convertFilterObjectToQueryString = (filterObj: any) => Object.keys(filterObj).reduce((a, b) => filterObj[b] ? a + "," + b : a, "");
