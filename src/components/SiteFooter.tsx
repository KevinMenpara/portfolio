import { profile } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-semibold text-ink">{profile.name}</p>
          <p className="text-[15px]">
            {profile.location}
            {profile.showPhone && (
              <>
                <br />
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="hover:text-ink">
                  {profile.phone}
                </a>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-ink">
            <GitHubIcon width={22} height={22} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-ink">
            <LinkedInIcon width={22} height={22} />
          </a>
          <span className="text-[15px]">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
