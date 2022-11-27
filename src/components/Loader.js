import React from 'react';
import {Box, Button, Container, Grid} from "@mui/material";

const Loader = () => {
	return (
		<Container>
			<Grid
				container
				style={{height: 'calc(100vh - 50px)'}}
				alignItems={'center'}
				justifyContent={'center'}
			>
				<Grid
					container
					alignItems={"center"}
					direction={"column"}
				>
					<div className="lds-ripple">
						<div></div>
						<div></div>
					</div>
				</Grid>
			</Grid>

		</Container>
	);
};

export default Loader;