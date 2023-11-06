import { useTranslation } from "react-i18next";
import { JitsiCommands } from "../../../utils/enums/JitsiCommands";
import ButtonGrid from "../../buttons/ButtonGrid";
import { TitledCommandSection } from "./TitledCommandSection";
import { useContext } from "react";
import { executeCommand } from "../../../utils/api/JitsiApi";
import JitsiContext from "../../../context/jitsiContext";
import Button from "../../buttons/Button";

interface IJitsiCommandSection {
	disabled: boolean;
}

const JitsiCommandSection = ({ disabled }: IJitsiCommandSection) => {
	const { t } = useTranslation();
	const jitsiContext = useContext(JitsiContext);

	const renderCommandButton = (title: string, command: JitsiCommands) => (
		<Button
			buttonType="secondary"
			disabled={disabled}
			onClick={() => executeCommand(command, jitsiContext?.api)}
		>
			{title}
		</Button>
	);

	return (
		<TitledCommandSection
			disabled={disabled}
			title={t("jitsi-commands-section.title")}
			ingress={t("jitsi-commands-section.ingress")}
		>
			<ButtonGrid>
				{renderCommandButton(
					t("mute-everyone"),
					JitsiCommands.MUTE_EVERYONE
				)}
			</ButtonGrid>
		</TitledCommandSection>
	);
};

export default JitsiCommandSection;
