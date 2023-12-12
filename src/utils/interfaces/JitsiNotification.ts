// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

type JitsiNotificationType = "normal" | "success" | "warning" | "error";

type JitsiNotificationTimeout = "short" | "medium" | "long" | "sticky";

interface JitsiNotification {
	title: string;
	description: string;
	type: JitsiNotificationType;
	timeout: JitsiNotificationTimeout;
}

export default JitsiNotification;
