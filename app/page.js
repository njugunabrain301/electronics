import Main from "@/components/Main";
import { fetchCategories, fetchHomePage } from "@/utils/backendAPIs/products";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import Empty from "@/components/Empty";
import Expired from "@/components/Expired";
import WhatsappWidget from "@/components/WhatsappWidget";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function Home() {
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

  const itemList = categories.map((category, idx) => {
    return {
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@id": "https://" + profile.url + "/" + category.trim(),
        name: category.trim(),
      },
    };
  });

  let schemaJsonObj = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itemList,
  };

  return (
    <div className={"App min-w-[330px] " + selectedTheme.toLowerCase()}>
      <script
        key="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaJsonObj, null, "\t"),
        }}
      />
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
            <WhatsappWidget text={profile.name} />
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
