import { useMemo } from "react";
import { HexKey, FullRelaySettings, TaggedRawEvent, RelaySettings, EventKind } from "@snort/nostr";

import { sanitizeRelayUrl } from "SnortUtils";
import { PubkeyReplaceableNoteStore, RequestBuilder } from "System";
import useRequestBuilder from "Hooks/useRequestBuilder";

interface RelayList {
  pubkey: string;
  created: number;
  relays: FullRelaySettings[];
}

export default function useRelaysFeedFollows(pubkeys: HexKey[]): Array<RelayList> {
  const sub = useMemo(() => {
    const b = new RequestBuilder(`relays:follows`);
    b.withFilter().authors(pubkeys).kinds([EventKind.Relays, EventKind.ContactList]);
    return b;
  }, [pubkeys]);

  function mapFromRelays(notes: Array<TaggedRawEvent>): Array<RelayList> {
    return notes.map(ev => {
      return {
        pubkey: ev.pubkey,
        created: ev.created_at,
        relays: ev.tags
          .map(a => {
            return {
              url: sanitizeRelayUrl(a[1]),
              settings: {
                read: a[2] === "read" || a[2] === undefined,
                write: a[2] === "write" || a[2] === undefined,
              },
            } as FullRelaySettings;
          })
          .filter(a => a.url !== undefined),
      };
    });
  }

  function mapFromContactList(notes: Array<TaggedRawEvent>): Array<RelayList> {
    return notes.map(ev => {
      if (ev.content !== "" && ev.content !== "{}" && ev.content.startsWith("{") && ev.content.endsWith("}")) {
        try {
          const relays: Record<string, RelaySettings> = JSON.parse(ev.content);
          return {
            pubkey: ev.pubkey,
            created: ev.created_at,
            relays: Object.entries(relays)
              .map(([k, v]) => {
                return {
                  url: sanitizeRelayUrl(k),
                  settings: v,
                } as FullRelaySettings;
              })
              .filter(a => a.url !== undefined),
          };
        } catch {
          // ignored
        }
      }
      return {
        pubkey: ev.pubkey,
        created: 0,
        relays: [],
      };
    });
  }

  const relays = useRequestBuilder<PubkeyReplaceableNoteStore>(PubkeyReplaceableNoteStore, sub);
  const notesRelays = relays.data?.filter(a => a.kind === EventKind.Relays) ?? [];
  const notesContactLists = relays.data?.filter(a => a.kind === EventKind.ContactList) ?? [];
  return useMemo(() => {
    return [...mapFromContactList(notesContactLists), ...mapFromRelays(notesRelays)];
  }, [relays]);
}
