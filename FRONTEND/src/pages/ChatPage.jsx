import { useState,useEffect ,useRef} from "react";
import API from '../services/api.js'
import './ChatPage.css';

import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
function ChatPage(){
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState(null);
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const inputRef = useRef();
    const [name,setName]=useState("");
    const [searchRes,setSearchRes]=useState([])
useEffect(() => {
  console.log("📡 Fetching chats...");

  const fetchUsers = async () => {
    try {
      const res = await API.get('/chat');
      console.log("✅ Chats received:", res.data);
      
      if (res.data && res.data.payload) {
        setUsers(res.data.payload || []);
      } else {
        console.log("No chats found, setting empty array");
        setUsers([]);
      }
    } catch (err) {
      console.log("❌ Error fetching chats:", err.response?.status, err.message);
      if (err.response?.status === 401) {
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    }
  };
  
  fetchUsers();  // Call the fetch function
  
}, [navigate]);  // First useEffect ends here

// SECOND useEffect - Message polling (separate, not nested)
useEffect(() => {
  if (!selectedUser) return;

  const fetchMessages = async () => {
    try {
      const msgRes = await API.get(`/message/${selectedUser._id}`);
      setMessages(msgRes.data?.payload || []);
      console.log(msgRes.data?.payload)
    } catch (err) {
      console.log("Polling error:", err.message);
    }
  };

  fetchMessages(); // first time

  const interval = setInterval(() => {
    fetchMessages();
  }, 3000);

  return () => clearInterval(interval);

}, [selectedUser]);

   return (
    <div style={{display:"flex",height:"100vh"}}>

        {/* side bar */}
        <div style={{
          
    width: "30%",
    borderRight: "1px solid gray",
    display: "flex",
    flexDirection: "column",
    textAlign:"center",
    alignItems:"center",
    padding:"3%",
    rowGap:"1%",
    backgroundColor:"#f3d5b5",overflow:"auto",
  }}>      
            <h2 style={{fontSize:"35px"}}>chats</h2>
            <div className="searchDiv">
              <input  onChange={(e) => setName(e.target.value)} value={name}  style={{borderRadius:"30px",width:"80%",height:"40px",textAlign:"center",backgroundColor:"#500b7e",marginBottom:"20px" ,fontSize:"20px",}} placeholder="search" type="text" className="search"/>
            <button onClick={()=>handleSearch(name)}>🔍︎</button>
           
            </div>
             {
              searchRes && (
                <div className="top">
          {searchRes.map(r=>{
            return <button className="searchResult"  id={r._id} onClick={()=>handleSelectedUser(r)}>{r.name}</button>
          })

          }
        </div>

              )
            }
            {/* <button onClick={()=>handleSearch(name)}>"++"</button> */}
            { 
            
                users.map(user=>{
                  return (
  <div className="chatinfo">
    <button className="fuse" id={user._id} onClick={() => handleSelectedUser(user)}>
      <div className="profile">
        <img 
          src={user.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&size=55&background=random"} 
          alt={user.name}
        />
      </div>
      <div className="userinfo">
        <h2>{user.name}</h2>
        <p style={{color:"white"}} className="last-message">{user?.lastMessage || "Start a conversation..."}</p>
      </div>
      <div className="unread">
        {user.unreadCount > 0 && <span className="unread-badge">{user.unreadCount}</span>}
      </div>
    </button>
  </div>
)
            // return (
            //   <div className="chatinfo">
            //     <div className="profile">
            //       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMS9Cpso2gM219wKbVBPHBkiMH6bguV1BEN8SXXZ5dHtld2Id1oNaf5TU&s"/>
            //     </div>
            //     <div className="userinfo">
            //       <button class="fuse" id={user._id} onClick={()=>handleSelectedUser(user)}>
            //             <h2>{user.name}</h2>
                   
            //             <p>{user?.lastMessage || "hello"}</p>
            //        </button>
            //       </div>
            //       <div className="unread">

            //       </div>

                
            //     </div>
            // )
            // <button style={{borderRadius:"10px",width:"100%",height:"9%",textAlign:"center",backgroundColor:"#7ccee7",fontSize:"20px"}} id={user._id} onClick={()=>handleSelectedUser(user)}>{user.name}</button>
 })}
 
        </div>
       <div style={{ width: "70%", padding: "10px" ,backgroundColor:"#ffedd8"}}>
  <button style={{alignItems:"center",backgroundColor:"pink",textAlign:"center",width:"90%",height:"10%",fontSize:"30px",fontFamily:"-apple-system",borderRadius:"7px"}}>{selectedUser ? selectedUser.name : "Select a user"}</button>

  <div style={{ height: "70%", overflowY: "scroll" }}>
{
  selectedUser &&
  messages &&
  messages.map((msg) => {
    const isSender = msg.senderId === selectedUser._id;

    return (
      <div
        key={msg._id}
        style={{
          display: "flex",
          justifyContent: isSender ? "flex-start" : "flex-end",
          padding: "5px 20px"
        }}
      >
        <div
          style={{
            backgroundColor: isSender ? "#374151" : "#2563eb",
            color: "white",
            padding: "8px 12px",
            borderRadius: "12px",
            maxWidth: "60%",
            display: "inline-block"
          }}
        >
          <div>{msg.text}</div>

          <div
            style={{
              fontSize: "11px",
              marginTop: "4px",
              opacity: 0.8,
              textAlign: "right"
            }}
          >
            {new Date(msg.createdAt).toLocaleString("en-GB", {
              day: "numeric",
              month: "numeric",
              year: "2-digit",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    );
  })
}
  </div>
  

  {selectedUser && (
    <div>
      <input style={{width:"85%"}}
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type message..."
      />{selectedUser && (
    <button style={{background:"green"}} onClick={handleSendMessage}>
      ➤
    </button>
  )}
    </div>
  )}

  
</div>

        
    </div>

    
  
);



}
export default ChatPage;
