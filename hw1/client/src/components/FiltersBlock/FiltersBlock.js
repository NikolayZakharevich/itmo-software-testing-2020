import React from "react"
import "./FiltersBlock.scss"

export const Filter = ({label, checked, onChange}) => {
    return (
        <label className="FiltersBlock__container">{label}
            <input id="coffee" type="checkbox"
                   checked={checked} onChange={onChange}/>
            <span className="FiltersBlock__checkmark"/>
        </label>
    )
}

export const FiltersBlock = ({state, updateState, applyFilters}) => {
    state = state || {}
    applyFilters = applyFilters || (() => {})

    const {coffeepoint, bathroom, worker_room, meeting_room, warehouse} = state

    const setupFilter = async filter => {
        if (filter in state) {
            const newState = {...state, [filter]: !state[filter]}
            updateState(newState)
            applyFilters(newState)
        }
    }

    const setupCoffeepointFilter = () => setupFilter('coffeepoint');
    const setupBathroomFilter = () => setupFilter('bathroom');
    const setupWorkerRoomFilter = () => setupFilter('worker_room');
    const setupMeetingRoomFilter = () => setupFilter('meeting_room');
    const setupWarehouseFilter = () => setupFilter('warehouse');

    return (
        <div>
            <Filter label={'Coffee Point'} checked={coffeepoint} onChange={setupCoffeepointFilter}/>
            <Filter label={'Toilet'} checked={bathroom} onChange={setupBathroomFilter}/>
            <Filter label={'Worker Room'} checked={worker_room} onChange={setupWorkerRoomFilter}/>
            <Filter label={'Meeting Room'} checked={meeting_room} onChange={setupMeetingRoomFilter}/>
            <Filter label={'Warehouse'} checked={warehouse} onChange={setupWarehouseFilter}/>
        </div>
    )
}

export default FiltersBlock