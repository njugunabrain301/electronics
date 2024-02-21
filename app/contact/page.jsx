import Contact from "@/components/Contact/contact";
import { fetchContactUs } from "@/utils/backendAPIs/app";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  let contact = await fetchContactUs();

  return (
    <>
      <Contact contact={contact.data} />
    </>
  );
}
