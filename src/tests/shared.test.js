import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {Settings, Options, TextInput} from '../shared.js';

let optionsList = [
    {id:"edit",name: "Edit"},
    {id:"Delete",name:"Delete"}
];

it("should render the settings image", () => {
    const settings = TestUtils.renderIntoDocument(<Settings optionsList={optionsList}/>);
    var settingsImage = TestUtils.findRenderedDOMComponentWithClass(settings, "settings");
    expect(settingsImage).not.toBeNull();
    expect(settingsImage.src).toContain('http://localhost/ic-tab-ui-setting.svg');
});

it("should open the options popup on click", (done) => {
    const settings = TestUtils.renderIntoDocument(<Settings optionsList={optionsList}/>);
    var settingsImage = TestUtils.findRenderedDOMComponentWithClass(settings, "settings");
    TestUtils.Simulate.click(settingsImage);
    setTimeout(function() {
      expect(settingsImage.src).toContain('http://localhost/ic-tab-ui-setting-active.svg');
      expect(TestUtils.findRenderedDOMComponentWithClass(settings, "tile-options-above")).not.toBeNull();
      done();
    }, 1);
});

it("should remove the click listener when component is unmounted", () => {
    spyOn(document, "removeEventListener");
    const settings = TestUtils.renderIntoDocument(<Settings optionsList={optionsList}/>);
    settings.componentWillUnmount();
    expect(document.removeEventListener).toHaveBeenCalledWith('click', settings._handleClick, false);
});

it("should hide options if handleClick is called by a click outside the component", () => {
    const settings = TestUtils.renderIntoDocument(<Settings optionsList={optionsList}/>);
    var event = {};
    settings._handleClick(event);
    expect(TestUtils.findRenderedDOMComponentWithClass(settings, "settings").src).toContain("http://localhost/ic-tab-ui-setting.svg");
});

it("should do nothing if handleClick is called by a click inside the component", () => {
    const settings = TestUtils.renderIntoDocument(<Settings optionsList={optionsList}/>);
    var event = {};
    event.target = settings.component;
    settings._handleClick(event);
});


it("should display three options and default position to above", () => {
    const options = TestUtils.renderIntoDocument(<Options optionsList={optionsList}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(options, "tile-options-above")).not.toBeNull();
    var items = TestUtils.scryRenderedDOMComponentsWithClass(options, "Items");
    expect(items.length).toEqual(2);
    expect(items[0].innerHTML).toEqual("Edit");
    expect(items[1].innerHTML).toEqual("Delete");
});

it("should update class based on postion passed", () => {
    const options = TestUtils.renderIntoDocument(<Options optionsList={optionsList} position="below"/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(options, "tile-options-below")).not.toBeNull();
});

it("should call the Edit click handlers when Edit is clicked", (done) => {
    let handleOptionsClick = jest.fn();

    const options = TestUtils.renderIntoDocument(<Options optionsList={optionsList} handleOptionsClick={handleOptionsClick}/>);
    var items = TestUtils.scryRenderedDOMComponentsWithClass(options, "Items");
    TestUtils.Simulate.click(items[0]);

    setTimeout(() => {
      expect(handleOptionsClick).toHaveBeenCalledWith("edit");
      done();
    }, 100);
});

it('should render normal text input field without error when errorMessage prop is null', () => {
    var textValue = "test1";
    var testErrorMessage = null;
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue} errorMessage={testErrorMessage}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "name-container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container")).not.toBeNull();
    expect(TestUtils.scryRenderedDOMComponentsWithClass(textInput, "errorMessage").length).toEqual(0);
});

it('should change state as the value changes', () => {
    var textValue = "test1";
    var textInput = TestUtils.renderIntoDocument(
                    <TextInput values={textValue}/>
                  );
    var text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="test2";
    TestUtils.Simulate.change(text);
    var newText = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(newText.value).toEqual("test2");
});

it("should set the max length property for the input when it is passed as a prop", () => {
    var textValue = "test1";
    var textInput = TestUtils.renderIntoDocument(
                    <TextInput values={textValue} maxLength="100"/>
                  );
    var text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.value).toEqual("test1");
    expect(text.getAttribute("maxlength")).toEqual("100");
});

it("should add focussed class when text input is focussed", (done) => {
    var textValue = "";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue}/>);
    TestUtils.Simulate.focus(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input focussed")).not.toBeNull();
      done();
    }, 10);
});

it("should remove focussed class when text input is blurred", (done) => {
    var textValue = "";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue}/>);
    TestUtils.Simulate.focus(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input focussed")).not.toBeNull();
      TestUtils.Simulate.blur(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
      setTimeout(() => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(textInput, "text-input focussed").length).toEqual(0);
        done();
      }, 10);
    }, 10);
});

it("should call focus on input when clicked", (done) => {
    var textValue = "";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue}/>);
    spyOn(textInput.input, "focus");
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(textInput.input.focus).toHaveBeenCalled();
      done();
    }, 10);
});

it("should change to error state and show error message when errorMessage prop is received", () => {
    var textValue = "";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue} errorMessage="testErrorMessage"/>);

    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input error")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "errorMessage")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "errorMessage").innerHTML).toEqual("testErrorMessage");
});

it("should call onMaxLengthReached when maxLength is reached", (done) => {
    var textValue = "test1";
    var onMaxLengthReached = function () {
      done();
    };
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue} maxLength="5" onMaxLengthReached={onMaxLengthReached}/>);
    var text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="test2";
    TestUtils.Simulate.change(text);
});

it("should not call onMaxLengthReached when maxLength is not reached", () => {
    var textValue = "test1";
    var onMaxLengthReached = jasmine.createSpy("onMaxLengthReached");
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue} maxLength="5" onMaxLengthReached={onMaxLengthReached}/>);
    var text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="test";
    TestUtils.Simulate.change(text);
    expect(onMaxLengthReached).not.toHaveBeenCalled();
});

it("should call _onClick on executing setFocus", () => {
    var textValue = "test1";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue}/>);
    spyOn(textInput, "_onClick");
    textInput.setFocus();
    expect(textInput._onClick).toHaveBeenCalled();
});

it('should change classsName if shortInput prop is set', () => {
    var textValue = "test1";
    var textInput = TestUtils.renderIntoDocument(
                    <TextInput values={textValue} shortInput/>
                  );
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "no-underline")).not.toBeNull();
    var text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="test2";
    TestUtils.Simulate.change(text);
    var newText = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(newText.value).toEqual("test2");
});

it('should show message as error when errorMessage prop is not null', () => {
    var textValue = "test1";
    var testErrorMessage = "TestErrorMessage";
    var textInput = TestUtils.renderIntoDocument(<TextInput values={textValue} errorMessage={testErrorMessage}/>);
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "name-container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "errorMessage")).not.toBeNull();
    expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "errorMessage").innerHTML).toEqual("TestErrorMessage");
});
