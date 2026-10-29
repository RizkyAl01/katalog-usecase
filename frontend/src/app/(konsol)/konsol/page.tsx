import { redirect } from "next/navigation";
import { getSesi } from "@/lib/auth/dal";
import { konsolPath } from "@/lib/auth/peran";

/** /konsol -> dashboard sesuai peran (middleware biasanya sudah mengarahkan lebih dulu). */
export default async function Konsol() {
  const sesi = await getSesi();
  redirect(sesi ? konsolPath(sesi.peran) : "/masuk");
}
