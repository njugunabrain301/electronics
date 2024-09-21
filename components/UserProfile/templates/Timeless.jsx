import React, { useEffect, useState } from "react";
import {
  deleteProfile,
  resetPasswordLink,
  updateProfile,
} from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import UserProfileContent from "./Content";

function Timeless({ closeModal, authUnVerified }) {
  let use = localStorage.getItem("user");
  if (use) {
    use = JSON.parse(use);
  }
  let [user, setUser] = useState({ ...use, closeModal: closeModal });
  let [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currState, setCurrState] = useState("Update");
  const [mError, setMerror] = useState("");

  const [values, setValues] = useState(user);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const action = async () => {
    setMerror("");
    if (isLoading) return;
    if (currState === "Update") {
      setCurrState("Save");
    } else if (currState === "Save") {
      if (values.name === "" || values.email === "" || values.phone === "") {
        setMerror("Fill in all required fields");
        return;
      }
      if (!/(^\d{10}$)|(^\+\d{12}$)/.test(values.phone)) {
        setMerror("Invalid Phone Number. Use 0712345678 or +254712345678");
        return;
      }
      if (
        !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(
          values.email
        )
      ) {
        setMerror("Invalid Email");
        return;
      }
      setIsLoading(true);
      setCurrState("Updating...");
      let res = await updateProfile(values);
      if (res.success) {
        setUser({ ...res.data, closeModal: closeModal });
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        setMerror("Unable to update profile");
      }
      setIsLoading(false);
      setCurrState("Update");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    closeModal();
  };

  const [updatePassState, setUpdatePassState] = useState("Update Password");
  const updatePass = async () => {
    setUpdatePassState("Sending update password link to your email ...");
    let res = await resetPasswordLink({ email: user.email });
    if (res.success) {
      setUpdatePassState(
        "A reset password link has been sent to your email address"
      );
    } else {
      setUpdatePassState(
        "A reset password link has been sent to your email address"
      );
    }
  };
  const { theme } = useGlobalContext();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const deleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    if (deleting) return;
    setDeleting(true);
    let res = await deleteProfile(values);
    if (res.success) {
      handleLogOut();
      closeModal();
    } else {
      setMerror(
        "Unable to delete your account. Kindly refresh the page and try again"
      );
    }
    setDeleting(false);
  };

  //Check  Auth Unverified
  useEffect(() => {
    console.log(authUnVerified);
    if (authUnVerified) {
      // handleLogOut();
      console.log("Logged Out");
    }
  }, [authUnVerified]);

  return (
    <UserProfileContent
      closeModal={closeModal}
      error={error}
      currState={currState}
      mError={mError}
      values={values}
      onChange={onChange}
      action={action}
      handleLogOut={handleLogOut}
      updatePassState={updatePassState}
      updatePass={updatePass}
      theme={theme}
      confirmDelete={confirmDelete}
      setConfirmDelete={setConfirmDelete}
      deleting={deleting}
      deleteAccount={deleteAccount}
    />
  );
}

export default Timeless;
