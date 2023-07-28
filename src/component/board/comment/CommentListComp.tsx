import useCommentList from "../../../hooks/api/board/comment/useCommentList";
import utillFormat from "../../../utill/utillFormat";
import CommentChildListComp from "./CommentChildListComp";

interface IProps {
  boardId: number;
}

interface IComment {
  id: number;
  content: string;
  name: string;
  createDate: string;
  modifiedDate: string;
  children: Array<IComment>;
}

const CommentListComp = ({ boardId }: IProps) => {
  const { data: comments, isLoading } = useCommentList(boardId || 0);

  if (isLoading) return <>loding....</>;
  return (
    <div className="mb-6  p-4">
      {comments.content.map((comment: IComment, index: number) => {
        return <CommentChildListComp comment={comment} key={index} depth={0} />;
      })}
    </div>
  );
};

export default CommentListComp;
