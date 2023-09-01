export default function Loading() {
  return (
    <div>
      <div className="flex justify-center flex-col items-center bg-skin-primary">
        <div variant="h4">
          <p className="text-skin-base font-inter font-bold tracking-normal leading-none pt-2">
            My Orders
          </p>
        </div>
        Loading...
        {/* {[...Array(3).keys()].map((i) => {
          return (
            <div
              key={i}
              className="my-[10px] bg-skin-panel border border-skin-panel p-[7px] rounded-md"
              style={{
                width: "80%",
              }}
            >
              <div className="grid grid-cols-2 py-4">
                <div className="text-skin-base">
                  <span
                    className="inline-block rounded-md animate-pulse w-[50vh] bg-gray-800"
                    style={{
                      animationDelay: i * 0.5 + "s",
                      animationDuration: "1s",
                      aspectRatio: "",
                      height: "70%",
                    }}
                  ></span>
                  <div className="flex flex-col items-start">
                    <span
                      className="inline-block h-4 w-[33vw] animate-pulse bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 0.6 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </div>
                </div>
                <div className="pl-[20px] text-skin-base">
                  <p className="text-sm font-inter tracking-normal leading-none pt-2">
                    <span
                      className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 0.7 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </p>
                  <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                    <span
                      className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 0.8 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </p>
                  <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                    <span
                      className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 0.9 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </p>
                  <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                    <span
                      className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 1 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </p>
                  <p className=" text-sm font-inter tracking-normal leading-none pt-2">
                    <span
                      className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                      style={{
                        animationDelay: i * 1.1 + "s",
                        animationDuration: "1s",
                      }}
                    ></span>
                  </p>
                  <div className="pt-4">
                    <div className=" text-sm font-inter tracking-normal leading-none pt-2">
                      <span
                        className="inline-block h-4 animate-pulse w-[30vw] bg-gray-800 rounded-sm"
                        style={{
                          animationDelay: i * 1.2 + "s",
                          animationDuration: "1s",
                        }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-xs text-skin-base">
                <p className=" text-xs font-inter tracking-normal leading-none pt-2">
                  <span
                    className="inline-block h-4 animate-pulse w-[70vw] bg-gray-800 rounded-sm"
                    style={{
                      animationDelay: i * 1.3 + "s",
                      animationDuration: "1s",
                    }}
                  ></span>
                </p>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
