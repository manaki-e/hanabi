"use client";
import { useEffect } from "react";

export default function BanReload({ isPlayer }: { isPlayer: boolean }) {
  if (isPlayer) {
    useEffect(() => {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);
  }

  return null;
}
