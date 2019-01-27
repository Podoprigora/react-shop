import React from "react";
import PropTypes from "prop-types";
import dateFormat from "dateformat";

import { commentType } from "../types";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";
import Tooltip from "../ui/Popover/Tooltip";
import { TextareaField, InputField } from "../ui/Form/Field";
import AddReplyForm from "./AddReplyForm";

class Comment extends React.PureComponent {
    static propTypes = commentType;

    state = {
        showAddReplyForm: false
    };

    handleReplyClick = ev => {
        this.setState({ showAddReplyForm: true });
    };

    handleReplyCancelClick = ev => {
        this.setState({ showAddReplyForm: false });
    };

    render() {
        const { id, parentId, username, date, text, rating, userYes, userNo, replies = null } = this.props;
        const { showAddReplyForm } = this.state;

        return (
            <div className="comment">
                <header className="comment__header">
                    <h4 className="comment__username">{username}</h4>
                    {!parentId && (
                        <span className="comment__rating">
                            <StarRating selected={rating} />
                        </span>
                    )}
                    <span className="comment__date">{dateFormat(date, "longDate")}</span>
                </header>
                <div className="comment__body">{text}</div>
                <footer className="comment__footer">
                    <div className="comment__votes">
                        <Tooltip title="Like" className="comment__tooltip">
                            <Button link icon="icon-thumb_up">
                                {userYes > 0 && userYes}
                            </Button>
                        </Tooltip>
                        <Tooltip title="Dislike" className="comment__tooltip">
                            <Button link icon="icon-thumb_down">
                                {userNo > 0 && userNo}
                            </Button>
                        </Tooltip>
                    </div>
                    <Button link onClick={this.handleReplyClick}>
                        REPLY
                    </Button>
                </footer>
                {(replies || showAddReplyForm) && (
                    <ul className="comment__replies">
                        {showAddReplyForm && (
                            <li className="comment__reply">
                                <AddReplyForm onCancel={this.handleReplyCancelClick} />
                            </li>
                        )}
                        {replies &&
                            replies.map(reply => (
                                <li key={reply.id} className="comment__reply">
                                    <Comment {...reply} />
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Comment;
