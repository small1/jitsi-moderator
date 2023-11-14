import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Theme from "../../utils/styles/Theme";
import Card from "../Card";
import FieldSet, { Legend } from "../FieldSet";
import Input from "../Input";
import { H1, Paragraph } from "../Typography";
import Button from "../buttons/Button";
import LabeledDivider from "../divider/LabeledDivider";
import DialogContent from "./DialogContent";
import DialogHeader from "./DialogHeader";
import { isDomainInConfigFile } from "../../utils/helpers/configHelper";

interface IJitsiMeetInputDialog {
	onJoinClick: (url: string) => void;
	onCreateMeetingClick: () => void;
}

const JitsiMeetInputDialog = ({
	onJoinClick,
	onCreateMeetingClick,
}: IJitsiMeetInputDialog) => {
	const { t } = useTranslation();
	const [jitsiInputUrl, setJitsiInputUrl] = useState<string>("");
	const [showCreateButton, setShowCreateButton] = useState<boolean>(false);

	useEffect(() => {
		const hasConfigDomain = async () => {
			const result = await isDomainInConfigFile();
			setShowCreateButton(result);
		};

		hasConfigDomain();
	}, []);

	return (
		<JitsiInputDialog $gutter="l">
			<DialogHeader>
				<H1 $color="white">Jitsi Moderator</H1>
				<Paragraph $color="white">
					{t("paste-in-url-or-create")}
				</Paragraph>
			</DialogHeader>
			<DialogContent>
				<JitsiMeetInputContainer>
					<Legend>{t("url-to-meeting")}</Legend>
					<MeetingInput
						aria-label={t("url-to-meeting")}
						placeholder={t("url-to-meeting")}
						value={jitsiInputUrl}
						onChange={({ currentTarget }) =>
							setJitsiInputUrl(currentTarget.value)
						}
					></MeetingInput>
					<Button
						$buttonType="primary"
						disabled={jitsiInputUrl.length === 0}
						onClick={() => onJoinClick(jitsiInputUrl)}
					>
						{t("join")}
					</Button>
				</JitsiMeetInputContainer>
				{showCreateButton && (
					<>
						<LabeledDivider label={t("or")} />
						<Button
							$buttonType="primary"
							$inflate
							onClick={() => onCreateMeetingClick()}
						>
							{t("create-new-meeting")}
						</Button>
					</>
				)}
			</DialogContent>
		</JitsiInputDialog>
	);
};

const JitsiInputDialog = styled(Card).attrs({
	as: "dialog",
})`
	display: flex;
	align-self: center;
	flex-direction: column;
	gap: ${Theme.spacing.l};
	height: fit-content;
	width: ${Theme.widths.dialog};
	padding: ${Theme.spacing.l};
`;

const MeetingInput = styled(Input)`
	flex: 1;
`;

const JitsiMeetInputContainer = styled(FieldSet)`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;

	height: 100%;
	gap: ${Theme.spacing.xs};
`;

export default JitsiMeetInputDialog;
