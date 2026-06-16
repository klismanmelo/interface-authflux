import { listAppsAction } from "./actions";
import AppsClient from "./AppsClient";

export default async function MyApiPage() {
  const result = await listAppsAction();
  return (
    <AppsClient
      initialApps={result.success ? result.apps : []}
      fetchError={result.success ? undefined : result.error}
    />
  );
}
