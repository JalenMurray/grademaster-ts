'use client';

import { Authenticator, View, useAuthenticator, Image, useTheme } from '@aws-amplify/ui-react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image alt="GradeMaster logo" src="/logo.png" width={200} height={200} borderRadius={50} />
      </View>
    );
  },
};

function CustomAuthenticator() {
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async function checkSession() {
      const session = await fetchAuthSession();
      console.log(session);
    }
    if (user) {
      redirect('/');
    }
  }, [user]);

  return <Authenticator components={components} />;
}

export default function Login() {
  return (
    <Authenticator.Provider>
      <CustomAuthenticator />
    </Authenticator.Provider>
  );
}
