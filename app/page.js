import Main from "@/components/Main";
import { fetchCategories, fetchHomePage } from "@/utils/backendAPIs/products";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import Empty from "@/components/empty";
import Expired from "@/components/Expired";

export const runtime = "edge";

export default async function Home() {
  console.log("Home page component");
  let isReady = false;
  let promoted = [];
  let slider = [];
  let user = {};

  let empty = false;
  let expired = false;

  const loadPage = async () => {
    let res = await fetchHomePage();

    if (res.success) {
      if (!res.data.ready) {
        empty = true;
        return;
      }
      if (!res.data.active) {
        expired = true;
        return;
      }
      isReady = true;
      promoted = res.data.promoted;
      slider = res.data.slider;
    }
  };

  await loadPage();
  let res = await fetchCategories();
  let categories = res.data;
  res = await fetchBusinessProfile();
  let profile = res.data;
  let selectedTheme = profile.theme;

  return (
    <div className={"App min-w-[330px] bg-skin-primary " + selectedTheme}>
      {isReady ? (
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
      ) : empty ? (
        <Empty />
      ) : (
        <Expired />
      )}
    </div>
  );
}
