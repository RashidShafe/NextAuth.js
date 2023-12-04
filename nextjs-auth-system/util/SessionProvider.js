'use client'

import {SessionProvider} from 'next-auth/react';

const AuthPovider = ({children}) =>{
    return <SessionProvider>{children}</SessionProvider>
}

export default AuthPovider;