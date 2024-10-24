import { useMutation } from '@tanstack/react-query';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const googleProvider = new GoogleAuthProvider();

/**
 * Custom React hook that provides a mutation for logging in users.
 * Supports both email/password and Google sign-in methods.
 *
 * @returns {Object} An object containing the login mutation.
 * @returns {Function} return.mutate - Function to trigger the login mutation.
 */
const useLoginMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		/**
		 * Mutation function to log in a user.
		 *
		 * @param {Object} params - The login parameters.
		 * @param {string} params.email - The user's email address.
		 * @param {string} params.password - The user's password.
		 * @param {boolean} params.isGoogleSignIn - Flag indicating if Google sign-in should be used.
		 * @returns {Promise<Object>} A promise that resolves to the user credential object.
		 */
		mutationFn: ({ email, password, isGoogleSignIn }) => {
			if (isGoogleSignIn) {
				return signInWithPopup(auth, googleProvider);
			}
			return signInWithEmailAndPassword(auth, email, password);
		},
		/**
		 * Success callback for the login mutation.
		 *
		 * @param {Object} userCredential - The user credential object returned on successful login.
		 */
		onSuccess: (userCredential) => {
			console.log('Login successful', userCredential.user);
			if (userCredential?.user?.email === 'admin@gmail.com') {
				return navigate('/dashboard');
			} else {
				navigate('/app');
			}
			// You can add global success handling here if needed
		},
		/**
		 * Error callback for the login mutation.
		 *
		 * @param {Object} error - The error object returned on failed login.
		 */
		onError: (error) => {
			console.error('Login failed', error.message);
			// You can add global error handling here if needed
		},
	});
};

export default useLoginMutation;
