'use client';
import { useEffect } from 'react';

export default function Refresh() {
  useEffect(() => {
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  });

  return null;
}
