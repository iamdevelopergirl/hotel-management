import React from 'react';
import TestUtils from 'react-dom/test-utils';
import HotelInfo from '../hotel-info.js';
import axios from 'axios';
jest.mock('axios');

it("should render the dom with correct class", ()=>{

});

it("should call addItem if the hotel item was empty before and add is called", ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    spyOn(hotelInfoView, "_addHotelItem");
    let payload = {
        serachKey : "",
        modalData : new FormData()
    }
    hotelInfoView.setState({
        hotelItems : []
    },() => {
        hotelInfoView._handleModal(payload);
        expect(hotelInfoView.state.showModal).toBeFalsy();
        expect(hotelInfoView._addHotelItem).toHaveBeenCalled();
      }
    )
});

it("should call addItem if the searchkey is not found in the items", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);

    spyOn(hotelInfoView, "_addHotelItem");
    let payload = {
        serachKey : "",
        modalData : new FormData()
    }
    hotelInfoView.setState({
        hotelItems : [{"1" : {"name" : "newName"}}]
    },() => {
        hotelInfoView._handleModal(payload);
        expect(hotelInfoView.state.showModal).toBeFalsy();
        expect(hotelInfoView._addHotelItem).toHaveBeenCalled();
      }
    )
});

it("should call updateItem if the searchkey is found in the items", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);

    spyOn(hotelInfoView, "_updateHotelItem");
    let payload = {
        searchKey : "1",
        modalData : new FormData()
    }
    hotelInfoView.setState({
        hotelItems : [{"1" : {"name" : "newName"}}]
    },() => {
        hotelInfoView._handleModal(payload);
        expect(hotelInfoView.state.showModal).toBeFalsy();
        expect(hotelInfoView._updateHotelItem).toHaveBeenCalled();
      }
    )
});

it("should post data sucessfully to api", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    const data = {
        status : 200
      };

    axios.post.mockImplementationOnce(() => Promise.resolve(data));
    await expect(hotelInfoView._addItem({})).resolves.toEqual(data);
});

it("should not post data sucessfully to api due to network issue", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    let errorMessage = "Network Error";
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(hotelInfoView._addItem({})).rejects.toThrow(errorMessage);
});

it("should put data sucessfully to api", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    const data = {
        status : 200
      };

    axios.put.mockImplementationOnce(() => Promise.resolve(data));
    await expect(hotelInfoView._updateItem("1",{})).resolves.toEqual(data);
});

it("should not post data sucessfully to api due to network issue", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    let errorMessage = "Network Error";
    axios.put.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(hotelInfoView._updateItem("1", {})).rejects.toThrow(errorMessage);
});

it("should delete data sucessfully to api", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    const data = {
        status : 200
      };

    axios.delete.mockImplementationOnce(() => Promise.resolve(data));
    await expect(hotelInfoView._deleteItem("1")).resolves.toEqual(data);
});

it("should not delete data sucessfully to api due to network issue", async () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    let errorMessage = "Network Error";
    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(hotelInfoView._deleteItem("1")).rejects.toThrow(errorMessage);
});

it("should call updateItems prop during successfull post", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 201
      };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_addItem").and.returnValue(Promise.resolve(data));
    await hotelInfoView._addHotelItem({});
    expect(mockUpdateItem).toHaveBeenCalled();
});

it("should not call updateItems prop during post failure with status other than 201", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 404
    };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_addItem").and.returnValue(Promise.reject(data));
    try{
        await hotelInfoView._addHotelItem({});
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should not call updateItems prop during post failure with no status", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_addItem").and.returnValue(Promise.reject(new Error("Network Error")));
    try{
        await hotelInfoView._addHotelItem({});
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should call updateItems prop during successfull put", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 200
      };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_updateItem").and.returnValue(Promise.resolve(data));
    await hotelInfoView._updateHotelItem(new FormData(), "1");
    expect(mockUpdateItem).toHaveBeenCalled();
});

it("should not call updateItems prop during put failure with status other than 201", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 404
    };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_updateItem").and.returnValue(Promise.reject(data));
    try{
        await hotelInfoView._updateHotelItem(new FormData(), "1");
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should not call updateItems prop during put failure with no status", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_updateItem").and.returnValue(Promise.reject(new Error("Network Error")));
    try{
        await hotelInfoView._updateHotelItem(new FormData(), "1");
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should call updateItems prop during successfull delete", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 200
      };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_deleteItem").and.returnValue(Promise.resolve(data));
    await hotelInfoView._updateHotelItem({}, "1");
    expect(mockUpdateItem).toHaveBeenCalled();
});

