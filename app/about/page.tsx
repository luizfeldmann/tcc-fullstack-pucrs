"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";

export default function About() {
  const { LL } = useI18nContext();

  return (
    <div>
      <h1>{LL.About.Title()}</h1>
    </div>
  );
}
