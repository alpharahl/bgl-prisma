'use server'
import axios from "axios";
import CryptoJs from "crypto-js"
import {authUrl} from "@/utils/iracing/urls";
export const iracingAuth = async () => {
  const email = process.env.NEXT_PRIVATE_IRACING_USERNAME!.toLowerCase()
  const password = process.env.NEXT_PRIVATE_IRACING_PASSWORD
  const hash = CryptoJs.SHA256(password + email.toLowerCase())
  const encoded = CryptoJs.enc.Base64.stringify(hash);
  const authResult = await axios.post(
    authUrl,
    {
      email,
      password: encoded
    }
  )
  console.log(authResult)
  console.log(email, encoded)
}