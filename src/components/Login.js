import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../index";

const Login = () => {

	const {auth, provider, signInWithPopup} = useContext(Context);

	const login = async () => {
		const result = await signInWithPopup(auth, provider);
		const {user} = result;
	}

	return (
		<Container>
			<Grid
				container
				style={{height: 'calc(100vh - 50px)'}}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Grid
					style={{width:400, background:'lightgray'}}
					container
					alignItems={"center"}
					direction={"column"}
				>
					<Box p={5}>
						<Button onClick={login} variant={'outlined'}>Войти с помощью Google</Button>
					</Box>
				</Grid>
			</Grid>

		</Container>
	);
};

export default Login;