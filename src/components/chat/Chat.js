import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./chat.css"
import moment from 'moment'
export const Chat = () => {
    const { matchId } = useParams()
    const [selectedMatch, setSelectedMatch] = useState({})
    const [user1, setUser1] = useState({})
    const [user2, setUser2] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [messages, setMessages] = useState([])
    const [entireConvo, setEntireConvo] = useState([])
    const [sortedMessages, setSortedMessages] = useState([])
    const [filteredMessages1, setFilteredMessages1] = useState([])
    const [filteredMessages2, setFilteredMessages2] = useState([])
    const [letter, setLetter] = useState({
        letterContent: '',
        date: new Date().toISOString()
    })

    const localSleeperUser = localStorage.getItem("sleeper_user")
    const sleeperUserObject = JSON.parse(localSleeperUser)

    useEffect(() => {
        const fetchUser1 = fetch(`http://localhost:8088/users?id=${sleeperUserObject.id}&_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference&_expand=snore`)
            .then(res => {
                return res.json()
            })

        const fetchMatch = fetch(`http://localhost:8088/users?id=${matchId}&_expand=sleepDepth&_expand=bedTime&_expand=temperature&_expand=wakingTime&_expand=sleepNoise&_expand=mattressType&_expand=sleepPosition&_expand=genderMatchPreference&_expand=snore`)
            .then(res => res.json())

        Promise.all([fetchUser1, fetchMatch]).then((res) => {
            setUser1(res[0][0])
            setUser2(res[1][0])
        })
    }, [])

    //sets the match id
    useEffect(() => {
        fetch(`http://localhost:8088/matches/${matchId}`)
            .then(res => res.json())
            .then((res) => {
                setSelectedMatch(res)
            })
    }, [matchId])

    //fetches all messages
    useEffect(() => {
        fetch(`http://localhost:8088/messages`)
            .then(res => res.json())
            .then((res) => {
                setMessages(res)
            })
    }, [])

    //fetches both user's messages, separately. 
    useEffect(() => {
        const myMatchConvo = messages.filter(message => message.user1Id === user1.id && message.user2Id === user2.id)
        setFilteredMessages1(myMatchConvo)
    }, [messages, user1, user2])

    useEffect(() => {
        const myMatchConvo = messages.filter(message => message.user1Id === user2.id && message.user2Id === user1.id)
        setFilteredMessages2(myMatchConvo)
    }, [messages, user1, user2])

    //combine messages from both users. Maybe make the date filtering happen here? 
    useEffect(() => {
        const fullConvo = []
        fullConvo.push(filteredMessages1)
        fullConvo.push(filteredMessages2)
        const wholeConvo = [].concat(...fullConvo)
        setEntireConvo(wholeConvo)
    }, [filteredMessages1, filteredMessages2])

    //sorts the messages by date
    useEffect(() => {
        const convo = [...entireConvo]
        console.log('before', convo)
        convo.sort((a, b) => {
            return moment(a.date).diff(b.date);
        });
        console.log('after', convo)
        setSortedMessages(convo)
    }, [entireConvo])

    //sends new message to the database.
    const handleSend = () => {
        const messageToSendApi = {
            user1Id: user1.id,
            user2Id: user2.id,
            letterContent: letter.letterContent,
            date: letter.date
        }
        if (messageToSendApi.letterContent !== '') {
            fetch('http://localhost:8088/messages', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    messageToSendApi
                )
            })
                .then(() => {
                    alert('Your message has been sent!')
                })
        }
    }
    console.log(sortedMessages)
    //figure out how to display user1 & 2's name and/or picture next to message.
    return (<div className="letterBody">

        <h2>Chat with {user2 ? user2?.fullName : 'Match'}</h2>
        <div className="conversation">
            {sortedMessages.map((message) => {
                const isUser1Sender = message.user1Id === user1.id
                const isUser2Sender = message.user1Id === user2.id
                if ((isUser1Sender && message.user2Id === user2.id) || (isUser2Sender && message.user2Id === user1.id)) {
                    const sender = isUser1Sender ? user1 : user2
                    const receiver = isUser1Sender ? user2 : user1
                    return (
                        <div key={message.id} className="message"><img src={sender.image} className="messageImage"></img> &nbsp; &nbsp; <h3 className="letterContent">&nbsp;{message.letterContent}</h3></div>
                    )
                }
            })}
        </div>
        <form>
            <div className="typeSend">
                <input
                    type="text"
                    className="messageInput"
                    placeholder="Type your message here"
                    onChange={
                        (event) => {
                            const copy = { ...letter }
                            copy.letterContent = event.target.value
                            setLetter(copy)
                        }
                    } />
                <button
                    className="sendButton"
                    onClick={(clickEvent) => handleSend(clickEvent)}>
                    Send
                </button>
            </div>
        </form>
    </div>
    )
}