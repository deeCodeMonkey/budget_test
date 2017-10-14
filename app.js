//handles budget data, immediately invoked IIFE
var budgetController = (function () {

    //hold data
    var Expense = function (id, descr, value) {
        this.id = id;
        this.description = descr;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totaiIncome) {
        if (totaiIncome > 0) {
            this.percentage = Math.round((this.value / totaiIncome) * 100);
        } else {
            this.percentage = -1;
        }
        return this.percentage;
    };

    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        //-1 means nonexistent
        percentage: -1,
    };

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum = sum + cur.value;
        });
        data.totals[type] = sum;
    };

    //public returns
    return {
        addItems: function (type, descr, val) {
            var newItem, ID;
            //obtain last ID, then plus 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, descr, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, descr, val);
            }
            //for Type exp or inc, push to end of array
            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id) {
            var ids, index;
            //map method returns array with ids
            ids = data.allItems[type].map((current) => {
                return current.id;
            });
            //determine index
            index = ids.indexOf(id);

            if (index !== -1) {
                //remove element, removing elements at the start number 'index', and remove 1 after
                data.allItems[type].splice(index, 1)
            }
        },

        calculateBudget: function () {
            //calc total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');
            //calc the budget: inc - exp
            data.budget = data.totals.inc - data.totals.exp;
            //cacl % of inc spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function () {
            data.allItems.exp.forEach((cur) => {
                cur.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function () {
            //map returns (foreach does not)
            var allPerc = data.allItems.exp.map((cur) => {
                //for each, call the method below
                return cur.getPercentage();
            });
            //return array with all the %s
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    };

})();




//==============================================================================================================================

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage'
    };

    //public returns
    return {
        getInput: function () {
            //should return object and not variables
            return {
                type: $(DOMstrings.inputType).val(), //will be either inc or exp
                description: $(DOMstrings.inputDescription).val(),
                value: parseFloat($(DOMstrings.inputValue).val()),
                container: '.container'
            };
        },

        addListItem: function (obj, type) {
            var html, newHTML, element;
            //Create HTML string with placeholder text. Use %name% as placeholders for actual data
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            //String replace() = searches for a string, then replace the string for data 
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.description);
            newHTML = newHTML.replace('%value%', obj.value);

            //Insert HTML into the DOM, and clear fields.
            $(element).prepend(newHTML);
        },

        deleteListItem: function (selectorID, ) {
            //remove id = (e.g.) 'inc-0''
            $('#' + selectorID).remove();
        },

        clearFields: function () {
            $(DOMstrings.inputDescription).val('');
            $(DOMstrings.inputValue).val('');
            //redirect input here
            $(DOMstrings.inputDescription).focus();
        },

        displayBudget: function (obj) {
            console.log('displaybudget');
            $(DOMstrings.budgetLabel).text(obj.budget);
            $(DOMstrings.incomeLabel).text(obj.totalInc);
            $(DOMstrings.expenseLabel).text(obj.totalExp);

            if (obj.percentage > 0) {
                $(DOMstrings.percentageLabel).text(obj.percentage + '%');
            } else {
                $(DOMstrings.percentageLabel).text('--' + '%');
            }
        },

        //to accept an array (for DOM element not intially present)
        //displayPercentages: function (percentages) {
        //    var fields = $(DOMstrings.expensePercentageLabel);

        //    var nodeListForEach = functoin(list, callback){

        //    };

        //    nodeListForEach(fields, (current, index) => {

        //    });
        //},

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();



//===============================================================================================================================

//app controller
var controller = (function (budgetCtrl, UICtrl) {
    //EVENT LISTESNERS
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        //event handler.
        $(DOM.inputBtn).click(function () {
            ctrlAddItem();
        });

        //when "Enter" key pressed
        $('.add__value').keypress(function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });

        //event handler. location-find the parent of the delete button that is shared for Inc and Exp, of which is the class="container clearfix"
        //event listener at parent to be removed because of event delegation. Let the child event bubble up.
        $(DOM.container).click(ctrlDeleteItem);
    }


    var updateBudget = function () {
        //calculate budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget = budgetCtrl.getBudget();
        //display budget
        console.log(budget);
        UICtrl.displayBudget(budget);
    };

    var updatePercentage = function () {
        //1. calc %
        budgetCtrl.calculatePercentages();
        //2. Read %s from budget controller
        var percentages = budgetCtrl.getPercentages();
        //3. Update UI with new %s
        console.log(percentages);
    }

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
        //calc and update %s
        updatePercentage();
    };

    var ctrlDeleteItem = function (e) {
        var itemID, splitID, type, ID;
        //see html target where clicked in container, parentNode = parent of item. .id get property id
        //console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
        //Determine where event will be fired. (hardcoded)
        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(itemID);
        //Get id from DOM
        if (itemID) {
            //retreve the ID and store. eg.g ID is inc-1
            splitID = itemID.split('-');
            //exp vs inc
            type = splitID[0];
            //unique id
            ID = parseInt(splitID[1]);

            //1. Delete item from data structure (budget controller)
            budgetController.deleteItem(type, ID);
            //2. Delete item from UI
            UIController.deleteListItem(itemID);
            //3. Update and show budget totals
            updateBudget();

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