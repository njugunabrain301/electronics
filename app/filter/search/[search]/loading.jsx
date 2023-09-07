export default function Loading() {
  return (
    <div>
      <div className="flex justify-center bg-skin-primary w-[70%] flex-wrap m-auto">
        <p className="py-3 text-skin-base">Loading...</p>
        {/* {[...Array(12).keys()].map((i) => {
          return (
            <div
              key={i}
              className="my-[10px] min-w-[250px] bg-skin-panel border border-skin-panel p-[7px] rounded-md mx-4"
              style={{
                overflow: "hidden",
                width: "260px",
              }}
            >
              <div className="flex flex-col justify-center items-center">
                <span
                  className="inline-block rounded-md animate-pulse w-[250px] h-[200px] bg-gray-800"
                  style={{
                    animationDelay: i * 0.5 + "s",
                    animationDuration: "1s",
                    aspectRatio: "3:2",
                  }}
                ></span>
                <span
                  className="inline-block h-4 w-[50%] animate-pulse bg-gray-800 rounded-sm m-3"
                  style={{
                    animationDelay: i * 0.6 + "s",
                    animationDuration: "1s",
                  }}
                ></span>
                <span
                  className="inline-block h-4 w-[80%] animate-pulse bg-gray-800 rounded-sm mb-3"
                  style={{
                    animationDelay: i * 0.6 + "s",
                    animationDuration: "1s",
                  }}
                ></span>
                <span
                  className="inline-block h-4 w-[80%] animate-pulse bg-gray-800 rounded-sm mb-3"
                  style={{
                    animationDelay: i * 0.6 + "s",
                    animationDuration: "1s",
                  }}
                ></span>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
}
