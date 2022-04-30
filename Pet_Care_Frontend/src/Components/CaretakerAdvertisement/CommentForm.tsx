import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const CommentForm = ({
  submitLabel,
  handleSubmit,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}: any) => {
  const [text, setText] = useState(initialText);
  const isTextareDisabled = text.length === 0;
  const onSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        multiline
        rows={4}
        label="Comment"
        variant="outlined"
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Box marginY={8}></Box>
      <Button
        type="submit"
        className="comment-form-button"
        disabled={isTextareDisabled}
        variant="contained"
      >
        {submitLabel}
      </Button>
      {hasCancelButton && (
        <Button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
          variant="contained"
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default CommentForm;
