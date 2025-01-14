import {ADDRESS} from "@/helpers/config";

export const getApi = async <ResultType>(
  route: string,
): Promise<ResultType | undefined> => {
  try {
    console.log("fetch route:", `${ADDRESS.WP_API_URL}/${route}`)
    const response = await fetch(`${ADDRESS.WP_API_URL}/${route}`, {
      cache: "force-cache",
    })
    return await response.json()
  } catch (e) {
    console.error("error", e)
  }
}
