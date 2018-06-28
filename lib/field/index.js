import isEmail from './is-email'
import fieldError from './error/index'
import './style.css'

export default {

    components: {
        'field-error': fieldError
    },

    props: {
        type: 'text',
        label: '',
        name: '',
        options: [],
        required: false,
        value: '',
        description: '',
        errors: '',
        class: '',
        classField: '',
        checkOnRender: false,
        fieldRequired: 'Field is required',
        mustBeEmail: 'Value must be a valid email'
    },

    template() {

        let input = '';

        switch (this.props.type) {
            case 'select':
                input = `
                    <select d-ref="field" name="${this.props.name}" class="${this.props.classField}">
                    ${this.each(this.props.options, item => `
                        <option ${this.props.value === item ? 'selected' : ''} value="${item}">${item}</option>
                    `)}
                    </select>
                `;
                break;

            case 'textarea':
                input = `
                    <textarea 
                        d-ref="field" 
                        d-bind="value" 
                        name="${this.props.name}" 
                        class="${this.props.classField}"
                    > ${this.props.value}</textarea>
                `;
                break;

            default:
                input = `
                    <input 
                        d-ref="field" 
                        d-bind="value" 
                        type="${this.props.type}" 
                        name="${this.props.name}" 
                        value="${this.props.value}" 
                        class="${this.props.classField}"
                    >
                `
        }

        return `
            <div class="doz-formfield ${this.props.class}">
                <label for="${this.props.name}">
                    ${this.props.label} ${this.props.required ? '<span class="required">*</span>' : ''} 
                    <field-error messages="${this.props.errors}"></field-error>
                </label>
                ${this.props.description ? `<div>${this.props.description}</div>` : ''}
                <div>
                    ${input}
                </div>
            </div>
        `
    },

    onCreate() {
        this.$initialValue = this.props.value;
    },

    onMount() {
        if (this.props.checkOnRender)
            this.$checkField();
        const field = this.ref.field;
        field.addEventListener('blur', () => {
            this.$checkField();
        });
    },

    onUpdate(changes) {
        if (!this.$wasReset)
            this.$checkField();
        this.$wasReset = false;
    },

    $initialValue: '',
    $wasReset: false,

    $checkField() {
        const field = this.ref.field;
        let errors = [];

        if (this.props.required && this.props.value === '') {
            errors.push(this.props.fieldRequired);
        }

        if (this.props.value && this.props.type === 'email' && !isEmail(this.props.value)) {
            errors.push(this.props.mustBeEmail);
        }

        if (errors.length) {
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }

        this.props.errors = errors.join('; ');

        return errors;
    },

    $reset() {
        this.$wasReset = true;
        this.props.value = this.$initialValue;
        this.props.errors = '';
        this.ref.field.classList.remove('error');
    }

};