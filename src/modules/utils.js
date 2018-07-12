const Utils = {
  arrayToObject(arr, idKey = "id") {
    return arr.reduce((result, item) => ({ ...result, [item[idKey]]: item }), {});
  },

  arrayToNormalizeTreeObject(arr, idKey = "id", parentIdKey = "parentId") {
    const obj = this.arrayToObject(arr, idKey);
    const keys = Object.keys(obj);

    return keys.reduce((result, key) => {
      const id = result[key][idKey];
      const parentId = result[key][parentIdKey];

      if (id !== parentId) {
        const parentNode = { ...result[parentId] };
        parentNode.childIds = [...(parentNode.childIds || []), id];

        return { ...result, [parentId]: parentNode };
      }

      return result;
    }, obj);
  },

  nestedArray(arr, options = {}) {
    const defaultOptions = { rootNodeVal: null, childrenKey: "children", idKey: "id", parentIdKey: "parentId" };
    const { idKey, parentIdKey, childrenKey, rootNodeVal } = { ...defaultOptions, ...options };

    const getNestedChildren = (items, parentId) =>
      items.reduce((result, item) => {
        const itemId = item[idKey];
        const itemParentId = item[parentIdKey];

        if (itemParentId === parentId && itemId !== item.parentId) {
          const node = { ...item };
          const children = getNestedChildren(items, itemId);

          if (children.length) {
            node[childrenKey] = children;
          }

          return [...result, node];
        }
        return result;
      }, []);

    return getNestedChildren(arr, rootNodeVal);
  }
};

const instance = Object.freeze(Utils);

export default instance;
