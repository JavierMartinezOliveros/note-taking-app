import "../sass/index.scss";

//
const App = document.getElementById("root");
//NOTE CONTROLLER
var noteController = (function() {
  var Note = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  return {
    addItem: function(des, val) {
      var newItem;

      if (des !== "") {
        newItem = new Note(des, val);
      }

      // Return the new element
      return newItem;
    }
  };
})();

//UI CONTROLLER
var UIController = (function() {
  var DOMstrings = {
    inputDescription: ".add__note",
    inputBtn: ".add__btn",
    container: ".note-container",
    inputEdit: "edit__btn",
    inputChangeBlue: "blue__btn",
    inputChangeReed: "red__btn",
    inputChangeGreen: "green__btn"
  };

  return {
    getInput: function() {
      return {
        description: document.querySelector(DOMstrings.inputDescription).value
      };
    },

    addListItem: function(obj, des) {
      var html, newHtml, element;

      if (des !== "") {
        element = DOMstrings.container;

        html = `
                        <div class="note-container__edit">
                            <div class="bg-color">
                                <input type="text" class="edit__note" placeholder="${obj.description}" disabled="true">
                                <div class="edit-controls">
                                    <div class="change-color">
                                            <button class="blue__btn btn" changecolor datacolor="blue"></button>
                                            <button class="red__btn btn" changecolor datacolor="red"></button>
                                    <button class="green__btn btn" changecolor datacolor="green"></button>
                                    </div>
                                    <div class="controls">
                                        <button class="edit__btn btn">Edit</button>
                                        <button class="delete__btn btn">Delete</button>
                                    </div>
                                </div>
                            </div>
        				</div>
        			`;
      }


      let allInputs = document.getElementsByClassName("add__note");
      const addInput = allInputs[0];

      document.querySelector(element).insertAdjacentHTML("beforeend", html);
      addInput.value = "";
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL APP CONTROLLER
var controller = (function(noteCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlAlltriggerClicks);

  };

  const ctrlAlltriggerClicks = function(fun) {
    const thisButton = fun.toElement;
    let classBt = !!thisButton.getAttribute("datacolor")
      ? "color"
      : thisButton.className;

    switch (classBt) {
      case "delete__btn btn":
        ctrlDeleteItem(fun);
        break;
      case "edit__btn btn":
        ctrlEditItem(fun);
        break;
      case "color":
        ctrlEditColor(fun);
        break;
    }
  };

  const ctrlEditColor = function(del) {
    const thisButton = del.toElement;
    let color = thisButton.getAttribute("datacolor");
    let el = del.toElement;
		while (el.className.indexOf('bg-color') === -1) {
      el = el.parentNode;
    }
    el.setAttribute("class", `bg-color ${color}`);
  };

  const ctrlEditItem = function(del) {
    let el = del.toElement;
    while (el.className !== "note-container__edit") {
      el = el.parentNode;
    }
    let inputEdit = el.getElementsByClassName("edit__note");
    inputEdit[0].disabled = false;
    inputEdit[0].focus();
  };

  const ctrlDeleteItem = function(del) {
    let el = del.toElement;
    while (el.className !== "note-container__edit") {
      el = el.parentNode;
    }
    el.remove();
  };

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get the field input data
    input = UICtrl.getInput();

    if (input.description !== "") {
      // 2. Add the item
      newItem = noteCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);


    }
  };

  return {
    init: function() {
      console.log("Application has started.");
      setupEventListeners();
    }
  };
})(noteController, UIController);

controller.init();
