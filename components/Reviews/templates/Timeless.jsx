"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@material-tailwind/react";
import { useGlobalContext } from "@/Context/context";
import { Button, Input, TextField, Typography } from "@mui/material";
import { sendReview } from "@/utils/frontendAPIs/orders";
import Image from "next/image";

function Timeless({ closeModal, item, sent, setSent }) {
  let [error, setError] = useState("");

  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [numFiles, setNumFiles] = useState(0);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setNumFiles(newFiles.length);
      console.log(selectedFiles, e.target.files);
    }
    // setSelectedFiles([...selectedFiles, ...event.target.files]);
    // let fls = event.target.files.length;
    // setNumFiles(fls);
    // console.log(selectedFiles, event.target.files, fls);
    // setNumFiles(event.target.files.length);
  };

  useEffect(() => {
    console.log(selectedFiles);
    setNumFiles(selectedFiles.length);
  }, [selectedFiles]);

  const sendReviewHandler = async (iid) => {
    setError("");
    if (submitting) return;
    if (stars <= 0) {
      setError("Please select a rating");
      return;
    }

    let formData = new FormData();
    formData.append("media", selectedFiles);
    formData.append("comment", comment);
    formData.append("stars", stars);
    formData.append("iid", item.pid);
    formData.append("oid", item._id);
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    setSubmitting(true);
    let res = await sendReview(formData);
    if (res.success) {
      setSent([...sent, item._id]);
      setSelectedFiles([]);
    } else {
      setError(
        "Unable to submit the review. Kindly refresh the page and try again"
      );
    }
    setSubmitting(false);
  };

  const { theme } = useGlobalContext();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card
        className="min-w-[330px] w-[330px] sm:w-[400px] md:w-[600px] lg:w-[800px] p-4 rounded-md pt-0"
        style={{ background: theme.palette.background.primary }}
      >
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center"
          style={{
            backgroundColor: theme.palette.card.main,
            color: theme.palette.text.base,
          }}
        >
          <Typography
            variant="h4"
            style={{ color: theme.palette.text.inverted, fontWeight: "bold" }}
          >
            Leave a Review
          </Typography>
        </CardHeader>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div
          className="grid grid-cols-2 py-4"
          style={{ color: theme.palette.text.base }}
        >
          <div className="">
            <div>
              <Image
                className=" rounded-md max-w-full"
                src={item.img}
                alt={item.name}
                width={300}
                height={200}
              />
            </div>
          </div>
          <div className="pl-[20px] flex flex-col justify-center flex-wrap">
            <div className="w-full">
              <h4 className="font-inter font-bold tracking-normal leading-none">
                {item.name}
              </h4>
            </div>
            {item.selectedOption && (
              <p className="text-sm font-inter tracking-normal leading-none pt-1">
                Option: <span className="ml-2">{item.selectedOption}</span>
              </p>
            )}
          </div>
        </div>
        {sent.includes(item._id) ? (
          <div
            className="flex items-center justify-center p-5 text-center text-lg"
            style={{ color: theme.palette.text.base }}
          >
            Thank you for your feedback. We aim to enhance our service based on
            your insights, ensuring you choose us time and again for your
            shopping needs.
          </div>
        ) : (
          <form
            className="mt-8 mb-2 w-full"
            style={{ color: theme.palette.text.base }}
          >
            <p className="mb-2">
              How would you rate the above product and your overall shopping
              experience
            </p>
            <div className="mb-4 flex justify-between w-full mx-auto">
              <span
                className="flex flex-col text-center cursor-pointer rounded-md p-[3px] md:p-3"
                onClick={() => setStars(1)}
                style={{
                  border:
                    stars === 1 ? "solid 5px " + theme.palette.text.alt : "",
                }}
              >
                <span className="md:text-3xl text-xl">😠</span>
                <span className="text-sm md:text-base">Terrible</span>
              </span>
              <span
                className="flex flex-col text-center cursor-pointer rounded-md p-[3px] md:p-3"
                onClick={() => setStars(2)}
                style={{
                  border:
                    stars === 2 ? "solid 5px " + theme.palette.text.alt : "",
                }}
              >
                <span className="md:text-3xl text-xl">☹️</span>
                <span className="text-sm md:text-base">Bad</span>
              </span>
              <span
                className="flex flex-col text-center cursor-pointer rounded-md p-[3px] md:p-3"
                onClick={() => setStars(3)}
                style={{
                  border:
                    stars === 3 ? "solid 5px " + theme.palette.text.alt : "",
                }}
              >
                <span className="md:text-3xl text-xl">😊</span>
                <span className="text-sm md:text-base">Okay</span>
              </span>
              <span
                className="flex flex-col text-center cursor-pointer rounded-md p-[3px] md:p-3"
                onClick={() => setStars(4)}
                style={{
                  border:
                    stars === 4 ? "solid 5px " + theme.palette.text.alt : "",
                }}
              >
                <span className="md:text-3xl text-xl">😄</span>
                <span className="text-sm md:text-base">Good</span>
              </span>
              <span
                className="flex flex-col text-center cursor-pointer rounded-md p-[3px] md:p-3"
                onClick={() => setStars(5)}
                style={{
                  border:
                    stars === 5 ? "solid 5px " + theme.palette.text.alt : "",
                }}
              >
                <span className="md:text-3xl text-xl">😁</span>
                <span className="text-sm md:text-base">Great</span>
              </span>
            </div>
            <div className="mb-4 flex flex-col gap-6">
              <TextField
                label="Leave a Comment"
                name="comment"
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
                multiline={true}
                InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
                InputProps={{ sx: { color: theme.palette.text.base } }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex items-center hidden">
                <Typography gutterBottom className="text-sm md:text-base">
                  Add an image or a video
                </Typography>
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="ml-2 text-sm md:text-base"
                >
                  <Button
                    variant="contained"
                    component="span"
                    color={"primary"}
                  >
                    Choose Files
                  </Button>
                </label>
                <label className="ml-2 text-sm md:text-base">
                  {numFiles} file(s) selected
                </label>
              </div>
            </div>

            <div className="">
              {error && (
                <div
                  className="flex align-items-center justify-center p-4"
                  style={{
                    backgroundColor: "indianred",
                    color: "white",
                  }}
                >
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {error}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <Button
                color={"primary"}
                variant="contained"
                fullWidth
                onClick={() => sendReviewHandler()}
              >
                {submitting ? "Submitting" : "Submit Review"}
              </Button>
            </div>
          </form>
        )}
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
        </div>
      </Card>
    </div>
  );
}

export default Timeless;
