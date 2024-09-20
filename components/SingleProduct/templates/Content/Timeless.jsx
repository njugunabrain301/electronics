"use client";
import Image from "next/image";
import ProductSection from "@/components/HomePage/Timeless/ProductSection";
import NavigateButtons from "@/components/NavigateButtons/NavigateButtons";
import Link from "next/link";
import Counter from "../Counter";
import Product from "../Product";
import MoreDetails from "../MoreDetails";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SingleCarousel from "react-material-ui-carousel";
import MyModal from "@/components/Modal/MyModal";
import Cart from "@/components/cart/Cart";

const SingleProductContent = ({
  product,
  others,
  categories,
  profile,
  shipping,
  returns,
  offers,
  unitsSold,
  unitsRefunded,
  source,
  coupon,
  showPrice,
  theme,
  bodyFont,
  setCart,
  checkoutInfo,
  resizeProdImageSmall,
  currOption,
  setCurrOption,
  cleanHTML,
  openBuyNow,
  setOpenBuyNow,
  handleOpenBuyNow,
  handleCloseBuyNow,
  articleCount,
  responsive,
  articles,
  pkg,
  discount,
  selectedPrice,
  setSelectedPrice,
  productSize,
  productColor,
  buyNow,
}) => {
  return (
    <main-content>
      <div
        className={"" + bodyFont.className}
        style={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.base,
        }}
      >
        {coupon && (
          <div
            className="text-center text-sm sm:text-xl md:text-2xl font-black py-2"
            style={{
              backgroundColor: theme.palette.background.inverted,
              color: theme.palette.text.inverted,
            }}
          >
            {coupon.name +
              " offer !! " +
              (discount / (selectedPrice + discount) > 0.01
                ? Math.round((discount / (selectedPrice + discount)) * 100) +
                  "% Off !!"
                : "") +
              " Save Ksh. " +
              discount +
              " !!"}
          </div>
        )}
        {/* Product First */}
        {source === "google" && articles.length > 0 && product && (
          <Product
            discount={discount}
            product={product}
            profile={profile}
            shipping={shipping}
            returns={returns}
            offers={offers}
            unitsSold={unitsSold}
            unitsRefunded={unitsRefunded}
            currOption={currOption}
            setCurrOption={setCurrOption}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            sticky={false}
            openBuyNow={openBuyNow}
            setOpenBuyNow={setOpenBuyNow}
            handleCloseBuyNow={handleCloseBuyNow}
            handleOpenBuyNow={handleOpenBuyNow}
          />
        )}
        {pkg !== "starter" && (
          <div id="article">
            {/* Articles */}
            {articles.length > 0 && (
              <div className="pb-8 flex flex-wrap w-full mx-auto max-w-7xl justify-between ">
                {articles
                  .filter((a) => a.visibility)
                  .map((article, idx) => {
                    if (article.type === "article") {
                      let reverse = articleCount % 2 !== 0;
                      articleCount++;
                      let hasImage = article.content.image;
                      return (
                        <div
                          className={
                            hasImage
                              ? "w-[98%] mx-auto my-5"
                              : "w-[98%] md:w-[46%] mx-auto my-5"
                          }
                          key={idx + "_" + article._id}
                        >
                          {article.content.title && (
                            <>
                              <h3
                                className="text-2xl md:text-3xl font-bold w-full text-center hidden md:block"
                                style={{
                                  textAlign: hasImage ? "left" : "center",
                                }}
                              >
                                {article.content.title}
                              </h3>
                              <h3 className="text-2xl md:text-3xl font-bold w-full text-center md:hidden">
                                {article.content.title}
                              </h3>
                            </>
                          )}
                          <div
                            className={
                              "w-full md:flex flex-wrap my-4 md:justify-between md:items-center"
                            }
                            style={{
                              flexDirection:
                                reverse && article.content.image
                                  ? "row-reverse"
                                  : "row",
                            }}
                          >
                            {article.content.image && (
                              <label className="text-center mx-auto w-full md:w-[45%] md:m-0">
                                <Image
                                  src={resizeProdImageSmall(
                                    article.content.image
                                  )}
                                  alt={article.content.title + " image"}
                                  width={300}
                                  height={200}
                                  className="w-full mx-auto aspect-video object-contain my-[40px] md:ml-0"
                                />
                              </label>
                            )}
                            {article.content.content && (
                              <p
                                className={
                                  hasImage
                                    ? "my-3 px-3 leading-8 w-full md:w-[50%]"
                                    : "my-3 px-3 leading-8 w-full"
                                }
                                dangerouslySetInnerHTML={{
                                  __html: cleanHTML(article.content.content),
                                }}
                              ></p>
                            )}
                          </div>
                        </div>
                      );
                    } else if (article.type === "list") {
                      return (
                        <div
                          className="w-[96%] md:w-[46%] mx-auto my-5"
                          key={idx + "_" + article._id}
                        >
                          <div className="w-full my-3">
                            {article.content.title && (
                              <h2 className="text-2xl md:text-3xl font-bold w-full text-center my-3">
                                {article.content.title}
                              </h2>
                            )}
                            {article.content.intro && (
                              <p className="leading-8 mb-3">
                                {article.content.intro}
                              </p>
                            )}
                            <ul className="list-disc ml-7 leading-8">
                              {article.content.items.map((item, idx) => {
                                return (
                                  <li
                                    key={idx + "-" + item}
                                    dangerouslySetInnerHTML={{
                                      __html: cleanHTML(item),
                                    }}
                                  ></li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      );
                    } else if (article.type === "counter") {
                      return (
                        <div
                          className="w-[98%] md:w-[46%] mx-auto my-5 flex justify-center flex-wrap items-center w-full"
                          key={idx + "_" + article._id}
                        >
                          <div className="flex justify-evenly flex-wrap items-center w-full">
                            {article.content.values.map((value, idx) => {
                              return (
                                <Counter
                                  key={
                                    idx + "-" + value.title + "-" + value.value
                                  }
                                  value={value.value}
                                  title={value.title}
                                  prefix={value.prefix ? value.prefix : ""}
                                  suffix={value.suffix ? value.suffix : ""}
                                />
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else if (article.type === "title") {
                      let imageUrl = article.content.image
                        ? resizeProdImageSmall(article.content.image)
                        : "";
                      return (
                        <div
                          key={idx + "_" + article._id}
                          className="w-full relative text-center mb-3 py-10 px-5"
                          style={{
                            backgroundImage: article.content.image
                              ? "url('" + imageUrl + "')"
                              : "",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          {article.content.image && (
                            <div
                              style={{
                                content: "",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                              }}
                            ></div>
                          )}
                          <div
                            style={{
                              position: "relative",
                              textAlign: "center",
                              color: article.content.image
                                ? theme.palette.text.inverted
                                : theme.palette.text.base,
                            }}
                          >
                            {article.content.title && (
                              <h1 className="text-3xl md:text-3xl font-bold w-full text-center">
                                {article.content.title}
                              </h1>
                            )}

                            {article.content.subtitle && (
                              <h2 className="m-3 text-center text-2xl">
                                {article.content.subtitle}
                              </h2>
                            )}
                          </div>
                        </div>
                      );
                    } else if (article.type === "link") {
                      return (
                        <div
                          className="w-[96%] md:w-[46%] mx-auto my-5 flex items-center justify-center"
                          key={idx + "_" + article._id}
                        >
                          <div
                            style={{
                              backgroundColor:
                                theme.palette.background.inverted,
                              color: theme.palette.text.inverted,
                            }}
                            className="rounded-3xl p-2"
                          >
                            <Link
                              href={
                                article.content.url ? article.content.url : "/"
                              }
                              className="hover:underline"
                            >
                              <h2 className="m-3 text-center text-2xl">
                                {article.content.text}
                              </h2>
                            </Link>
                          </div>
                        </div>
                      );
                    } else if (article.type === "carousel") {
                      return (
                        <div
                          key={idx + "_" + article._id}
                          className="w-full relative text-center mb-3 py-10 px-5"
                        >
                          {article.content.title && (
                            <h3 className="text-2xl md:text-3xl font-bold w-full text-center mb-4">
                              {article.content.title}
                            </h3>
                          )}
                          <div className="hidden sm:block">
                            <Carousel
                              responsive={responsive}
                              autoPlay={true}
                              swipeable={true}
                              draggable={true}
                              showDots={true}
                              arrows={false}
                              infinite={true}
                              partialVisible={false}
                              dotListClass=""
                            >
                              {article.content.values.map((cai, idx2) => {
                                return (
                                  <div
                                    className={"w-[97%] mx-auto mb-8"}
                                    key={
                                      idx2 +
                                      "_" +
                                      cai.title +
                                      "-" +
                                      cai.description +
                                      "_" +
                                      cai.image
                                    }
                                  >
                                    <div
                                      className={
                                        "w-full flex flex-col items-center"
                                      }
                                      style={{ margin: "10px" }}
                                    >
                                      {cai.image && (
                                        <label className="text-center mx-auto w-full">
                                          <Image
                                            src={resizeProdImageSmall(
                                              cai.image
                                            )}
                                            alt={cai.title + " image"}
                                            width={300}
                                            height={200}
                                            className="w-full mx-auto aspect-video object-cover my-[10px] md:ml-0"
                                          />
                                        </label>
                                      )}
                                      {cai.title && (
                                        <h2
                                          className={
                                            "my-1 px-3 leading-8 w-full font-bold"
                                          }
                                        >
                                          {cai.title}
                                        </h2>
                                      )}
                                      {cai.description && (
                                        <h3 className={"px-3 leading-8 w-full"}>
                                          {cai.description}
                                        </h3>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </Carousel>
                          </div>
                          <div className="sm:hidden">
                            <SingleCarousel
                              animation="slide"
                              navButtonsAlwaysVisible={false}
                              duration={1000}
                              navButtonsProps={{
                                style: {
                                  backgroundColor: "#20202090",
                                  color: "white",
                                  borderRadius: "50%",
                                },
                              }}
                              indicators={true}
                            >
                              {article.content.values.map((cai, idx2) => {
                                return (
                                  <div
                                    className={"mx-2 mb-8"}
                                    key={
                                      idx2 +
                                      "_" +
                                      cai.title +
                                      "-" +
                                      cai.description +
                                      "_" +
                                      cai.image
                                    }
                                  >
                                    <div
                                      className={"flex flex-col items-center"}
                                      style={{ margin: "10px" }}
                                    >
                                      {cai.image && (
                                        <label className="text-center mx-auto w-full">
                                          <Image
                                            src={resizeProdImageSmall(
                                              cai.image
                                            )}
                                            alt={cai.title + " image"}
                                            width={300}
                                            height={200}
                                            className="w-full mx-auto aspect-video object-cover my-[10px] md:ml-0"
                                          />
                                        </label>
                                      )}
                                      {cai.title && (
                                        <h2
                                          className={
                                            "my-1 px-3 leading-8 w-full font-bold"
                                          }
                                        >
                                          {cai.title}
                                        </h2>
                                      )}
                                      {cai.description && (
                                        <h3 className={"px-3 leading-8 w-full"}>
                                          {cai.description}
                                        </h3>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </SingleCarousel>
                          </div>
                        </div>
                      );
                    } else if (article.type === "video") {
                      return (
                        <div
                          key={idx + "_" + article._id}
                          className="w-full relative text-center mb-3 py-10 px-5"
                          style={{
                            backgroundImage: article.content.image
                              ? "url('" + imageUrl + "')"
                              : "",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              textAlign: "center",
                              color: article.content.image
                                ? theme.palette.text.inverted
                                : theme.palette.text.base,
                            }}
                            id="video"
                          >
                            {article.content.title && (
                              <h1 className="text-3xl md:text-3xl font-bold w-full text-center mb-[20px]">
                                {article.content.title}
                              </h1>
                            )}
                            <iframe
                              style={{
                                aspectRatio: "3/2",
                                marginBottom: "20px",
                              }}
                              width="100%"
                              src={
                                "https://www.youtube.com/embed/" +
                                article.content.videoId
                              }
                            ></iframe>
                            {article.content.caption && (
                              <h2 className="m-3 text-center">
                                {article.content.caption}
                              </h2>
                            )}
                          </div>
                        </div>
                      );
                    } else if (article.type === "banner-video") {
                      return (
                        <div
                          key={idx + "_" + article._id}
                          className="w-full relative text-center mb-3 py-10 px-5 flex flex-wrap flex-col flex-col-reverse md:flex-row"
                          style={{
                            backgroundColor: theme.palette.background.inverted,
                            color: theme.palette.text.inverted,
                          }}
                        >
                          <div className="w-[100%] md:w-[48%] flex flex-col justify-center ">
                            {article.content.headline && (
                              <h1 className="text-3xl md:text-3xl font-bold w-full text-center md:text-left mb-[20px]">
                                {article.content.headline}
                              </h1>
                            )}
                            {article.content.tagline && (
                              <h2 className="my-3 text-center md:text-left">
                                {article.content.tagline}
                              </h2>
                            )}
                            {discount ? (
                              <span className="w-full flex items-end justify-center">
                                <span className="sm:text-xl mr-2 font-bold">
                                  {"Ksh. " + selectedPrice}
                                </span>
                                <span className="line-through text-sm sm:text-base">
                                  &nbsp;{" " + (selectedPrice + discount) + " "}
                                  &nbsp;
                                </span>
                              </span>
                            ) : (
                              <span className="sm:text-xl font-bold">
                                {"Ksh. " + selectedPrice}
                              </span>
                            )}
                            <div className="mx-auto md:mr-auto md:justify-left justify-center md:text-lg cursor-pointer mt-4">
                              <span
                                className="p-3 border-2"
                                style={{
                                  backgroundColor:
                                    theme.palette.background.primary,
                                  color: theme.palette.text.primary,
                                  borderColor: theme.palette.background.primary,
                                }}
                                onClick={buyNow}
                              >
                                Buy&nbsp;Now
                              </span>

                              {article.content.manualLink ? (
                                <Link
                                  className="p-3 ml-3 border-2"
                                  style={{
                                    borderColor:
                                      theme.palette.background.primary,
                                  }}
                                  href={article.content.manualLink}
                                  target="_blank"
                                >
                                  Download&nbsp;Manual
                                </Link>
                              ) : (
                                <a
                                  href={"tel: " + profile.phone}
                                  className="p-3 ml-3 border-2"
                                  style={{
                                    borderColor:
                                      theme.palette.background.primary,
                                  }}
                                  target="_blank"
                                >
                                  Call&nbsp;To&nbsp;Order
                                </a>
                              )}
                            </div>
                          </div>
                          <div
                            style={{
                              position: "relative",
                              textAlign: "center",
                              color: article.content.image
                                ? theme.palette.text.inverted
                                : theme.palette.text.base,
                            }}
                            id="video"
                            className="w-[100%] md:w-[48%]"
                          >
                            <iframe
                              style={{
                                aspectRatio: "3/2",
                                marginBottom: "20px",
                              }}
                              width="100%"
                              src={
                                "https://www.youtube.com/embed/" +
                                article.content.videoId
                              }
                            ></iframe>
                          </div>

                          {/* Buy Now Modal */}
                          <MyModal
                            open={openBuyNow}
                            onClose={handleCloseBuyNow}
                          >
                            <Cart
                              closeModal={handleCloseBuyNow}
                              totalPrice={selectedPrice}
                              setCart={setCart}
                              cart={[
                                {
                                  _id: product._id,
                                  name: product.name,
                                  img: product.img,
                                  text: product.description,
                                  description: product.description,
                                  selectedOption: currOption.option,
                                  size: productSize,
                                  color: productColor,
                                  price: selectedPrice,
                                  amount: 1,
                                  totalPrice: selectedPrice,
                                  handlingTime: product.handlingTime,
                                },
                              ]}
                              showPrice={profile.showPrice}
                              checkoutInfo={checkoutInfo}
                              selectedTheme={profile.theme.toLowerCase()}
                              template={profile.template}
                              single={true}
                            ></Cart>
                          </MyModal>
                        </div>
                      );
                    }
                  })}
              </div>
            )}
          </div>
        )}
        {/* Breadcrumbs */}
        <p className="text-sm md:text-base mt-2 w-[98%] mx-auto max-w-7xl">
          <Link className="font-bold" href={"/"}>
            Home
          </Link>{" "}
          &gt;&gt;{" "}
          <Link href={"/filter/" + product.category} className="font-bold">
            {product.category}
          </Link>{" "}
          &gt;&gt;{" "}
          <Link href={"/filter/" + product.subcategory} className="font-bold">
            {product.subcategory}
          </Link>
        </p>
        {/* Product Main */}
        <div id="product">
          {product && (
            <Product
              discount={discount}
              coupon={coupon}
              product={product}
              profile={profile}
              shipping={shipping}
              returns={returns}
              offers={offers}
              unitsSold={unitsSold}
              unitsRefunded={unitsRefunded}
              currOption={currOption}
              setCurrOption={setCurrOption}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              sticky={true}
            />
          )}
        </div>
        {/* More Details Again */}
        {product && <MoreDetails product={product} profile={profile} />}
        {/* Related Products */}
        {product.showRelated && (
          <div>
            <div>
              <ProductSection
                products={others}
                showPrice={showPrice}
                profile={profile}
                title="Related Products"
              />
            </div>
            <div>
              <NavigateButtons
                categories={categories}
                profile={profile}
                minified={true}
              />
            </div>
          </div>
        )}
      </div>
    </main-content>
  );
};

export default SingleProductContent;
