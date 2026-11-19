"use client";

import { useSyncExternalStore } from "react";

function subscribe(done: () => void) {
  window.addEventListener("hashchange", done);
  return () => window.removeEventListener("hashchange", done);
}

/** The part of the address after "#", kept up to date. Empty on the server. */
export function useHash() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
}
