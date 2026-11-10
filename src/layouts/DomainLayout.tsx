import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/domain-light.css';

/**
 * Wraps Pranali's standalone domain pages and the quote builder.
 * Re-uses the light "paper" body background from marketing.css
 * (body.tarka-marketing-body) so these pages match the rest of the site,
 * and adds `domain-light` for the few hero overrides below.
 */
export default function DomainLayout() {
  useEffect(() => {
    document.body.classList.add('tarka-marketing-body', 'domain-light');
    return () => {
      document.body.classList.remove('tarka-marketing-body', 'domain-light');
    };
  }, []);

  return <Outlet />;
}
