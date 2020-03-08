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