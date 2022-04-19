import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  content: JSX.Element;
};

export default function DialogBase({ open, onClose, title, content }: Props) {
  return (
    <Dialog fullWidth onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
}
