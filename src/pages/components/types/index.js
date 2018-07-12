import { number, string, bool, func, arrayOf, objectOf, oneOf, shape } from "prop-types";

const commentShape = {
  id: number.isRequired,
  parentId: number.isRequired,
  username: string,
  text: string,
  date: string,
  rating: number,
  userYes: number,
  userNo: number
};
commentShape.replies = arrayOf(shape(commentShape));

export const commentType = commentShape;
