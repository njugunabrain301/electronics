import NotFound from "../404";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  return (
    <>
      <NotFound />
    </>
  );
}
