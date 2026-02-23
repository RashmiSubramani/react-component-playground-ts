/*
  COMMENT (Recursive)
  --------------------
  Renders a list of comments; if a comment has replies,
  it recursively renders <Comment /> for the nested replies.

  Concepts: recursive component, typed props with imported recursive type,
            optional chaining (comment?.replies)
*/

import { type CommentData } from "./Comments";

type CommentProps = {
  data: CommentData[];
};

export function Comment({ data }: CommentProps) {
  return (
    <>
      {data.map((comment, index) => (
        <div className="commentRow" key={index}>
          <img
            className="commentAvatar"
            src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
            alt="user"
          />
          <div>
            <p className="commentUsername">{comment.username}</p>
            <span className="commentText">{comment.comment}</span>
            {/* Recurse into replies if they exist */}
            {comment.replies && <Comment data={comment.replies} />}
          </div>
        </div>
      ))}
    </>
  );
}
