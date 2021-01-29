import {render, screen} from '@testing-library/react';
import {act} from "react-dom/test-utils";

import {Filter, FiltersBlock} from './FiltersBlock';

it("renders empty single filter", () => {
    act(() => {
        const {container} = render(<Filter/>);
        expect(container.textContent).toBe('');
    });
});

it("renders simple single filters", () => {
    const testSingleFilter = checked => {
        const labelText = 'Hello';
        const {container} = render(<Filter label={labelText} checked={checked} onChange={() => {
        }}/>);
        expectFilterToBeCorrect(container.firstChild, checked, labelText);
    }

    act(() => {
        testSingleFilter(true);
    });
    act(() => {
        testSingleFilter(false);
    });
});

it("renders empty filter block ", () => {
    let container = null
    act(() => {
        container = render(<FiltersBlock/>).container;
    });
    const filters = container.firstChild.childNodes;
    expect(filters).toBeDefined()
    expect(filters.length).toEqual(5)
    filters.forEach(expectFilterToBeUnchecked)
});

it("renders filter block", () => {
    const state = {coffeepoint: true, worker_room: true}
    act(() => {
        render(<FiltersBlock state={state}/>);
    });

    const expectFilter = (text, checked) => {
        const node = screen.getByText(text)
        expect(node.childNodes.length).toEqual(3)
        const checkbox = node.childNodes[1];
        if (checked) {
            expect(checkbox).toBeChecked()
        } else {
            expect(checkbox).not.toBeChecked()
        }
    }
    expectFilter('Coffee Point', true);
    expectFilter('Toilet', false);
    expectFilter('Worker Room', true);
    expectFilter('Meeting Room', false);
    expectFilter('Warehouse', false);
});

it("clicks on filter", () => {
    let clicked = false;
    const state = {coffeepoint: false};
    const updateState = () => clicked = true;

    act(() => {
        render(<FiltersBlock state={state} updateState={updateState}/>);
    });

    const node = screen.getByText('Coffee Point')
    expect(node.childNodes.length).toEqual(3)
    node.childNodes[1].click()

    expect(clicked).toEqual(true)
});

const expectFilterToBeCorrect = (filterNode, checked, labelText) => {
    expect(filterNode).toBeDefined();
    if (labelText !== undefined) {
        expect(filterNode.textContent).toBe(labelText);
    }

    const checkbox = filterNode.childNodes[1]
    expect(checkbox).toBeDefined()
    if (checked) {
        expect(checkbox).toBeChecked()
    } else {
        expect(checkbox).not.toBeChecked()
    }
}
const expectFilterToBeChecked = label => expectFilterToBeCorrect(label, true)
const expectFilterToBeUnchecked = label => expectFilterToBeCorrect(label, false)