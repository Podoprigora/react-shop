import React from "react";
import PropTypes from "prop-types";

import { commentType } from "../types";
import Comment from "./Comment";
import Pagination from "../ui/Pagination";

class CommentsList extends React.PureComponent {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape(commentType))
    };

    render() {
        const { data } = this.props;

        return (
            <div className="comments-list">
                {data.map(comment => <Comment key={comment.id} {...comment} />)}
                <Pagination totalItems={20} pageSize={5} className="comments-list__paginator" />
            </div>
        );
    }
}

export default CommentsList;
