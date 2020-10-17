import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

const validation = () => {

    Object.keys(rules).forEach(rule => {
        extend(rule, {
            ...rules[rule],
            message: messages[rule]
        });
    });


    extend('filename', {
        validate: value => {
            const arrayValue = value.replace(' ', '').split('.')
            const filename = arrayValue.filter(item => item != "")
            return filename.length === 2
        },
        message: 'Filename is not valid, ex: index.js, index.php'
    })


    extend('highlightRow', {
        /**
        *  highlight value
        *  1
        *  3-5
        *  3,5,7
        *  3-5,9-13
        */
        validate: (value) => {
            value.replace(' ', '')
            const num = /^\d+$/
            const rangeDash = value.split('-')
            const rangeCommas = value.split(',')
            const validGeneralRange = value => {
                for (let i = 0; i < value.length; i++) {
                    if (!((value[i]).match(num))) {
                        return false
                    }
                }
                return true
            }

            const validRange = value => {
                for (let i = 0; i < value.length; i++) {
                    const rangeDash = value[i].split('-')
                    if (rangeDash && rangeDash.length == 2) {
                        for (let j = 0; j < rangeDash.length; j++) {
                            if (!((rangeDash[i]).match(num))) {
                                return false
                            }
                        }
                    } else {
                        return false
                    }
                }
                return true
            }

            if (value.match(num)) {
                return true
            } else if (validGeneralRange(rangeDash)) {
                return true
            } else if (validGeneralRange(rangeCommas)) {
                return true
            } else if (validRange(rangeCommas)) {
                return true
            } else {
                return false
            }
        },
        message: 'Highlight Row is not valid, e.g. 1 or 3-5 or 3,5,7 or 3-5,9-13'

    })
    // Register it globally
    Vue.component('ValidationProvider', ValidationProvider);
    Vue.component('ValidationObserver', ValidationObserver)
}

export default validation

