import { removeUndefined } from "@snort/shared";
import { EventKind, NostrLink, NoteCollection, RequestBuilder } from "@snort/system";
import { useEventsFeed, useRequestBuilder } from "@snort/system-react";
import { useMemo } from "react";

/**
 * Use a link event containing e/a/p/t tags
 */
export function useLinkList(id: string, fn: (rb: RequestBuilder) => void) {
  const sub = useMemo(() => {
    const rb = new RequestBuilder(id);
    fn(rb);
    return rb;
  }, [id, fn]);

  const listStore = useRequestBuilder(NoteCollection, sub);
  return useMemo(() => {
    if (listStore.data && listStore.data.length > 0) {
      return removeUndefined(
        listStore.data
          .map(e =>
            e.tags.map(a => {
              try {
                return NostrLink.fromTag(a);
              } catch {
                // ignored, skipped
              }
            }),
          )
          .flat(),
      );
    }
    return [];
  }, [listStore.data]);
}

export function useLinkListEvents(id: string, fn: (rb: RequestBuilder) => void) {
  const links = useLinkList(id, fn);
  return useEventsFeed(`${id}:events`, links).data ?? [];
}

export function usePinList(pubkey: string | undefined) {
  return useLinkListEvents(`pins:${pubkey?.slice(0, 12)}`, rb => {
    if (pubkey) {
      rb.withFilter().kinds([EventKind.PinList]).authors([pubkey]);
    }
  });
}

export function useMuteList(pubkey: string | undefined) {
  return useLinkList(`pins:${pubkey?.slice(0, 12)}`, rb => {
    if (pubkey) {
      rb.withFilter().kinds([EventKind.MuteList]).authors([pubkey]);
    }
  });
}

export default function useCategorizedBookmarks(pubkey: string | undefined, list: string) {
  return useLinkListEvents(`categorized-bookmarks:${list}:${pubkey?.slice(0, 12)}`, rb => {
    if (pubkey) {
      rb.withFilter().kinds([EventKind.CategorizedBookmarks]).authors([pubkey]).tag("d", [list]);
    }
  });
}
