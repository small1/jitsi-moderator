// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: Apache-2.0

import Button from "../../buttons/Button";
import ButtonGrid from "../../buttons/ButtonGrid";
import { TitledCommandSection } from "./TitledCommandSection";
import {
	getJitsiMeetingInfoFromUrlParams,
	getParticipantUrlFromJitsiMeetingInfo,
} from "../../../utils/helpers/urlHelper";
import { useTranslation } from "react-i18next";
import JitsiContext from "../../../context/jitsiContext";
import { useContext } from "react";
import { Role } from "../../../utils/interfaces/Participant";
import JitsiNotification from "../../../utils/interfaces/JitsiNotification";
import { showNotification } from "../../../utils/api/JitsiApi";

const InviteSection = () => {
	const jitsiContext = useContext(JitsiContext);
	const { t } = useTranslation();

	const getNotificationForRole = (roleToInvite: Role): JitsiNotification => ({
		title: t(`${roleToInvite}-toast.title`),
		description: t(`${roleToInvite}-toast.description`),
		type: "success",
		timeout: "medium",
	});

	const copyParticipantLink = async () => {
		const url = new URL(window.location.href);
		const jitsiMeetingInfo = getJitsiMeetingInfoFromUrlParams(url);
		const participantLink =
			getParticipantUrlFromJitsiMeetingInfo(jitsiMeetingInfo);

		navigator.clipboard.writeText(participantLink);
		showNotification(
			getNotificationForRole("participant"),
			jitsiContext?.api
		);
	};

	const copyModeratorLink = () => {
		navigator.clipboard.writeText(window.location.href);
		showNotification(
			getNotificationForRole("moderator"),
			jitsiContext?.api
		);
	};

	return (
		<TitledCommandSection
			title={t("invite-section.title")}
			ingress={t("invite-section.ingress")}
		>
			<ButtonGrid>
				<Button $buttonType="secondary" onClick={copyParticipantLink}>
					{t("copy-participant-link")}
				</Button>
				<Button $buttonType="secondary" onClick={copyModeratorLink}>
					{t("copy-moderator-link")}
				</Button>
			</ButtonGrid>
		</TitledCommandSection>
	);
};

export default InviteSection;
