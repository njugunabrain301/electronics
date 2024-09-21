import { Card, CardHeader, Alert } from "@material-tailwind/react";
import { Button, TextField, Typography } from "@mui/material";

function UserProfileContent({
  closeModal,
  error,
  currState,
  mError,
  values,
  onChange,
  action,
  handleLogOut,
  updatePassState,
  updatePass,
  theme,
  confirmDelete,
  setConfirmDelete,
  deleting,
  deleteAccount,
}) {
  return (
    <main-content>
      <div className="w-full h-screen flex justify-center items-center">
        <Card
          className="w-[330px] p-4 rounded-md pt-0"
          style={{ background: theme.palette.background.primary }}
        >
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center"
            style={{ backgroundColor: theme.palette.card.main }}
          >
            <Typography
              variant="h4"
              style={{ color: theme.palette.text.inverted, fontWeight: "bold" }}
            >
              My Profile
            </Typography>
          </CardHeader>
          <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          {confirmDelete ? (
            <div>
              {deleting ? (
                <>
                  <p
                    style={{
                      color: theme.palette.text.base,
                    }}
                    className="py-4 text-xl"
                  >
                    Deleting Account...
                  </p>
                </>
              ) : (
                <>
                  <p
                    style={{
                      color: theme.palette.text.base,
                    }}
                    className="py-4 text-xl"
                  >
                    You will no longer have access to your past orders. Are you
                    sure you want to delete your account?
                  </p>
                  {mError && (
                    <div
                      className="flex align-items-center justify-center p-3 my-3 rounded-md"
                      style={{
                        backgroundColor: "indianred", //theme.palette.error.main,
                        color: "white", //theme.palette.error.contrastText,
                      }}
                    >
                      <p className="font-medium flex items-center text-center tracking-normal leading-none">
                        {mError}
                      </p>
                    </div>
                  )}
                  <div>
                    <Button
                      color={"error"}
                      variant="contained"
                      fullWidth
                      onClick={() => deleteAccount()}
                    >
                      Yes, Delete My Account
                    </Button>
                    <div className="py-2"></div>
                    <Button
                      color={"primary"}
                      variant="contained"
                      fullWidth
                      onClick={() => setConfirmDelete(false)}
                      className="my-2"
                    >
                      Cancel, Keep My Account
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form className="mt-8 mb-2 w-full">
              <div className="mb-4 flex flex-col gap-6">
                <TextField
                  label="Name"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.input.border,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.input.light,
                      },
                    },
                    input: { color: theme.palette.text.base },
                  }}
                  color={"input"}
                  InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
                  name="name"
                  style={{
                    pointerEvents: currState === "Update" ? "none" : "initial",
                  }}
                  value={values.name}
                  onChange={onChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.input.border,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.input.light,
                      },
                    },
                    input: { color: theme.palette.text.base },
                  }}
                  color={"input"}
                  InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
                  style={{
                    pointerEvents: currState === "Update" ? "none" : "initial",
                  }}
                  value={values.email}
                  onChange={onChange}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.input.border,
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.input.light,
                      },
                    },
                    input: { color: theme.palette.text.base },
                  }}
                  color={"input"}
                  InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
                  style={{
                    pointerEvents: currState === "Update" ? "none" : "initial",
                  }}
                  value={values.phone}
                  onChange={onChange}
                />
              </div>
              <div className="">
                {error && (
                  <Alert
                    className="flex align-items-center justify-center"
                    style={{
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText,
                    }}
                  >
                    <p className="font-medium flex items-center text-center tracking-normal leading-none">
                      {error}
                    </p>
                  </Alert>
                )}
                {mError && (
                  <Alert
                    className="flex align-items-center justify-center"
                    style={{
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText,
                    }}
                  >
                    <p className="font-medium flex items-center text-center tracking-normal leading-none">
                      {mError}
                    </p>
                  </Alert>
                )}
              </div>
              <div className="flex justify-between">
                <Typography
                  className="mt-4 text-center font-normal transition-colors hover:underline cursor-pointer"
                  onClick={updatePass}
                  sx={{
                    color: theme.palette.highlight.main,
                    "&:hover": {
                      color: theme.palette.highlight.light,
                    },
                  }}
                >
                  {updatePassState === "Update Password"
                    ? "Update Password"
                    : ""}
                </Typography>
                <Typography
                  className="mt-4 text-center font-normal transition-colors hover:underline cursor-pointer"
                  onClick={deleteAccount}
                  sx={{
                    color: theme.palette.highlight.main,
                    "&:hover": {
                      color: theme.palette.highlight.light,
                    },
                  }}
                >
                  Delete Account
                </Typography>
              </div>
              <Typography
                color="gray"
                className="w-full mt-4 text-center font-normal"
              >
                <span>
                  {updatePassState !== "Update Password" ? updatePassState : ""}
                </span>
              </Typography>
              <div className="mt-3">
                <Button
                  color={"primary"}
                  variant="contained"
                  fullWidth
                  onClick={() => action()}
                >
                  {currState}
                </Button>
              </div>
              <div
                className="flex justify-between mt-2"
                style={{ color: theme.palette.text.base }}
              >
                <Typography className="mt-4 text-center font-normal">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={closeModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </Typography>
                <Typography className="mt-4 text-center font-normal">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => handleLogOut()}
                  >
                    Log Out
                  </span>
                </Typography>
              </div>
            </form>
          )}
        </Card>
      </div>
    </main-content>
  );
}

export default UserProfileContent;
