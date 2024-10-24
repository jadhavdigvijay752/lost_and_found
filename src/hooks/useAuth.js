import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

/**
 * Custom React hook that provides authentication state and actions.
 *
 * @returns {Object} An object containing the current user, loading state, and logout function.
 * @returns {Object|null} return.user - The current authenticated user or null if not authenticated.
 * @returns {boolean} return.loading - A boolean indicating if the authentication state is still loading.
 * @returns {Function} return.logout - A function to log out the current user.
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const userData = userDoc.data();
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          role: userData?.role || 'user',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Logs out the current user.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return { user, loading, logout };
}
