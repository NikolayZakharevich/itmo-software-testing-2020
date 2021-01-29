import './App.css';
import MainPage from "./components/MainPage/MainPage";
import AuthPage from './components/AuthPage/AuthPage'
import {useRoute} from 'react-router5'

export const LAYOUT_FLOOR = 'LAYOUT_FLOOR';
export const LAYOUT_CABINET = 'LAYOUT_CABINET';

const App = () => {
    const {route} = useRoute()

    if (!route) {
        return null
    }

    if (route.name === 'main') {
        return <MainPage showLayout={true}/>
    }

    if (route.name === 'login') {
        return <AuthPage isLogin={true}/>
    }

    if (route.name === 'register') {
        return <AuthPage isLogin={false}/>
    }
}

export default App
