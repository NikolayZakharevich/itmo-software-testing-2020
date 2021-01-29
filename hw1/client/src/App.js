import './App.css';
import MainPage from "./components/MainPage/MainPage";
import AuthPage from './components/AuthPage/AuthPage'
import {useRoute} from 'react-router5'
import {router} from "./index";

export const LAYOUT_FLOOR = 'LAYOUT_FLOOR';
export const LAYOUT_CABINET = 'LAYOUT_CABINET';

const App = () => {
    const {route} = useRoute()

    const onSuccess = user => {
        router.navigate('main', {state: {showLayout: true, login: user.login}});
    }

    if (!route) {
        return null
    }

    if (route.name === 'main') {
        return <MainPage showLayout={true}/>
    }

    if (route.name === 'login') {
        return <AuthPage isLogin={true} onSuccess={onSuccess}/>
    }

    if (route.name === 'register') {
        return <AuthPage isLogin={false} onSuccess={onSuccess}/>
    }
}

export default App
