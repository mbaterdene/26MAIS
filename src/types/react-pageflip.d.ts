/**
 * Loose type declaration for react-pageflip.
 * The bundled types require showPageCorners & disableFlipByClick
 * as non-optional, which is overly strict. This override makes all
 * props optional (except width & height which are truly required).
 */
declare module 'react-pageflip' {
  import React from 'react';

  export interface HTMLFlipBookProps {
    // Required
    width: number;
    height: number;
    // Layout
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    autoSize?: boolean;
    // Appearance
    drawShadow?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    showPageCorners?: boolean;
    // Animation
    flippingTime?: number;
    // Interaction
    usePortrait?: boolean;
    useMouseEvents?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    disableFlipByClick?: boolean;
    // Misc
    startPage?: number;
    startZIndex?: number;
    renderOnlyPageLengthChange?: boolean;
    // Styling
    style?: React.CSSProperties;
    className?: string;
    // Events
    onFlip?: (e: { data: number; object: unknown }) => void;
    onChangeOrientation?: (e: { data: 'portrait' | 'landscape'; object: unknown }) => void;
    onChangeState?: (e: { data: string; object: unknown }) => void;
    onInit?: (e: { data: { page: number; mode: string }; object: unknown }) => void;
    onUpdate?: (e: { data: { page: number; mode: string }; object: unknown }) => void;
    // Children
    children?: React.ReactNode;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<
    HTMLFlipBookProps & React.RefAttributes<unknown>
  >;

  export default HTMLFlipBook;
}
