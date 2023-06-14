import React, { useEffect } from "react";
import { Modal, Ripple, initTE } from "tw-elements";

function MyModal(props) {
  const { id } = props;
  useEffect(() => {
    initTE({ Modal, Ripple });
  }, []);

  return (
    <>
      <div
        data-te-modal-init
        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id={id}
        data-te-backdrop="static"
        data-te-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
        >
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-transparent bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
              id={"close-" + id}
            ></button>

            <div data-te-modal-body-ref className="relative">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyModal;
