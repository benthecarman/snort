import { RequestBuilder, EventKind, NoteCollection, NostrLink, NostrPrefix } from "@snort/system";
import { useRequestBuilder } from "@snort/system-react";
import useLogin from "Hooks/useLogin";
import { useMemo } from "react";

export function useReactions(subId: string, ids: Array<NostrLink>, others?: (rb: RequestBuilder) => void) {
  const { preferences: pref } = useLogin();

  const sub = useMemo(() => {
    const rb = new RequestBuilder(subId);
    const eTags = ids.filter(a => a.type === NostrPrefix.Note || a.type === NostrPrefix.Event);
    const aTags = ids.filter(a => a.type === NostrPrefix.Address);

    if (aTags.length > 0 || eTags.length > 0) {
      const f = rb.withFilter()
        .kinds(
          pref.enableReactions
            ? [EventKind.Reaction, EventKind.Repost, EventKind.ZapReceipt]
            : [EventKind.ZapReceipt, EventKind.Repost],
        );

        if(aTags.length > 0) {
          f.tag("a", aTags.map(v => `${v.kind}:${v.author}:${v.id}`));
        }
        if(eTags.length > 0) {
          f.tag("e", eTags.map(v => v.id));
        }
    }
    others?.(rb);
    return rb.numFilters > 0 ? rb : null;
  }, [ids]);

  return useRequestBuilder(NoteCollection, sub);
}
