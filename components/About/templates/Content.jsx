"use client";

const Content = ({ about, titleFont, cleanHTML }) => {
  return (
    <main-content>
      <div className="w-[90%] max-w-[1000px] mx-auto pb-[50px]">
        <h1
          className={
            titleFont.className +
            " text-3xl md:text-5xl text-center pt-[50px] pb-[20px]"
          }
        >
          About Us Hello
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: cleanHTML(
              about.aboutDetailed ? about.aboutDetailed : about.about
            ),
          }}
          className="pure-html"
        ></p>
      </div>
    </main-content>
  );
};

export default Content;
