import { sum } from "../src/components/sum";

test("This sum function should return the sum of the 2 numbers", () => {
    const result = sum(3,4);
    //Assertion
    expect(result).toBe(7);
})