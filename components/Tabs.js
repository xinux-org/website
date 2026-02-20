"use client"
import React, { useEffect, useState, Suspense } from "react";
import * as ReactDOMServer from "react-dom/server";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Exports
export const TabsContainer = TabsPrimitive.Root;
export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsContent = TabsPrimitive.Content;

export function WrapContent({ children }) {
  return <>{children}</>;
}

function TabsInner({ children, tabs }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [tab, setTab] = useState(undefined);

  useEffect(() => {
    setTab(searchParams.get("tab") ?? undefined);
  }, [searchParams]);

  // Check the content inside tabs with the url and activate the right tab
  useEffect(() => {
    const checkContentMatch = (url, pushURL) => {
      const match = url.split("#")[1];
      let checkMatch = false;
      for (let i = 0; i < children.length; i++) {
        const content = ReactDOMServer.renderToString(children[i]);

        if (content.includes(match)) {
          checkMatch = i;
          break;
        }
      }

      if (checkMatch !== false) {
        if (pushURL) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("tab", slugify(tabs[checkMatch]));
          const hash = url.split("#")[1];
          router.push(`${pathname}?${params.toString()}#${hash}`, {
            scroll: false,
          });
        }
        setTab(slugify(tabs[checkMatch]));
      }
    };

    const onHashChanged = (event) => {
      checkContentMatch(event.newURL, true);
    };

    window.addEventListener("hashchange", onHashChanged);

    if (window.location.hash) {
      checkContentMatch(window.location.href, false);
    }

    return () => {
      window.removeEventListener("hashchange", onHashChanged);
    };
  }, [router, searchParams, pathname, children, tabs]);

  return (
    <TabsContainer
      value={tab}
      defaultValue={slugify(tabs[0])}
      className={styles.container}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", value);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }}
    >
      <TabsList className={styles.tabList}>
        {tabs.map((title, index) => (
          <TabsTrigger
            value={slugify(title)}
            className={styles.tabTrigger}
            key={`tab-${slugify(title)}-${index}`}
          >
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {children.map((child, index) => (
        <TabsContent
          value={slugify(tabs[index])}
          className={styles.tabContent}
          key={`content-${slugify(tabs[index])}-${index}`}
        >
          {child}
        </TabsContent>
      ))}
    </TabsContainer>
  );
}

export function Tabs({ children, tabs }) {
  return (
    <Suspense>
      <TabsInner children={children} tabs={tabs} />
    </Suspense>
  );
}

const slugify = (text) =>
  text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
