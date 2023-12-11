import {
	createJitsiMeetingInfoFromConfig,
	getRandomMeetingName,
	isDomainInConfigFile,
} from "../../utils/helpers/configHelper";
import { getDomainFromConfig } from "../../utils/helpers/configHelper";
import { vi } from "vitest";

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

describe("configHelper - getDomainFromConfig", () => {
	test("should return the default jitsi domain if config file does not exist", async () => {
		const data = { domain: null };
		const response = { json: vi.fn().mockResolvedValue(data) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await getDomainFromConfig();

		expect(result).toBe("meet.jit.si");
	});

	test("should return the default jitsi domain if fetch throws error", async () => {
		const error = new Error("");
		const response = { json: vi.fn().mockRejectedValue(error) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await getDomainFromConfig();

		expect(result).toBe("meet.jit.si");
	});

	test("should return the domain from config.json if file exists", async () => {
		const domain = "test.domain.com";
		const data = { domain };
		const response = { json: vi.fn().mockResolvedValue(data) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await getDomainFromConfig();

		expect(result).toBe(domain);
	});
});

describe("configHelper - isDomainInConfigFile", () => {
	test("should return false if file is does not exist", async () => {
		const data = { domain: null };
		const response = { json: vi.fn().mockResolvedValue(data) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await isDomainInConfigFile();

		expect(result).toBeFalsy();
	});

	test("should return false if fetch throws error", async () => {
		const error = new Error("");
		const response = { json: vi.fn().mockRejectedValue(error) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await isDomainInConfigFile();

		expect(result).toBeFalsy();
	});

	test("should return true if domain is in config file", async () => {
		const domain = "test.domain.com";
		const data = { domain };
		const response = { json: vi.fn().mockResolvedValue(data) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await isDomainInConfigFile();

		expect(result).toBeTruthy();
	});
});

describe("configHelper - createJitsiMeetingInfoFromConfig", () => {
	test("should return a JitsiMeetingInfo object", async () => {
		const domain = "test.domain.com";
		const data = { domain };
		const response = { json: vi.fn().mockResolvedValue(data) };
		global.fetch = vi.fn().mockResolvedValue(response);
		const result = await createJitsiMeetingInfoFromConfig();

		expect(result.domain).toBe(domain);
		expect(result.roomName.length).toBe(16);
	});
});
