// components/DialogProvider/index.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { createContext, useContext, useState } from "react";
import Settings from "../../layouts/Settings/Settings";
import CloseIcon from "@mui/icons-material/Close";

interface DialogOptions {
  title: string;
  message?: string;
}

interface PromiseInfo {
  resolve: (value: boolean | PromiseLike<boolean>) => void;
  reject: (reason?: any) => void;
}

type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>;

// Create the context so we can use it in our App
const DialogContext = createContext<ShowDialogHandler>(() => {
  throw new Error("Component is not wrapped with a DialogProvider.");
});

const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions>({
    title: "",
  });
  const [promiseInfo, setPromiseInfo] = useState<PromiseInfo>();
  const showDialog: ShowDialogHandler = (options) => {
    // When the dialog is shown, keep the promise info so we can resolve later
    return new Promise<boolean>((resolve, reject) => {
      setPromiseInfo({ resolve, reject });
      setOptions(options);
      setOpen(true);
    });
  };
  const handleConfirm = () => {
    // if the Confirm button gets clicked, resolve with `true`
    setOpen(false);
    promiseInfo?.resolve(true);
    setPromiseInfo(undefined);
  };
  const handleCancel = () => {
    // if the dialog gets canceled, resolve with `false`
    setOpen(false);
    promiseInfo?.resolve(false);
    setPromiseInfo(undefined);
  };
  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{options.title}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ minWidth: "700px" }}>
          <Settings></Settings>
          {options.message && (
            <DialogContentText>{options.message}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DialogContext.Provider value={showDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
};

// By calling `useDialog()` in a component we will be able to use the `showDialog()` function
export const useDialog = () => {
  return useContext(DialogContext);
};

export default DialogProvider;
