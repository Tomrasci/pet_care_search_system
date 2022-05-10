import { Box, Button } from "@mui/material";
import { useState } from "react";
import DialogBase from "./DialogBase";
import React from "react";

type Props = {
  title: string;
  content: JSX.Element;
  buttonIcon: JSX.Element;
  buttonText: string;
};

export default function ButtonBase({
  title,
  content,
  buttonIcon,
  buttonText,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box mb={2}>
      <Button
        style={{ minHeight: 60, fontSize: 20 }}
        variant="contained"
        color="primary"
        startIcon={buttonIcon}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      <DialogBase
        onClose={() => setIsOpen(false)}
        open={isOpen}
        title={title}
        content={
          <content.type {...content.props} onSave={() => setIsOpen(false)} />
        }
      ></DialogBase>
    </Box>
  );
}
