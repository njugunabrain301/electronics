import Contact from "@/components/Contact/contact";
import { fetchAboutUs } from "@/utils/backendAPIs/app";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  let contact = await fetchAboutUs();

  return (
    <>
      <Contact contact={contact.data} />
    </>
  );
}
