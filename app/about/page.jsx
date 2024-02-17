import About from "@/components/About/about";
import { fetchAboutUs } from "@/utils/backendAPIs/app";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  let about = await fetchAboutUs();

  return (
    <>
      <About about={about.data} />
    </>
  );
}
