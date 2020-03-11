/** 
* @function isNil
* @param obj The object to check.
* @return True if obj is null or undefined.
*/
export function isNil(obj){
    if(obj == undefined || obj == null){
        return true;
    }
    return false;
}

/**
* @function isEmptyObject
* @abstract return true/false whether object is empty or not
* @param  object.
* @return true/false
*/
export function isEmptyObject(obj){
    if(isNil(obj) || Object.keys(obj).length === 0){
        return true;
    }
    return false;
}

/**
 * @function isString
 * @param {string} str. The string whose type is to be checked
 * @returns True if str is not null/undefined and type is string
*/
export function isString(str) {
    if (!isNil(str) && (typeof str === "string")) {
        return true;
    }
    return false;
}

/**
 * @function isFormDataObject
 * @param {FormData} formdata. The string whose type is to be checked
 * @returns True if formdata is instance of FormData, false otherwise
*/
export function isFormDataObject(formdata){
    if(!isNil(formdata) && (formdata instanceof FormData)){
        return true;
    }
    return false;
}