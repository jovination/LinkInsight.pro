
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl">LinkChecker</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              An open-source link management platform for modern marketing teams
            </p>
            <div className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} LinkChecker, Inc.
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Enterprise', 'Security'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'Blog', 'Changelog', 'Status', 'API', 'Support'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {['About', 'Team', 'Jobs', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Legal</h4>
            <ul className="space-y-2">
              {['Privacy', 'Terms', 'Cookie Policy', 'Compliance'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
