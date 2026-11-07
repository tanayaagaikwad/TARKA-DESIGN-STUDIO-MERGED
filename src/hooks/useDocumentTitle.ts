import { useEffect } from 'react';

export function useDocumentTitle(title: string, fullTitle?: boolean) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = fullTitle ? title : `${title} | TARKA Design Studio`;
    return () => {
      document.title = previousTitle;
    };
  }, [title, fullTitle]);
}
