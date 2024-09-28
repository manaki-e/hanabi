"use client";
import { useEffect } from "react";

export default function Refresh({ isPlayer }: { isPlayer: boolean }) {
  useEffect(() => {
    if (!isPlayer) {
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }, [isPlayer]);

  return null;
}
