import styled from "styled-components";
import InfoCard from "./InfoCard";
import BreakoutRoom from "../../utils/interfaces/BreakoutRoom";
import { Paragraph } from "../Typography";
import { useTranslation } from "react-i18next";

interface IChatInfoCard {
	selectedBreakoutRooms: Array<BreakoutRoom>;
}

const ChatInfoCard = ({ selectedBreakoutRooms }: IChatInfoCard) => {
	const { t } = useTranslation();

	const getChatInfoText = () => {
		const roomsText = selectedBreakoutRooms
			.map((r) => r.name ?? t("main-room"))
			.join(", ");
		return roomsText + ".";
	};

	return (
		<StyledChatInfoCard $color="blue">
			<Info>
				<Paragraph $color="white">
					{t("message-will-be-sent-to", {
						rooms: getChatInfoText(),
					})}
				</Paragraph>
			</Info>
		</StyledChatInfoCard>
	);
};

const StyledChatInfoCard = styled(InfoCard)``;

const Info = styled.article``;

export default ChatInfoCard;
