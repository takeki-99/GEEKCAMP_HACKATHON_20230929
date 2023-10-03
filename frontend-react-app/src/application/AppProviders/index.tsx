import { ChakraProvider } from '@chakra-ui/react';
import type { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { StateContext, useStateContext } from '../lib/state/AuthContext';
import { OwnerHomeCon } from '../../features/owner/home/UI/Container/OwnerHomeCon';
import { OwnerSigninCon } from '../../features/owner/signin/UI/Container/OwnerSigninCon';

/**
 * プロバイダーやルーターをラップしてるやつ
 * @returns 
 */
export const AppProviders: FC = () => {
  const ctx = useStateContext();

  return <ChakraProvider>
    <StateContext.Provider value={ctx}>
      <BrowserRouter>
        <Routes>
          {/* `/`または`/owner`の時はrestaurantIdでログイン済みかどうかを確認して、ホームかログイン画面に遷移させるようにする */}
          <Route path="/" element={ctx.restaurantId ? <Navigate to='/owner' /> : <Navigate to='/signin' />} />
          {/* owner */}
          <Route path="/owner" element={ctx.restaurantId ? <OwnerHomeCon/> : <Navigate to='/signin' />} />
          {/* restaurant */}
          <Route path="/restaurant/:id" element={<>客側画面</>} />
          <Route path="/signin" element={ctx.restaurantId ? <Navigate to='/owner' /> : <OwnerSigninCon/>} />
          <Route path="/signup" element={ctx.restaurantId ? <Navigate to='/owner' /> : <>サインアップ画面</>} />
          <Route
            path="*"
            element={<>404 Not Found</>}
          />
        </Routes>
      </BrowserRouter>
    </StateContext.Provider>
  </ChakraProvider>;
};