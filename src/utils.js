export function isNil(obj){
    if(obj == undefined || obj == null){
        return true;
    }
}

export function isEmptyObject(obj){
    if(isNil(obj) || Object.keys(obj).length === 0){
        return true;
    }
}