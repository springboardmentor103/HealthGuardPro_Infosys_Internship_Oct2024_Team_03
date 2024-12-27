export const getUserData = () => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (!userId || !username || !email) {
        throw new Error('User data missing. Please log in again.');
    }

    return { userId, username, email };
}; 