/*
  NESTED COMMENTS (Recursive Add + Reply)
  ------------------------------------------
  Difficulty: Medium
  Concepts: recursive CommentData type,
            recursive tree insertion (addNestedReply),
            module-level id counter,
            component-inside-component pattern (Comment uses addReply via props),
            controlled reply input per comment

  vs easy/comments: that one is read-only recursive rendering.
  This one supports adding top-level comments and nested replies
  via recursive tree mutation.
*/

import { useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type CommentData = {
  id: number;
  text: string;
  replies: CommentData[];
};

type CommentProps = {
  comment: CommentData;
  onReply: (id: number, text: string) => void;
};

// ─── Module-level ID counter ──────────────────────────────────────

let idCounter = 4;

// ─── Mock data ────────────────────────────────────────────────────

const mockComments: CommentData[] = [
  {
    id: 1,
    text: "Happy New Year folks! What are your resolutions this year?",
    replies: [
      {
        id: 2,
        text: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: 3,
            text: "I tried last year and gave up.",
            replies: [
              {
                id: 4,
                text: "Good on you, nothing is more important than good health.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// ─── Recursive Comment component ──────────────────────────────────

function Comment({ comment, onReply }: CommentProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  // ChangeEvent<HTMLInputElement> — typed event from the reply input
  function handleReplyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReplyText(e.target.value);
  }

  function handleReply() {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  }

  return (
    <div className="nc-comment">
      <div className="nc-text">{comment.text}</div>

      <button
        className="nc-reply-toggle"
        onClick={() => setShowReplyInput(!showReplyInput)}
      >
        Add a reply
      </button>

      {showReplyInput && (
        <div className="nc-reply-box">
          <input
            type="text"
            value={replyText}
            onChange={handleReplyChange}
            placeholder="Type your reply..."
          />
          <button onClick={handleReply}>Submit</button>
        </div>
      )}

      <div className="nc-replies">
        {comment.replies.map((rep) => (
          <Comment key={rep.id} comment={rep} onReply={onReply} />
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────

export default function NestedComments() {
  const [comments, setComments] = useState<CommentData[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  // Recursively insert a reply under the target comment
  function addReply(id: number, text: string) {
    const replyObj: CommentData = {
      id: ++idCounter,
      text,
      replies: [],
    };

    function addNestedReply(commentList: CommentData[]): CommentData[] {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [...comment.replies, replyObj],
          };
        }
        return {
          ...comment,
          replies: addNestedReply(comment.replies),
        };
      });
    }

    setComments((prev) => addNestedReply(prev));
  }

  // ChangeEvent<HTMLInputElement> — typed event from the new comment input
  function handleNewCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewComment(e.target.value);
  }

  // Add a top-level comment
  function addComment() {
    if (!newComment.trim()) return;

    const newC: CommentData = {
      id: ++idCounter,
      text: newComment,
      replies: [],
    };

    setComments([...comments, newC]);
    setNewComment("");
  }

  return (
    <div className="nc-container">
      <h2>Comment Section</h2>

      <div className="nc-new-comment">
        <input
          type="text"
          value={newComment}
          onChange={handleNewCommentChange}
          placeholder="Type a comment..."
        />
        <button onClick={addComment}>Add Comment</button>
      </div>

      <div className="nc-comments">
        {comments.map((c) => (
          <Comment key={c.id} comment={c} onReply={addReply} />
        ))}
      </div>
    </div>
  );
}
