import { useEffect, useState } from "react";

// Fetches a list from the API. If the request fails (e.g. the backend isn't
// running yet), falls back to the given static data so the page still renders.
export default function useApiList(fetcher, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetcher()
      .then((res) => {
        if (active) setData(res);
      })
      .catch(() => {
        if (active) setData(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}
