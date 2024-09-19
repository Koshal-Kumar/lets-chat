import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        const userLoginInfo = JSON.parse(localStorage.getItem("userLoginInfo"));
        
        if(!userLoginInfo){
            navigate('/');
        }
        else{
            setUser(userLoginInfo);
        }
    }, []); 

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    );
};

const ChatState = () => useContext(ChatContext);

export { ChatProvider, ChatState };
