import axios from 'axios'

export default {

    props: {
        tagField: 'doz-formfield',
        ajax: true,
        resetOnSuccess: true
    },

    onAppReady() {
        this.$fetchFields();

        this.getHTMLElement().querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();

                this.$resetValidation();

                const params = this.$getData();

                if (!this.$isValid) {
                    return this.emit('validationerror', this.$validationErrors, this);
                }

                this.emit('submit', this);
                //console.dir(form)

                if (this.props.ajax) {
                    axios[form.method.toLowerCase()](form.action, {
                        params
                    }).then(response => {
                        if (this.props.resetOnSuccess) {
                            this.$reset();
                            form.reset();
                        }
                        this.emit('success', response, this);
                    }).catch(error => {
                        this.emit('error', error, this);
                    });
                } else {
                    form.submit();
                }
            })
        });

    },

    $resetValidation() {
        this.$isValid = true;
        this.$validationErrors = [];
    },

    $reset() {
        this.$fields.forEach(cmp => cmp.$reset());
    },

    $fields: [],
    $isValid: true,
    $validationErrors: [],

    $fetchFields(children = this.children) {
        Object.keys(children).forEach(i => {
            if (children[i].tag === this.props.tagField && children[i].props.name) {
                this.$fields.push(children[i])
            } else {
                this.$fetchFields(children[i].children)
            }
        })
    },

    $getData() {
        const data = {};
        this.$fields.forEach(cmp => {
            const checkResult = cmp.$checkField();
            if (checkResult.length) {
                this.$isValid = false;
                this.$validationErrors.push({
                    name: cmp.props.name,
                    error: checkResult
                })
            }
            data[cmp.props.name] = cmp.props.value;
        });

        return data;
    }

}