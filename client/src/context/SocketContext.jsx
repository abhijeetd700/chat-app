import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { currUser } = useContext(AuthContext)

	useEffect(() => {
		if (currUser) {
			const socket = io("http://localhost:8800",{
				query: {
					userId: currUser._id,
				}
            })

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [currUser]);

	return <SocketContext.Provider value={{ socket,onlineUsers }}>{children}</SocketContext.Provider>;
};