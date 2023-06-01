// Validator constructor function
function Validator(options) {

    var formElement = document.querySelector(options.form)

    console.log(options.rules)

    if (formElement) {
        // console.log(formElement) // test

    }
}



// define rules
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function () {

        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function () {

        }
    }
}