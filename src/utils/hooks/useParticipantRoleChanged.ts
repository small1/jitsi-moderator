import { useEffect, useState } from "react";
import { JitsiEvents } from "../enums/JitsiEvents";
import IExtendedJitsiMeetExternalApi from "../interfaces/IExtendedJitsiMeetExternalApi";
import { Role } from "../interfaces/Participant";

interface IParticipantRoleChanged {
	id: string;
	role: Role;
}

const useParticipantRoleChanged = (
	api: IExtendedJitsiMeetExternalApi | undefined,
	userId?: string,
) => {
	const [newRole, setNewRole] = useState<Role | null>();

	useEffect(() => {
		const handleParticipantRoleChanged = (event: IParticipantRoleChanged) => {
			if (event.id === userId) {
				setNewRole(event.role);
			}
		};

		if (api) {
			api.addListener(
				JitsiEvents.PARTICIPANT_ROLE_CHANGED,
				handleParticipantRoleChanged,
			);
		}

		return () => {
			if (api) {
				api.addListener(
					JitsiEvents.PARTICIPANT_ROLE_CHANGED,
					handleParticipantRoleChanged,
				);
			}
		};
	}, [api, userId]);

	return newRole;
};

export default useParticipantRoleChanged;
