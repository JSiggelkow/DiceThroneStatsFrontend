"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const currentPath = usePathname();

  return (
    <Navbar
      isBordered
      className={"w-full"}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "after:content-['']",
          "after:absolute",
          "after:bottom-0",
          "after:left-0",
          "after:right-0",
          "after:h-[2px]",
          "after:rounded-[2px]",
          "after:dark:bg-amber-500",
          "after:bg-black",
          "after:transform",
          "after:scale-x-0",
          "after:transition-transform",
          "after:duration-300",
          "after:ease-in-out",
          "data-[active=true]:after:scale-x-100",
        ],
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <LogoIcon size={70} />
        <p className="font-bold text-inherit hidden xs:block">Dice Throne Stats</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={currentPath === item.href}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarMenu className="backdrop-blur-sm">
        {siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            isActive={currentPath === item.href}
          >
            <Link className="w-full" href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
