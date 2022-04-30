import { Box } from "@mui/material";
import moment from "moment";
import React from "react";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  currentUser,
  deleteComment,
  activeComment,
  setActiveComment,
  updateComment,
}: any) => {
  const canEdit = currentUser.id === comment.user_id;
  const canDelete = currentUser.id === comment.user_id;
  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === comment.id;
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src="/default_picture.jpg"></img>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.user_name}</div>
        </div>
        <Box marginY={1}></Box>
        <div>
          {moment.utc(comment.updated_at).format("YYYY-MM-DD HH:mm:ss")}
        </div>
        <Box marginY={1}></Box>

        {!isEditing && (
          <div className="comment-text">{comment.description}</div>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.description}
            handleSubmit={(text: string) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
        <div className="comment-actions">
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
