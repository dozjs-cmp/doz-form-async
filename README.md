# doz-form-async
A wrapper component that adds AJAX functionality to the form

## Install
```
npm install doz-form-async
```

Live <a href="https://dozjs-cmp.github.io/doz-form-async/example/index.html">here</a>

## Usage

Globally
```javascript
import Doz from 'doz'
import 'doz-form-async'
```

Locally
```javascript
import Doz from 'doz'
import DozFormAsync from 'doz-form-async/lib'

Doz.component('my-wrapper', {
    components: {
        'also-a-custom-name': DozFormAsync
    },
    template() {
        return `
            <also-a-custom-name></also-a-custom-name>
        `
    }
});
```

### Example
```javascript
const app = new Doz({
    root: '#app',
    template() {
        return `
            <doz-form-async
                d:on-submit="$onSubmit"
                d:on-validationerror="$onValidationError"
                d:on-success="$onSuccess"
                d:on-error="$onError"
             >
                <form>
                    <input placeholder="First name" required="required" name="firstName">
                    <input placeholder="Email" required="required" type="email" name="email">
                    <button type="submit">Submit</button>
                </form>
            </doz-form-async>
        `
    },
    $onSubmit(cmp) {
        console.log('$onSubmit', cmp);
    },
    $onValidationError(errors) {
        console.warn('$onValidationError', errors);
    },
    $onSuccess(response) {
        console.log('$onSuccess', response);
    },
    $onError(error) {
        console.error('$onError', error);
    }
});
```

## Props
| Name | Default | Description |
| ---- | ------- | ----------- |
| ajax | true | Ajax mode enabled |
| resetOnSuccess | true | Reset input after success |
| classError | error | css error class|

## Events

| Name | Args | Description |
| ---- | ------- | ----------- |
| success | `{object} response`, `{object} cmp` | Triggered on request success |
| validationerror | `{object} errors`, `{object} cmp` | Triggered on validation error |
| error | `{object} error`, `{object} cmp`| Triggered on request error |
| submit | `{object} cmp` | Triggered on submit |

#### CDN unpkg
```html
<script src="https://unpkg.com/fabioricali/dist/bundle.min.js"></script>
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/dozjs-cmp/doz-form-async/blob/master/CHANGELOG.md">here</a>

## License
doz-form-async is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="rica.li">Fabio Ricali</a>