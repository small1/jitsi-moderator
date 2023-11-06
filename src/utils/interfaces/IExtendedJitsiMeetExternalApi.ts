// We create this extended interface because
// the IJitsiMeetExternalApi interface used in Jitsi's React SDK does not include getRoomsInfo()

import { IJitsiMeetExternalApi } from "@jitsi/react-sdk/lib/types";
import RoomsInfo from "./RoomsInfo";
import { BreakoutRooms } from "./BreakoutRoom";

interface IExtendedJitsiMeetExternalApi extends IJitsiMeetExternalApi {
	getRoomsInfo: () => Promise<RoomsInfo>;
	listBreakoutRooms: () => Promise<BreakoutRooms>;
}

export default IExtendedJitsiMeetExternalApi;
