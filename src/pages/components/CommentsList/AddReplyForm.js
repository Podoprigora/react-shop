import React from "react";
import PropTypes from "prop-types";

import { TextareaField, InputField } from "../ui/Form/Field";
import Button from "../ui/Button";

class AddReplyForm extends React.Component {
    static propTypes = {
        onCancel: PropTypes.func
    };

    state = {
        replyText: ""
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    inputRef = React.createRef();

    handleInputChange = ev => {
        this.setState({ replyText: ev.target.value });
    };

    render() {
        const { onCancel } = this.props;
        const { replyText } = this.state;

        return (
            <form
                className="comment__reply-form"
                onSubmit={ev => {
                    ev.preventDefault();
                }}
            >
                <div className="comment__reply-field">
                    <TextareaField
                        placeholder="Add a reply ..."
                        value={replyText}
                        onChange={this.handleInputChange}
                        ref={this.inputRef}
                    />
                </div>
                <div className="comment__reply-buttons">
                    <Button primary disabled={replyText.length === 0}>
                        Send
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </div>
            </form>
        );
    }
}

export default AddReplyForm;
