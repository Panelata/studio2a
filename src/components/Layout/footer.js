import React from 'react';
import styles from './footer.module.css';
import Typography from '@mui/material/Typography';

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<Typography component='h1'>Group allocation system</Typography>
		</div>
	)
}

export default Footer;