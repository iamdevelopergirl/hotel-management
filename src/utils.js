export function isNil(obj){
    if(obj == undefined || obj == null){
        return true;
    }
    return false;
}

export function isEmptyObject(obj){
    if(isNil(obj) || Object.keys(obj).length === 0){
        return true;
    }
    return false;
}

export function isString(str) {
    if (!isNil(str) && (typeof str === "string")) {
        return true;
    }
    return false;
}

export function HotelAPI(authorizationToken, paramId){
    let url = "/api/hotel";
    let headers = {
        Authorization : authorizationToken
    };
    let params = {}
    if(!isNil(paramId)){
        params = {
            hotelId : paramId
        }
    }
    return {url, headers, params};
}

export function isFormDataObject(formdata){
    if(!isNil(formdata) && (formdata instanceof FormData)){
        return true;
    }
    return false;
}