import { getRandomMeetingName } from "../../utils/helpers/configHelper";

describe("configHelper - getRandomMeetingName", () => {
	test("created meeting name should have the specified length", () => {
		const result = getRandomMeetingName(16);

		expect(result.length).toBe(16);
	});

	test("created meeting name should only contain alpha numericals", () => {
		const result = getRandomMeetingName(16);

		const regex = /^[a-zA-Z0-9]*$/;
		const isAlphaNumerical = regex.test(result);
		expect(isAlphaNumerical).toBe(true);
	});
});
