import { browser, dev } from "$app/environment";
import { setServerUrl } from "$lib/utils/setServerUrl";
import { refreshTagsFromServer } from "$lib/utils/requests";

export async function load({ fetch }) {
  // pull the category data from api
  const result = await refreshTagsFromServer(
    `${setServerUrl(browser, dev)}/tags`,
    fetch
  );

  return {
    tags: result,
  };
}
