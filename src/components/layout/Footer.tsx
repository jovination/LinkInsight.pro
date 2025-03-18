
import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 bg-background px-4 md:px-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="font-bold text-xl">LinkInsight</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The comprehensive link analysis platform for websites that want to deliver flawless user experiences
            </p>
            <div className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} LinkInsight, Inc.
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'API', 'Security'].map((item) => (
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
              {['Documentation', 'Blog', 'Support', 'Status'].map((item) => (
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
              {['About', 'Privacy', 'Terms', 'Contact'].map((item) => (
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
