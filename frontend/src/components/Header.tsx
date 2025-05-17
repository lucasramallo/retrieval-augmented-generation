"use client";

import * as React from "react";
import Link from "next/link";
import { CircleDot } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import styles from "../styles/Header.module.css";

export function Header() {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Rag.dev</div>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink
            href="/chat"
            className={cn(
              navigationMenuTriggerStyle(),
              pathname === "/chat" && styles.active
            )}
          >
            Chat
          </NavigationMenuLink>

          <NavigationMenuItem>
            <NavigationMenuLink
              href="/context"
              className={cn(
                navigationMenuTriggerStyle(),
                pathname === "/context" && styles.active
              )}
            >
              Context
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <Link href="/" passHref>
                    <NavigationMenuLink asChild>
                      <div className={styles.logoCard}>
                        <CircleDot className="h-6 w-6" />
                        <div className={styles.logoTitle}>Rag.dev</div>
                        <p className={styles.logoDescription}>
                          github.com/lucasramallo
                        </p>
                      </div>
                    </NavigationMenuLink>
                  </Link>
                </li>
                <ListItem href="/apidoc" title="Api">
                  Documentação de como rodar o backend.
                </ListItem>
                <ListItem href="/frontdoc" title="Fontend">
                  Documentação de como rodar o frontend.
                </ListItem>
                <ListItem
                  href="https://github.com/lucasramallo/retrieval-augmented-generation"
                  title="Github do projeto"
                  target="_blank"
                >
                  Link para o repositório do projeto no github.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn(styles.linkItem, className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
