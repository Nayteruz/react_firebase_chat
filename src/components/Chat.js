import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import { serverTimestamp, collection, query, orderBy, doc, setDoc  } from "firebase/firestore";

const Chat = () => {
	const {auth, firestore} = useContext(Context);
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const messagesRef = collection(firestore, 'messages');
	const [messages, loading] = useCollectionData(
		query(messagesRef, orderBy("createdAt"))
	)

	const sendMessage = async () => {
		if (value.trim().length > 0) {
			const newMessageRef = doc(collection(firestore, "messages"));
			const data = {
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL,
				text: value,
				createdAt: serverTimestamp(),
			}
			await setDoc(newMessageRef, data);
			setValue('');
		}
	}

	if (loading) {
		return <Loader/>
	}

	return (
		<Container>
			<Grid
				style={{height:'calc(100vh - 50px)', paddingTop:'10px', paddingBottom:'10px'}}
				display={'flex'}
				flexDirection={'column'}
				gap={1}
			>
				<div
					style={{
						border:'1px solid rgba(0,0,0,.23)',
						display:'flex',
						flexDirection:'column',
						padding:10,
						borderRadius:'5px',
						overflowY:'auto',
						flex:'1 1 auto',
						gap:'10px'
					}}

				>
					{messages.map((message, k) =>
						<div
							key={k}
							style={{
								border:user.uid === message.uid ? '2px solid green' : '2px dashed red',
								//marginLeft:user.uid === message.uid ? 'auto' : '10px',
								width: 'fit-content',
								padding:5,
								borderRadius:'5px'
							}}
							className={user.uid === message.uid ? 'user-message' : 'message'}
						>
							<Grid
								container
							>
								<Avatar src={message.photoURL} />
								<div>{message.displayName}</div>
							</Grid>
							<div>{message.text}</div>
						</div>
					)}
				</div>
				<Grid
					container
					alignItems={"stretch"}
					flexWrap={'nowrap'}
					height={70}
					gap={2}

				>
					<TextField
						style={{flex:'1 1 auto'}}
						maxRows={2}
						multiline
						value={value}
						onChange={e=>setValue(e.target.value)}
						placeholder={"Введите сообщение..."}
					/>
					<Button variant="contained" color="primary" style={{flex:'0 0 auto'}} onClick={sendMessage}>Отправить</Button>
				</Grid>
			</Grid>

		</Container>
	);
};

export default Chat;