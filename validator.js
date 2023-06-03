// Validator constructor function
function Validator(options) {
    var selectorRules = {} // save all the rules here

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage

        // get rules of selector
        var rules = selectorRules[rule.selector]

        // iterate through rules & check for errors
        // if there's an error -> break the loop
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break // when error -> break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage
    }

    // get form's element
    var formElement = document.querySelector(options.form)

    if (formElement) {
        // when submit button is clicked
        formElement.onsubmit = function (e) {
            e.preventDefault()

            var isFormValid = true

            // iterate through each rule, validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }
            })

            // console.log(formValues)

            if (isFormValid) {
                // console.log('No errors found')

                // when submit with javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')
                    // select all fields with name attribute, and not disabled fields
                    // console.log(enableInputs)
        
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        // gán input.value cho object values và return values
                        values[input.name] = input.value
                        return values 
                    }, {})

                    options.onSubmit(formValues)
                } else {
                    // when submit with default action from browser
                    formElement.submit()
                }
            }
        }


        // handle iteration through rules (blur, input,...)
        options.rules.forEach(function (rule) {
            // save rules for each input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test]
            }

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
            return value.trim() ? undefined : message || 'Please enter this field'
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : message || 'This field must be a valid email address'
        }
    }
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Please enter at least ${min} characters}`
        }
    }
}

Validator.isConfirmed = function (selector, getConfirmedValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmedValue() ? undefined : message || 'Invalid input value, please try again'
        }
    }
}