// import Main from "@/components/Main";
// import Loading from "@/components/Loading/Loading";
// import UnderConstruction from "@/components/Loading/UnderConstruction";
// import { fetchCategories, fetchHomePage } from "@/utils/backendAPIs/products";
// import { fetchBusinessProfile } from "@/utils/backendAPIs/app";

export default async function Home() {
  // let isReady = false;
  // let promoted = [];
  // let slider = [];
  // let user = {};

  // let constructed = true;

  // const loadPage = async () => {
  //   let res = await fetchHomePage();
  //   if (res.success) {
  //     if (!res.data.ready || !res.data.active) {
  //       constructed = false;
  //       return;
  //     }
  //     isReady = true;
  //     promoted = res.data.promoted;
  //     slider = res.data.slider;
  //   }
  // };
  // await loadPage();
  // let res = await fetchCategories();
  // let categories = res.data;
  // res = await fetchBusinessProfile();
  // let profile = res.data;
  let selectedTheme = ""; //profile.theme;

  return (
    <div className={"App min-w-[330px] bg-skin-primary " + selectedTheme}>
      Main Page
      {/* {isReady ? (
        <>
          <>
            <Main
              user={user}
              slider={slider}
              promoted={promoted}
              profile={profile}
              categories={categories}
            ></Main>
          </>
        </>
      ) : constructed ? (
        <Loading />
      ) : (
        <UnderConstruction />
      )} */}
    </div>
  );
}
