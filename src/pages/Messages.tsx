import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Phone, MoreVertical, Paperclip, Smile, Send, FileText, Download, Shield, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  date: string;
  attachment?: { name: string; size: string };
}

interface Conversation {
  id: string;
  name: string;
  initials: string;
  lastMessage: string;
  time: string;
  online?: boolean;
  property?: string;
  unread?: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "John Landlord",
    initials: "JL",
    lastMessage: "I've sent the lease agreement for y...",
    time: "2m ago",
    online: true,
    property: "Oakwood Residences",
    unread: 2,
  },
  {
    id: "2",
    name: "Sarah Smith",
    initials: "SS",
    lastMessage: "The viewing is scheduled for tomo...",
    time: "1h ago",
    property: "Downtown Dorms",
  },
  {
    id: "3",
    name: "Uni Housing Office",
    initials: "UH",
    lastMessage: "New document uploaded",
    time: "Yesterday",
  },
  {
    id: "4",
    name: "Mike Property Mgr",
    initials: "MP",
    lastMessage: "Your maintenance request has bee...",
    time: "2d ago",
    property: "Campus View Apartments",
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "other",
      text: "Hi there! I've just updated the contract details for Oakwood Room 204. Can you take a look when you have a moment?",
      time: "4:15 PM",
      date: "YESTERDAY",
    },
    {
      id: "m2",
      senderId: "me",
      text: "Sure thing, John. I'll review it right now. Do I need to upload my student ID again?",
      time: "4:18 PM",
      date: "YESTERDAY",
    },
    {
      id: "m3",
      senderId: "other",
      text: "Yes please, just to keep the file complete. I've attached the lease PDF below for you to sign.",
      time: "10:02 AM",
      date: "TODAY",
      attachment: { name: "Lease_Agreement_Room_204.pdf", size: "2.4 MB" },
    },
  ],
  "2": [
    {
      id: "m4",
      senderId: "other",
      text: "Hi! The viewing for Downtown Dorms is scheduled for tomorrow at 3 PM. Does that work for you?",
      time: "2:30 PM",
      date: "TODAY",
    },
  ],
  "3": [
    {
      id: "m5",
      senderId: "other",
      text: "A new document has been uploaded to your housing file. Please review it at your earliest convenience.",
      time: "11:00 AM",
      date: "YESTERDAY",
    },
  ],
  "4": [
    {
      id: "m6",
      senderId: "other",
      text: "Your maintenance request has been received and assigned to our team. We'll update you within 48 hours.",
      time: "9:15 AM",
      date: "2 DAYS AGO",
    },
  ],
};

const Messages = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [conversations] = useState(mockConversations);
  const [allMessages, setAllMessages] = useState(mockMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find((c) => c.id === selectedChat);
  const currentMessages = allMessages[selectedChat] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: "TODAY",
    };
    setAllMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    setMessageInput("");
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-muted-foreground">Please sign in to access messages.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Messages</h2>
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
              5 New
            </Badge>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedChat(conv.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50",
                selectedChat === conv.id && "bg-primary/5 border-l-2 border-l-primary"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {conv.initials}
                  </AvatarFallback>
                </Avatar>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm truncate">{conv.name}</span>
                  <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
              </div>
              {conv.unread && (
                <Badge className="bg-primary text-primary-foreground text-[10px] h-5 w-5 rounded-full p-0 flex items-center justify-center shrink-0">
                  {conv.unread}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        {selectedConversation && (
          <div className="flex items-center justify-between px-6 py-3 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted font-medium">
                  {selectedConversation.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{selectedConversation.name}</h3>
                <div className="flex items-center gap-2 text-xs">
                  {selectedConversation.online && (
                    <span className="text-emerald-500 font-medium">Online</span>
                  )}
                  {selectedConversation.property && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-primary">{selectedConversation.property}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input placeholder="Search in chat" className="pl-8 h-8 w-40 text-xs" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {currentMessages.map((msg, idx) => {
            const showDate =
              idx === 0 || currentMessages[idx - 1]?.date !== msg.date;
            const isMe = msg.senderId === "me";

            return (
              <div key={msg.id}>
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {msg.date}
                    </span>
                  </div>
                )}
                <div className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[70%] space-y-1", isMe ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm",
                        isMe
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      )}
                    >
                      <p>{msg.text}</p>
                      {msg.attachment && (
                        <div className="mt-3 flex items-center gap-3 bg-background/80 rounded-lg p-3">
                          <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                            <FileText className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-xs font-medium truncate", isMe ? "text-primary-foreground" : "text-foreground")}>
                              {msg.attachment.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">{msg.attachment.size}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className={cn("flex items-center gap-1 px-1", isMe && "justify-end")}>
                      {!isMe && (
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[8px] bg-muted">
                            {selectedConversation?.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      {isMe && <span className="text-[10px] text-primary">✓✓</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t px-6 py-3 space-y-2">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              size="icon"
              className="h-9 w-9 rounded-full shrink-0"
              onClick={handleSend}
              disabled={!messageInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>End-to-end encrypted messaging</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                <FileText className="h-3 w-3" />
                REQUEST CONTRACT
              </button>
              <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Send className="h-3 w-3" />
                SEND PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
