import { useEffect } from 'react';

/**
 * useDocumentMeta — set per-page <title> and <meta name="description"> from React.
 *
 * Works for both the client-rendered SPA (crawlers that run JS pick it up) and the
 * prerender pass (scripts/prerender.mjs captures the head after React mounts).
 * Restores the previous values on unmount so SPA navigation doesn't leak titles.
 */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    let tag = document.querySelector('meta[name="description"]');
    const created = !tag;
    const prevDesc = tag ? tag.getAttribute('content') : null;
    if (description) {
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }

    return () => {
      document.title = prevTitle;
      if (tag) {
        if (created) tag.remove();
        else if (prevDesc != null) tag.setAttribute('content', prevDesc);
      }
    };
  }, [title, description]);
}
