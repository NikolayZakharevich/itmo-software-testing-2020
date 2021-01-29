import {needToCopyPrevFloorPoints} from "./MainPage";


it('correctly identifies when you need to copy point', () => {
    const floorWithoutPoints = {}
    const floorWithIncorrectPoints = {points: {}}
    const floorWithZeroPoints = {points: []}
    const floorWithPoints = {points: [{pointX: 10, pointY: 10}]}

    const expectNeedTo = result =>
        (prevFloor, newFloor) => expect(needToCopyPrevFloorPoints(prevFloor, newFloor)).toEqual(result)
    const expectTrue = expectNeedTo(true)
    const expectFalse = expectNeedTo(false)

    expectTrue(floorWithPoints, floorWithoutPoints);
    expectTrue(floorWithPoints, floorWithIncorrectPoints);
    expectFalse(floorWithPoints, floorWithZeroPoints);
    expectFalse(floorWithPoints, floorWithPoints);

    expectFalse(floorWithIncorrectPoints, floorWithZeroPoints);
    expectFalse(floorWithIncorrectPoints, floorWithIncorrectPoints);
    expectFalse(floorWithIncorrectPoints, floorWithoutPoints);
    expectFalse(floorWithIncorrectPoints, floorWithPoints);

    expectFalse(floorWithZeroPoints, floorWithZeroPoints);
    expectFalse(floorWithZeroPoints, floorWithIncorrectPoints);
    expectFalse(floorWithZeroPoints, floorWithoutPoints);
    expectFalse(floorWithZeroPoints, floorWithPoints);

    expectFalse(floorWithoutPoints, floorWithZeroPoints);
    expectFalse(floorWithoutPoints, floorWithIncorrectPoints);
    expectFalse(floorWithoutPoints, floorWithoutPoints);
    expectFalse(floorWithoutPoints, floorWithPoints);
})