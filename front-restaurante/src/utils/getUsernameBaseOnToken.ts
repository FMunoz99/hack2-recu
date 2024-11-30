import { jwtDecode } from "jwt-decode";
import { useStorageState } from "@hooks/useStorageState";

interface DecodedToken {
	role:String;
	username:String;
	IssuedAt: Date;
	ExpiresAt:Date;
}

export function getUsernameBasedOnToken() {
	const [state, setSession] = useStorageState("token"); 

	if (!state[1]) throw new Error("Token not found");
	const decodedToken = jwtDecode<DecodedToken>(state[1]);
	return decodedToken.username;
}
