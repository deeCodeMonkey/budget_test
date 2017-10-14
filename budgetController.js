//handles budget data, immediately invoked IIFE
var budgetController = (function () {

    //hold data
    var Expense = function (id, descr, value) {
        this.id = id;
        this.description = descr;
        this.value = value;
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
        data.allItems[type].forEach(function(cur) {
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

        getBudget: function() {
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


