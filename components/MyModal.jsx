import Dialog from "@mui/material/Dialog";

function MyModal({ onClose, open, children }) {
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      scroll="body"
    >
      <div
        style={{
          marginTop: "30px",
        }}
      ></div>
      {children}
    </Dialog>
  );
}

export default MyModal;