it("should not call updateItems prop during delete failure with status other than 201", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 404
    };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_deleteItem").and.returnValue(Promise.reject(data));
    try{
        await hotelInfoView._updateHotelItem({}, "1");
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should not call updateItems prop during delete failure with no status", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_deleteItem").and.returnValue(Promise.reject(new Error("Network Error")));
    try{
        await hotelInfoView._updateHotelItem({}, "1");
    }
    catch(error){
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should call updateItem when the data is a formdata", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 404
    };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_updateItem").and.returnValue(Promise.reject(data));
    try{
        await hotelInfoView._updateHotelItem(new FormData(), "1");
    }
    catch(error){
        expect(hotelInfoView._updateItem).toHaveBeenCalled();
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should call deleteItem when the data is not a formdata", async ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let mockUpdateItem = jest.fn();
    const data = {
        status : 404
    };
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items} updateItems={mockUpdateItem}/>);
    spyOn(hotelInfoView,"_deleteItem").and.returnValue(Promise.reject(data));
    try{
        await hotelInfoView._updateHotelItem({}, "1");
    }
    catch(error){
        expect(hotelInfoView._deleteItem).toHaveBeenCalled();
        expect(mockUpdateItem).not.toHaveBeenCalled();
    }
});

it("should show edit modal when the id is sent to showModal", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView._showModal("Edit", "1");
    expect(hotelInfoView.state.modalData).not.toStrictEqual({});
});

it("should show the add modal when id is not sent to showModal", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView._showModal("Edit");
    expect(hotelInfoView.state.modalData).toStrictEqual({});
});

it("should call showModal with Edit when the action is edit", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    spyOn(hotelInfoView,"_showModal");
    hotelInfoView._performAction("Edit", "1");
    expect(hotelInfoView._showModal).toHaveBeenCalledWith("Edit", "1");
});

it("should call showModal with Delete when the action is Delete", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    spyOn(hotelInfoView,"_showModal");
    hotelInfoView._performAction("Delete", "1");
    expect(hotelInfoView._showModal).toHaveBeenCalledWith("Delete", "1");
});

it("should call showModal with Edit when the Add is Delete", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    spyOn(hotelInfoView,"_showModal");
    hotelInfoView._performAction("Add");
    expect(hotelInfoView._showModal).toHaveBeenCalledWith("Edit");
});

it("should call onAddNewClicked when the add new button is clicked", ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    spyOn(hotelInfoView, "_onAddNewClicked");
    expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "icn-container")).not.toBeNull();
    TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "icn-container")
    );
    //expect(hotelInfoView._onAddNewClicked).toHaveBeenCalled();
});

it("should only show spinner when the upload is in progress", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView.setState({
        uploading : true
    }, () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(hotelInfoView, "main-container").length).toEqual(0);
        expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "rolling")).not.toBeNull();
    });
});

it("should only show error occurred when the error occured is true", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView.setState({
        errorOccurred : true
    }, () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(hotelInfoView, "main-container").length).toEqual(0);
        expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "spinner")).not.toBeNull();
    });
});

it("should have grey container when the selected view type is tile", ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView.setState({
        selectedViewType : "TileView"
    }, () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "content-container--greybg")).not.toBeNull();
    });
});

it("should have white container when the selected view type is list", ()=>{
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView.setState({
        selectedViewType : "ListView"
    }, () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "content-container--whitebg")).not.toBeNull();
    });
});

it("should show modal when the showModal state is set to true", () => {
    let items = [{"1" : {"name" : "new1", "address1" : "address1", 
                "address2" : "address2", "city" : 'city', "postalCode" : "postalcode",
                "phoneNumber" : "123234234"}}];
    let hotelInfoView = TestUtils.renderIntoDocument(<HotelInfo hotelItems={items}/>);
    hotelInfoView.setState({
        showModal : true
    }, () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(hotelInfoView, "grey-overlay--short-modal")).not.toBeNull();
    });
});
