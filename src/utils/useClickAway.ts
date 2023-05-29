import React, { useEffect } from 'react';

export const useClickAway = (
  ref: React.MutableRefObject<any>,
  handler: (value: boolean) => void
) => {
  const handleOutsideClick = React.useCallback(
    (e: any) => {
      if (ref && ref.current !== null && !ref.current.contains(e.target)) {
        handler(false);
      }
    },
    [handler, ref]
  );

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [handleOutsideClick]);
};
