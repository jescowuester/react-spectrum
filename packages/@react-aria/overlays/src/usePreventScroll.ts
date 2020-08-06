/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { useEffect } from "react";

/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */
interface PreventScrollOptions {
  /* Whether the modal is open. If true, scroll will be prevented */
  isOpen?: boolean;
}

export function usePreventScroll(
  options: PreventScrollOptions = { isOpen: true }
): void {
  let { isOpen } = options;

  useEffect(() => {
    let overflow = document.body.style.overflow;
    let paddingRight = document.body.style.paddingRight;

    document.body.style.overflow = isOpen ? "hidden" : overflow;
    document.body.style.paddingRight = isOpen
      ? window.innerWidth - document.documentElement.clientWidth + "px"
      : paddingRight;

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isOpen]);
}
