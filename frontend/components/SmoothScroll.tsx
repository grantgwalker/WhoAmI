"use client";

import { ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'
function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root options={{ lerp:0.1, duration: 1.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}

export default SmoothScroll;