import './style.css'

export default {
    props: {
        messages: ''
    },
    template() {
        return `
            <span d-ref="el" style="display: ${this.props.messages ? 'inline' : 'none'}">
                ${this.props.messages}
            </span>
        `
    }
};