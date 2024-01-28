import { Route, Routes, } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { Header } from './components/Header'

export const App = () => {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:id' element={<Details />}></Route>
            </Routes>
        </>
    )
}
