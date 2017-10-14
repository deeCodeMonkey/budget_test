

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
        percentageLabel: '.budget__expenses--percentage'
    };

    //public returns
    return {
        getInput: function () {
            //should return object and not variables
            return {
                type: $(DOMstrings.inputType).val(), //will be either inc or exp
                description: $(DOMstrings.inputDescription).val(),
                value: parseFloat($(DOMstrings.inputValue).val())
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

        getDOMstrings: function () {
            return DOMstrings;
        }
    };

})();

