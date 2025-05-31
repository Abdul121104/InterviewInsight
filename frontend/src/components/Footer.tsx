import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            InterviewInsight
          </a>
          <p className="mt-4 text-muted-foreground">
            Your trusted platform for sharing and learning from real interview experiences. 
            Connect with professionals and prepare for your next career move.
          </p>
        </div>
        <div className="flex flex-col gap-1"></div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Quick Links</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="/interviews"
              className="opacity-60 hover:opacity-100"
            >
              View Interviews
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/submit-interview"
              className="opacity-60 hover:opacity-100"
            >
              Share Experience
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="/login"
              className="opacity-60 hover:opacity-100"
            >
              Login
            </a>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Resources</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#features"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#how-it-works"
              className="opacity-60 hover:opacity-100"
            >
              How It Works
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#faq"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Connect</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/Abdul121104"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              GitHub
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/abdul-rahman-0a7191234/"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; {new Date().getFullYear()} InterviewInsight. All rights reserved.
        </h3>
      </section>
    </footer>
  );
};
