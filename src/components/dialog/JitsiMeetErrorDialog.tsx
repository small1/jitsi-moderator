import styled from "styled-components";
import Theme from "../../utils/styles/Theme";
import Card from "../Card";
import { H2, Paragraph } from "../Typography";
import Button from "../buttons/Button";
import DialogHeader from "./DialogHeader";
import { useTranslation } from "react-i18next";

interface IJitsiMeetErrorDialog {
	onGoBackToStartClick: () => void;
}

const JitsiMeetErrorDialog = ({
	onGoBackToStartClick,
}: IJitsiMeetErrorDialog) => {
	const { t } = useTranslation();

	return (
		<JitsiErrorDialog gutter="l">
			<DialogHeader>
				<H2 color="white">{t("meeting-not-found")}</H2>
				<Paragraph color="white">
					{t("meeting-does-not-exist")}
				</Paragraph>
			</DialogHeader>
			<Button
				buttonType="secondary"
				onClick={onGoBackToStartClick}
				inflate={true}
			>
				{t("go-back-to-start")}
			</Button>
		</JitsiErrorDialog>
	);
};

const JitsiErrorDialog = styled(Card)`
	display: flex;
	flex-direction: column;
	align-self: center;
	justify-self: center;
	gap: ${Theme.spacing.l};
	height: fit-content;
	width: ${Theme.widths.dialog};
`;

export default JitsiMeetErrorDialog;
