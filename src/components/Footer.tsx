const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-8">
      <div className="container-narrow px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl text-background">
              MM
            </span>
            <span className="text-background/60 text-sm">
              · Mulwa Martin
            </span>
          </div>
          <p className="text-background/60 text-sm text-center md:text-right">
            © {currentYear} Mulwa Martin. All rights reserved.
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-background/10 text-center">
          <p className="text-background/50 text-xs">
            Science, Innovation, and Civic Courage
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
