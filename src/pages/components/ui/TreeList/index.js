import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class TreeList extends React.Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                title: PropTypes.string
            })
        ).isRequired,
        selected: PropTypes.string,
        className: PropTypes.string,
        onSelect: PropTypes.func
    };
    static defaultProps = {
        onSelect: () => {}
    };

    state = {
        selected: null
    };

    handleNodeClick = (node, parent) => ev => {
        this.setState({ selected: node });
        this.props.onSelect(node, parent);
    };

    renderSubtree = (node, depth = 0) => {
        const { items } = node;
        const newDepth = depth + 1;

        if (!items || !items.length) {
            return null;
        }

        return (
            <ul className="tree-list__subtree">{items.map((n, index) => this.renderNode(n, index, node, newDepth))}</ul>
        );
    };

    renderNode = (node, index, parentNode = null, depth = 0) => {
        const { selected } = this.state;
        const { id, title, items } = node;
        const isFolder = items && items.length > 0;

        if (!id) {
            return null;
        }

        return (
            <li key={id}>
                <div
                    className="tree-list__node-wrap"
                    style={{ paddingLeft: `${24 * depth + 8 + (!isFolder ? 24 : 0)}px` }}
                >
                    {isFolder && <button className="node-folding icon icon-keyboard_arrow_up" />}
                    <a
                        className={classNames("tree-list__node", {
                            "node-folder": isFolder,
                            "node-leaf": !isFolder,
                            // "icon icon-keyboard_arrow_right": !isFolder,
                            "node--selected": selected && id === selected.id
                        })}
                        role="presentation"
                        onClick={this.handleNodeClick(node, parentNode)}
                    >
                        {title}
                    </a>
                </div>
                {this.renderSubtree(node, depth)}
            </li>
        );
    };

    render() {
        const { data } = this.props;

        if (!data.length) {
            return null;
        }

        return <ul className="tree-list">{data.map(this.renderNode)}</ul>;
    }
}

export default TreeList;
