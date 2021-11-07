import { NextPage } from 'next';
import router from 'next/router';
import React from 'react';
export const Back: NextPage = React.memo(() => {
  return (
    <button
      onClick={() => {
        router.back();
      }}
    >
      ← Back
    </button>
  );
});

Back.displayName = 'Back';
