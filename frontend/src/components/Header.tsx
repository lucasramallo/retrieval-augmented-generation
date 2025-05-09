"use client"

import * as React from "react"
import Link from "next/link"
import { Home, MessageCircle, Layers, CircleDot } from "lucide-react"
import { usePathname } from "next/navigation"


import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import styles from "../styles/Header.module.css"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function Header() {
  const pathname = usePathname()

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
                <ListItem href="/docs" title="Backend">
                  Documentação de como rodar o backend.
                </ListItem>
                <ListItem href="/docs/installation" title="Fontend">
                  Documentação de como rodar o frontend.
                </ListItem>
                <ListItem href="https://github.com/lucasramallo/retrieval-augmented-generation" title="Github do projeto" target="_blank">
                  Link para o repositório do projeto no github.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(styles.linkItem, className)}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-2">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Header;