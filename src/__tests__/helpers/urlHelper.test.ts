import {
	createMeetingUrlFromJitsiMeetingInfo,
	getJitsiMeetingInfoFromUrlParams,
	getJitsiMeetingInfoFromUrlString,
	getParticipantUrlFromJitsiMeetingInfo,
} from "../../utils/helpers/urlHelper";

describe("urlHelper - getJitsiMeetingInfoFromUrlString", () => {
	test("should return domain string without https or http", () => {
		const url = "https://test.test/test";
		const result = getJitsiMeetingInfoFromUrlString(url);

		expect(result.domain.includes("http")).toBeFalsy();
	});

	test("should return roomname string", () => {
		const url = "https://test.test/test";
		const result = getJitsiMeetingInfoFromUrlString(url);

		expect(result.domain).toBe("test.test");
		expect(result.roomName).toBe("test");
	});

	test("should return roomname and domain strings for url with http or https", () => {
		const url = "test.test/test";
		const result = getJitsiMeetingInfoFromUrlString(url);

		expect(result.domain).toBe("test.test");
		expect(result.roomName).toBe("test");
	});

	test("should return domain and roomname string for very long and complicated domain", () => {
		const url =
			"https://jitsi.testingthis-testingagain-aklsdjlasd.hee.testinghere.net/ThisIsAnImportantMeeting";
		const result = getJitsiMeetingInfoFromUrlString(url);

		expect(result.domain).toBe(
			"jitsi.testingthis-testingagain-aklsdjlasd.hee.testinghere.net",
		);
		expect(result.roomName).toBe("ThisIsAnImportantMeeting");
	});

	it("should return empty string for URL without a room name", () => {
		const url = "https://test.test/";
		const result = getJitsiMeetingInfoFromUrlString(url);

		expect(result.domain).toBe("test.test");
		expect(result.roomName).toBe("");
	});

	test("should return empty object if url is not a correct url", () => {
		const url = "thisisarandomstringthatisinvalid";
		const result = getJitsiMeetingInfoFromUrlString(url);
		expect(result.domain).toBe("");
		expect(result.roomName).toBe("");
	});

	test("should return empty object if url is empty", () => {
		const url = "";
		const result = getJitsiMeetingInfoFromUrlString(url);
		expect(result.domain).toBe("");
		expect(result.roomName).toBe("");
	});
});

describe("urlHelper - getJitsiMeetingInfoFromUrlParams", () => {
	test("should return roomname and domain strings and ignore dns name", () => {
		const url = new URL(
			"https://test.test/meeting?domain=this.is.the.domain&roomName=thisUniqueIdentifier",
		);
		const result = getJitsiMeetingInfoFromUrlParams(url);

		expect(result.domain).toBe("this.is.the.domain");
		expect(result.roomName).toBe("thisUniqueIdentifier");
	});

	test("should return domain and roomname string for very long and complicated domain", () => {
		const url = new URL(
			"https://jitsi.testingthis-testingagain-aklsdjlasd.hee.testinghere.net/meeting?domain=this.is.the.domain&roomName=thisUniqueIdentifier",
		);
		const result = getJitsiMeetingInfoFromUrlParams(url);

		expect(result.domain).toBe("this.is.the.domain");
		expect(result.roomName).toBe("thisUniqueIdentifier");
	});

	test("should return empty object if params are empty", () => {
		const url = new URL("https://test.test");
		const result = getJitsiMeetingInfoFromUrlParams(url);
		expect(result.domain).toBe("");
		expect(result.roomName).toBe("");
	});

	test("should return empty object if params are invalid", () => {
		const url = new URL(
			"https://test.test/meeting?domian=this.is.invalid&roomNmae=thisInvalidIdentifier",
		);
		const result = getJitsiMeetingInfoFromUrlParams(url);
		expect(result.domain).toBe("");
		expect(result.roomName).toBe("");
	});
});

describe("urlHelper - createMeetingUrlFromJitsiMeetingInfo", () => {
	test("should generate a valid meeting URL", () => {
		const jitsiMeetingInfo = {
			domain: "test.test",
			roomName: "test-room",
		};

		const result = createMeetingUrlFromJitsiMeetingInfo(jitsiMeetingInfo);

		expect(result).toBe("/meeting?domain=test.test&roomName=test-room");
	});
});

describe("urlHelper - getParticipantUrlFromJitsiMeetingInfo", () => {
	test("should generate a valid participant URL", () => {
		const jitsiMeetingInfo = {
			domain: "test.test",
			roomName: "test-room",
		};

		const result = getParticipantUrlFromJitsiMeetingInfo(jitsiMeetingInfo);

		expect(result).toBe("test.test/test-room");
	});
});
