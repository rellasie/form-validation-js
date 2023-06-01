// Validator constructor function
function Validator(options) {

    var formElement = document.querySelector(options.form)

    if (formElement) {
        options.rules.forEach(function(rule) {
            // console.log(rule.selector) // return name, email
            var inputElement = formElement.querySelector(rule.selector)
            var errorElement = inputElement.parentElement.querySelector('.form-message')
            
            if (inputElement) {
                inputElement.onblur = function() {
                    // console.log('blur ' + rule.selector) // test to see what is blurred
                    // console.log(inputElement.value) // take input value from keyboard
                    
                    // value: inputElement.value
                    // test func: rule.test
                    var errorMessage = rule.test(inputElement.value)
                    
                    if (errorMessage) {
                        errorElement.innerText = errorMessage
                        inputElement.parentElement.classList.add('invalid')
                    } else {
                        errorElement.innerText = ''
                        inputElement.parentElement.classList.remove('invalid')
                    }

                
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
Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
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