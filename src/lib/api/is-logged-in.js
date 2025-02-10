import { cookies } from "next/headers"
 
export default async function checkLogin() {
  const cookieStore = await cookies()
  const findToken = cookieStore.get("landrupdans_token")
  return findToken
}