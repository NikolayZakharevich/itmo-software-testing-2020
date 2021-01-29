import React, {useState} from 'react';
import './App.css';
import filterIcon from './static/filterIcon.png'
import routeIcon from './static/routeIcon.png'
import magnifierIcon from './static/magnifierIcon.png'
import {getFloorWithFilters, getFloor} from "./api/floor";
import FloorLayout from "./components/FloorLayout/FloorLayout";
import CabinetLayout from "./components/CabinetLayout/CabinetLayout";
import RoadBlock from "./components/RoadBlock/RoadBlock";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import FiltersBlock from "./components/FiltersBlock/FiltersBlock";

export const LAYOUT_FLOOR = 'LAYOUT_FLOOR';
export const LAYOUT_CABINET = 'LAYOUT_CABINET';

const FLOOR_ID_START = 1;
const FLOOR_ID_MIN = 1;
const FLOOR_ID_MAX = 3;

const FLOOR_EMPTY = {id: FLOOR_ID_START, cabinets: [], points: []}

const BLOCK_FILTERS = Symbol('BLOCK_FILTERS');
const BLOCK_ROAD = Symbol('BLOCK_ROAD');
const BLOCK_MAGNIFIER = Symbol('BLOCK_MAGNIFIER');

const App = () => {

    const [filtersBlockShown, setFiltersBlockShown] = useState(false);
    const [roadBlockShown, setRoadBlockShown] = useState(false);
    const [magnifierBlockShown, setMagnifierBlockShown] = useState(false);
    const [activeFloor, setActiveFloor] = useState(FLOOR_EMPTY);
    const [activeCabinet, setActiveCabinet] = useState({id: 0, tables: []});
    const [stateVersions, setStateVersions] = useState([]);
    const [activeLayout, setActiveLayout] = useState(LAYOUT_FLOOR);
    const [currentFilter, setCurrentFilter] = useState({
        coffeepoint: false,
        bathroom: false,
        worker_room: false,
        meeting_room: false,
        warehouse: false
    });

    const isFirstFloor = activeFloor.id === FLOOR_ID_MIN
    const isLastFloor = activeFloor.id === FLOOR_ID_MAX

    const loadFloor = (floorId, filtersState = {}) => {
        const activeFiltersStr = Object.keys(filtersState).filter(filterName => !!filtersState[filterName]).join(",");
        const id = floorId
        getFloorWithFilters(id, activeFiltersStr).then(r => {
            if (!r || !r.floor || !r.floor.cabinets) {
                console.log('Failed to load floor', r);
                return
            }
            changeFloorKeepingPoints({id, cabinets: r.floor.cabinets})
        });
    };
    const filterCabinets = filtersState => loadFloor(activeFloor.id, filtersState);

    if (activeFloor === FLOOR_EMPTY) {
        loadFloor(FLOOR_ID_START)
    }

    const onClickBlockIcon = block => {
        const blocks = {
            [BLOCK_FILTERS]: [filtersBlockShown, setFiltersBlockShown],
            [BLOCK_ROAD]: [roadBlockShown, setRoadBlockShown],
            [BLOCK_MAGNIFIER]: [magnifierBlockShown, setMagnifierBlockShown]
        };

        if (!blocks[block]) {
            return;
        }
        const [isBlockShown, setBlockShown] = blocks[block];
        if (isBlockShown) { // block is shown: need to hide
            setBlockShown(false);
            return;
        }
        Object.getOwnPropertySymbols(blocks).forEach(anotherBlock => {  // block is hidden: hide others and show
            if (anotherBlock === block) {
                return
            }
            const [isShown, setShown] = blocks[anotherBlock]
            if (isShown) {
                setShown(false);
            }
        })
        setBlockShown(true);
    }
    const onClickFiltersIcon = () => onClickBlockIcon(BLOCK_FILTERS);
    const onClickRoadIcon = () => onClickBlockIcon(BLOCK_ROAD);
    const onClickMagnifierIcon = () => onClickBlockIcon(BLOCK_MAGNIFIER);


    const changeLayoutWithHistory = layout => {
        if (layout === LAYOUT_CABINET) {
            setActiveLayout(LAYOUT_FLOOR)
        }
        const versions = stateVersions.slice()
        versions.push({
            filtersBlockShown,
            roadBlockShown,
            magnifierBlockShown,
            activeFloor,
            activeCabinet,
            stateVersions
        });
        setStateVersions(versions)
        setActiveLayout(layout)
    };

    const changeFloorKeepingPoints = floor => {
        const hasNoPoints = !floor || !floor.points;
        const hadPoints = !!activeFloor && !!activeFloor.points && activeFloor.points.length > 0;
        if (hasNoPoints && hadPoints) {
            floor.points = activeFloor.points
        }
        setActiveFloor(floor)
    };

    const onClickBackButton = () => {
        const versions = stateVersions.slice();
        if (versions.length === 0) {
            return;
        }
        const prevVersion = versions[versions.length - 1];
        versions.pop();
        setActiveLayout(prevVersion.activeLayout)
    };

    const drawPath = points => changeFloorKeepingPoints({...activeFloor, points})
    const onToUp = () => !isLastFloor && loadFloor(activeFloor.id + 2, currentFilter)
    const onToDown = () => !isFirstFloor && loadFloor(activeFloor.id - 2, currentFilter);

    const renderLayout = () => {
        switch (activeLayout) {
            case LAYOUT_FLOOR:
                return <FloorLayout
                    id={activeFloor.id}
                    cabinets={activeFloor.cabinets}
                    points={activeFloor.points}
                    setActiveLayout={changeLayoutWithHistory}
                    setActiveFloor={changeFloorKeepingPoints}
                    setActiveCabinet={setActiveCabinet}
                />;
            case LAYOUT_CABINET:
                return <CabinetLayout
                    id={activeCabinet.id}
                    level={activeCabinet.level}
                    tables={activeCabinet.tables}
                    setActiveLayout={changeLayoutWithHistory}
                    setActiveFloor={changeFloorKeepingPoints}
                    setActiveCabinet={setActiveCabinet}
                />
            default:
                console.log("Unsupported layout");
        }
    };

    const hasNoHistory = stateVersions.length === 0;

    return (
        <div className="App">
            <div className="topPanel">
                <div className={"leftBlock " + (filtersBlockShown ? "filterShown bordered" : "")}>
                    <div onClick={onClickFiltersIcon}>
                        <img src={filterIcon}
                             className={"icon bordered " + (filtersBlockShown ? "iconSelected" : "")}
                             alt="filterIcon"/>
                    </div>
                    {filtersBlockShown &&
                    <FiltersBlock state={currentFilter} updateState={setCurrentFilter} applyFilters={filterCabinets}/>}
                </div>

                <div className={"rightBlock " + ((roadBlockShown || magnifierBlockShown) ? "rbShown bordered" : "")}>
                    <div className="rbTopPanel">
                        <div className="rbTitle">{roadBlockShown && <span>Route</span>}
                            {magnifierBlockShown && <span>Search</span>}
                        </div>
                        <div className="rbIcons">
                            <div onClick={onClickRoadIcon}>
                                <img src={routeIcon} className="icon bordered" alt="routeIcon"/>
                            </div>
                            <div onClick={onClickMagnifierIcon}>
                                <img src={magnifierIcon} className="icon bordered" alt="magnifierIcon"/>
                            </div>
                        </div>
                    </div>
                    {roadBlockShown && <RoadBlock drawPath={drawPath} setRoadBlockShown={setRoadBlockShown}/>}
                    {magnifierBlockShown &&
                    <SearchBlock setActiveLayout={changeLayoutWithHistory} setActiveCabinet={setActiveCabinet}/>}
                </div>
            </div>

            <div className="officeMap">
                <div className="omTopPanel">
                    <div className="floorSwitcher">
                        <div className={"toUp switcherBtn  " + (isLastFloor ? "buttonDisabled" : "")}
                             onClick={onToUp}>
                            ▲
                        </div>
                        <div className={"toDown switcherBtn  " + (isFirstFloor ? "buttonDisabled" : "")}
                             onClick={onToDown}>
                            ▼
                        </div>
                    </div>
                    <div className="floorTitle">
                        <span>
                            {"Floor" + activeFloor.id + ((activeLayout && activeCabinet.id !== 0)
                                ? "/Room " + activeCabinet.id
                                : "")}
                        </span>
                    </div>
                    <div className={"backButton " + (hasNoHistory ? "buttonDisabled" : "")}
                         onClick={onClickBackButton}>Back
                    </div>
                </div>
                <div className="svg">{renderLayout()}</div>
            </div>
        </div>
    );
}

export default App
