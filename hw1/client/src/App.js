import './App.css';
import MainPage from "./components/MainPage/MainPage";

export const LAYOUT_FLOOR = 'LAYOUT_FLOOR';
export const LAYOUT_CABINET = 'LAYOUT_CABINET';

const App = () => {
    return (
        <MainPage showLayout={false}/>
    )
}

export default App
