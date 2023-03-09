import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Header } from './components';
import { checkMetamaskInstalled } from './helpers';
import { HomePage, ParticipantsDetailsPage } from './pages';

const App = () => {

    useEffect(() => {
      const isMetamaskInstalled = checkMetamaskInstalled()
      if (!isMetamaskInstalled){
        alert('Внимание! Вам нужно установить расширение Metamask для браузера')
      }
    }, [])

  return (
    <div className='container mx-auto'>
      <Header className='mt-5'/>
      <div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='participants/:address' element={<ParticipantsDetailsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
