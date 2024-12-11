export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dice Throne Stats",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Heroes",
      href: "/heroes",
    },
    {
      label: "Stats",
      href: "/stats",
    },
    {
      label: "New Game",
      href: "/new-game",
    },
  ],
};
