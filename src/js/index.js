import '../sass/index.scss'

//
const App =  document.getElementById('root');
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
        inputDescription: '.add__note',
        inputBtn: '.add__btn',
        container: '.note-container',
        inputSave: 'save__btn',
        inputEdit: 'edit__btn',
        inputChangeBlue: 'blue__btn',
        inputChangeReed: 'red__btn',
        inputChangeGreen: 'green__btn'
    };  

    return {
        getInput: function() {
            return{
                description: document.querySelector(DOMstrings.inputDescription).value
            };   
        },

        addListItem: function(obj, des) {
            var html, newHtml, element;
            
            if (des !== '') {
                element = DOMstrings.container;
                html = '<div class="note-container__edit"><input type="text" class="edit__note" placeholder="%note%"><div class="edit-controls"><div class="change-color"><button class="blue__btn btn"></button><button class="red__btn btn"></button><button class="green__btn btn"></button></div><div class="controls"><button class="edit__btn btn">Edit</button><button class="save__btn btn">Save</button><button class="delete__btn btn">Delete</button></div></div></div>';
            }    

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%note%', obj.description);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

//GLOBAL APP CONTROLLER
var controller = (function(noteCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        //document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        //document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);        
    };

    var ctrlAddItem = function() {
        var input, newItem;
        
        // 1. Get the field input data
        input = UICtrl.getInput();  
        
        console.log(input)
        
        if (input.description !== "") {
            // 2. Add the item to the budget controller
            newItem = noteCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            //UICtrl.clearFields();

            // 5. Calculate and update budget
            //updateBudget();
            
            // 6. Calculate and update percentages
            //updatePercentages();
        }
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };

})(noteController, UIController);

controller.init();
