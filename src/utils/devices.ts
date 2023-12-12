// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

type SizesType =
	| "mobileS"
	| "mobileM"
	| "mobileL"
	| "tablet"
	| "laptop"
	| "laptopM"
	| "laptopL"
	| "desktop";

export enum DeviceSizes {
	MOBILE = 768,
	TABLET = 1024,
}

const sizes: Record<SizesType, string> = {
	mobileS: "320px",
	mobileM: "375px",
	mobileL: "425px",
	tablet: "768px",
	laptop: "1024px",
	laptopM: "1280px",
	laptopL: "1440px",
	desktop: "2560px",
};

const devices: Record<SizesType, string> = {
	mobileS: `(min-width: ${sizes.mobileS})`,
	mobileM: `(min-width: ${sizes.mobileM})`,
	mobileL: `(min-width: ${sizes.mobileL})`,
	tablet: `(min-width: ${sizes.tablet})`,
	laptop: `(min-width: ${sizes.laptop})`,
	laptopM: `(min-width: ${sizes.laptopM})`,
	laptopL: `(min-width: ${sizes.laptopL})`,
	desktop: `(min-width: ${sizes.desktop})`,
};

export default devices;
