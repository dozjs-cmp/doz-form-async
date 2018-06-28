import Doz from 'doz'
import cmp from './lib'

// expose component to global scope
if (typeof window !== 'undefined') {
    Doz.component('doz-form', cmp.form);
    Doz.component('doz-formfield', cmp.field);
}

export default cmp