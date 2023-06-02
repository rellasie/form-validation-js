// Validator constructor function
function Validator(options) {

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    // get form's element
    var formElement = document.querySelector(options.form)

    if (formElement) {
        options.rules.forEach(function (rule) {
            // console.log(rule.selector) // return name, email
            var inputElement = formElement.querySelector(rule.selector)

            if (inputElement) {

                // handle blur out of input
                inputElement.onblur = function () {
                    validate(inputElement, rule)
                }

                // handle when a user add input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

// define rules
/**
 * 1. When error -> return error message
 * 2. When valid -> return undefined
 * */
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự}`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmedValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}