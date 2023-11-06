import styled from "styled-components";
import Card from "../Card";
import JitsiCommandSection from "./sections/JitsiCommandsSection";
import BreakoutRoomsSection from "./sections/breakout-rooms/BreakoutRoomsSection";
import ChatSection from "./sections/ChatSection";
import WarningInfoCard from "../info-cards/WarningInfoCard";
import { useTranslation } from "react-i18next";
import Theme from "../../utils/styles/Theme";
import InviteSection from "./sections/InviteSection";

interface ISidePanel {
	isUserModerator: boolean;
}

const SidePanel = ({ isUserModerator }: ISidePanel) => {
	const { t } = useTranslation();

	return (
		<SidePanelCard gutter="m">
			<SidePanelList>
				<>
					{!isUserModerator && (
						<WarningInfoCard
							title={t("you-are-not-moderator")}
							warning={t("you-need-to-have-moderator-role")}
						/>
					)}
					<InviteSection />
					<JitsiCommandSection disabled={!isUserModerator} />
					<BreakoutRoomsSection disabled={!isUserModerator} />
					<ChatSection disabled={false} />
				</>
			</SidePanelList>
		</SidePanelCard>
	);
};

const SidePanelCard = styled(Card)`
	width: 100%;
	overflow-y: scroll;
	box-sizing: border-box;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

const SidePanelList = styled.article`
	display: flex;
	flex-direction: column;
	gap: ${Theme.spacing.l};
	height: 100%;
`;

export default SidePanel;
