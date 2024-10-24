import React, { useState } from 'react';
import {
	TextField,
	Button,
	Box,
	InputAdornment,
	MenuItem,
} from '@mui/material';
import { Email, Lock, Person, School } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import styles from '../../styles/login.module.css';

/**
 * RegistrationComponent is a React component that renders a registration form.
 * It allows users to enter their full name, email, password, and select a school to register.
 *
 * @component
 * @returns {JSX.Element} The rendered registration component.
 */
function RegistrationComponent() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [school, setSchool] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	/**
	 * Handles the form submission for registration.
	 *
	 * @async
	 * @function
	 * @param {Event} e - The form submission event.
	 * @returns {Promise<void>}
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(userCredential.user, {
				displayName: fullName,
				// You can add the school to the user profile if needed
				// photoURL: JSON.stringify({ school: school })
			});
			console.log('Registration successful', userCredential.user);
			navigate('/app');
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const schools = ['School A', 'School B', 'School C', 'School D'];

	return (
		<div
			className={`${styles.loginContainer} bg-[#e7e2ff] min-h-screen w-screen px-[20%] py-[5%]`}
		>
			<div
				className={`${styles.loginBox} overflow-hidden flex justify-center w-full bg-white rounded-3xl`}
			>
				<div className={`${styles.loginLeft} w-[50%] text-center p-10`}>
					<h1 className="font-poppins font-bold text-3xl leading-[45px] uppercase text-black">
						Register
					</h1>
					<p className="font-poppins font-normal text-base leading-6 text-[#525252] mb-8">
						Create your account to get started
					</p>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{
							mt: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '100%',
							maxWidth: '320px',
							margin: '0 auto',
						}}
					>
						<TextField
							variant="filled"
							margin="normal"
							required
							fullWidth
							id="fullName"
							placeholder="Full Name"
							name="fullName"
							autoComplete="name"
							autoFocus
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Person />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiInputBase-root': {
									backgroundColor: 'rgba(240, 237, 255, 0.8)',
									borderRadius: '15px',
									border: 'none',
									color: 'black',
									fontSize: '14px',
									'& fieldset': { border: 'none' },
									'&::before': { content: 'none' },
									'&::after': { content: 'none' },
									'& input::placeholder': {
										color: 'black',
										opacity: 1,
										fontSize: '14px',
									},
								},
							}}
						/>
						<TextField
							variant="filled"
							margin="normal"
							required
							fullWidth
							id="email"
							placeholder="Email Address"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Email />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiInputBase-root': {
									backgroundColor: 'rgba(240, 237, 255, 0.8)',
									borderRadius: '15px',
									border: 'none',
									color: 'black',
									fontSize: '14px',
									'& fieldset': { border: 'none' },
									'&::before': { content: 'none' },
									'&::after': { content: 'none' },
									'& input::placeholder': {
										color: 'black',
										opacity: 1,
										fontSize: '14px',
									},
								},
							}}
						/>
						<TextField
							variant="filled"
							margin="normal"
							required
							fullWidth
							name="password"
							placeholder="Password"
							type="password"
							id="password"
							autoComplete="new-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Lock />
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiInputBase-root': {
									backgroundColor: 'rgba(240, 237, 255, 0.8)',
									borderRadius: '15px',
									border: 'none',
									color: 'black',
									fontSize: '14px',
									'& fieldset': { border: 'none' },
									'&::before': { content: 'none' },
									'&::after': { content: 'none' },
									'& input::placeholder': {
										color: 'black',
										opacity: 1,
										fontSize: '14px',
									},
								},
							}}
						/>
						<TextField
							select
							variant="filled"
							margin="normal"
							required
							fullWidth
							id="school"
							name="school"
							value={school}
							onChange={(e) => setSchool(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<School />
									</InputAdornment>
								),
							}}
							SelectProps={{
								displayEmpty: true,
								renderValue: (value) =>
									value || 'Select School',
							}}
							sx={{
								'& .MuiInputBase-root': {
									backgroundColor: 'rgba(240, 237, 255, 0.8)',
									borderRadius: '15px',
									border: 'none',
									color: 'black',
									fontSize: '14px',
									'& fieldset': { border: 'none' },
									'&::before': { content: 'none' },
									'&::after': { content: 'none' },
								},
								'& .MuiSelect-select.MuiSelect-filled.MuiInputBase-input.MuiFilledInput-input':
									{
										textAlign: 'left', // Align text to the left
										paddingTop: '16px',
										paddingBottom: '12px',
									},
								'& .MuiInputAdornment-root': {
									marginRight: '8px', // Adjust spacing between icon and text
								},
							}}
						>
							<MenuItem value="" disabled>
								Select School
							</MenuItem>
							{schools.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</TextField>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							disabled={loading}
							sx={{
								mt: 3,
								mb: 2,
								width: '110px',
								height: '45px',
								background:
									'linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)',
								boxShadow: '0px 8px 21px rgba(0, 0, 0, 0.16)',
								borderRadius: '16px',
								fontSize: '0.75rem',
								fontWeight: 'bold',
								textTransform: 'none',
								'&:hover': {
									background:
										'linear-gradient(99.78deg, #9181F4 -5.85%, #5038ED 109.55%)',
									opacity: 0.9,
								},
							}}
						>
							{loading ? 'Registering...' : 'Register'}
						</Button>

						{error && <p className="text-red-500 mt-2">{error}</p>}
					</Box>

					<p className="font-poppins font-normal text-base leading-6 text-[#525252] mt-4">
						Already have an account?{' '}
						<Link to="/" className="text-[#5038ED] font-bold">
							Login
						</Link>
					</p>
				</div>
				<div className="w-[50%]">
					<img
						className="w-[100%] h-[100%] object-cover z-0"
						src={'/assets/login/login-right-bg.svg'}
					/>
					<div className={styles.loginRightSectionBg}></div>
					<img
						width={300}
						className="z-0 absolute top-[35%] right-[25%] rounded-3xl"
						src={'/assets/login/login-right-bg2.svg'}
					/>
				</div>
			</div>
		</div>
	);
}

export default RegistrationComponent;
