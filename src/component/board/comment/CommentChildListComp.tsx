import classNames from "classnames";
import utillFormat from "../../../utill/utillFormat";
import { useMemo } from "react";
import useCommentDelete from "../../../hooks/api/board/comment/useCommentDelete";
interface IProp {
  comment: IComment;
  depth: number;
}
interface IComment {
  id: number;
  content: string;
  name: string;
  createDate: string;
  modifiedDate: string;
  children: Array<IComment>;
}

const CommentChildListComp = ({ comment, depth = 0 }: IProp) => {
  const { localDateFormatDateToYYYYMMDD } = utillFormat();
  const { mutate } = useCommentDelete();
  const deleteCommentHandler = (id: number) => {
    mutate(id);
  };
  return (
    <div className="mb-3 mt-3" style={{ marginLeft: depth * 20 + "px" }}>
      <div className="flex flex-row justify-between  border-b-4">
        <div className="">
          {depth > 0 ? "-> " : ""}
          {comment.id}
        </div>
        <div className="">
          <input
            className=""
            type="text"
            value={comment.content}
            disabled={true}
          />
        </div>
        <div className="">{comment.name}</div>
        <div className="">
          {localDateFormatDateToYYYYMMDD(comment.createDate)}
        </div>
        <div className="">
          {localDateFormatDateToYYYYMMDD(comment.modifiedDate)}
        </div>
        <div className="mr-2" onClick={() => deleteCommentHandler(comment.id)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>
        {comment.children && comment.children.length > 0 ? (
          comment.children.map((sub) => (
            <CommentChildListComp comment={sub} depth={depth + 1} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CommentChildListComp;
