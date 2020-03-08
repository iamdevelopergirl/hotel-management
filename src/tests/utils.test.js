import {isNil, isEmptyObject, isFormDataObject} from '../utils.js';

it("should return correct value for isNil", ()=>{
    let ret = isNil(null);
    expect(ret).toBe(true);

    ret = isNil(undefined);
    expect(ret).toBe(true);

    ret = isNil();
    expect(ret).toBe(true);

    ret = isNil({});
    expect(ret).toBe(false);

    ret = isNil({"1" : "1"});
    expect(ret).toBe(false);
});


it("should return correct value for isEmptyObject", ()=>{
    let ret = isEmptyObject(null);
    expect(ret).toBe(true);

    ret = isEmptyObject(undefined);
    expect(ret).toBe(true);

    ret = isEmptyObject();
    expect(ret).toBe(true);

    ret = isEmptyObject({});
    expect(ret).toBe(true);

    ret = isEmptyObject({"1" : "1"});
    expect(ret).toBe(false);
});

it("should return correct value for isFormDataObject", ()=>{
    let ret = isFormDataObject(null);
    expect(ret).toBe(false);

    ret = isFormDataObject(undefined);
    expect(ret).toBe(false);

    ret = isFormDataObject();
    expect(ret).toBe(false);

    ret = isFormDataObject({});
    expect(ret).toBe(false);

    ret = isFormDataObject({"1" : "1"});
    expect(ret).toBe(false);

    let formdata = new FormData();
    ret = isFormDataObject(formdata);
    expect(ret).toBe(true);
});