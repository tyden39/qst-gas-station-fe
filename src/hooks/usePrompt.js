import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

const usePrompt = (message, when = true) => {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (!blocker.state) return;

    const handle = blocker.state.blocker;

    const onConfirm = () => {
      const confirmMessage = typeof message === 'function' ? message() : message;
      const isConfirmed = window.confirm(confirmMessage);

      if (isConfirmed) {
        handle.proceed();
      } else {
        handle.reset();
      }
    };

    handle.onTransition((transition) => {
      if (transition.action === 'REPLACE') {
        handle.proceed();
      } else {
        onConfirm();
      }
    });

    return () => {
      handle.reset();
    };
  }, [blocker, message]);

  return blocker.state;
};

export default usePrompt;