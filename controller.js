
//app controller
var controller = (function (budgetCtrl, UICtrl) {
    //event handler
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        $(DOM.inputBtn).click(function () {
            ctrlAddItem();
        });

        //when "Enter" key pressed
        $('.add__value').keypress(function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    }

    //event handler location-find the parent of the delete button that is shared for Inc and Exp, of which is the class="container clearfix"


    var updateBudget = function () {
        //calculate budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget = budgetCtrl.getBudget();
        //display budget
        console.log(budget);
        UICtrl.displayBudget(budget);
    };


    //ADD PROCESS FLOW
    var ctrlAddItem = function () {
        var input, newItem;

        //get input data
        input = UICtrl.getInput();
        console.log(input);
        //data validation- has to meet all these criteria in order to be valid
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
            //add item to budget controller
            newItem = budgetController.addItems(input.type, input.description, input.value);
            //add new item to UI
            UICtrl.addListItem(newItem, input.type);
            //clear fiends
            UICtrl.clearFields();
            //calc and update budget
            updateBudget();
        } else {
            alert('ERROR: Please enter a description and a posttive amount.');
            UICtrl.clearFields();
        }
    }

    //public returns
    return {
        init: function () {
            console.log('app started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }

    }

    //assign budgetController to budgetCtrl argument, and for UI (can chage name for below when using with diff module)
})(budgetController, UIController);

controller.init();