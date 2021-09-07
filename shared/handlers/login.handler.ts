import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { userService } from '../stores/user/user.service';

const LoginHandler = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [stayLoggedIn, setStayLoggedIn] = useState(false);

    const login = () => {
        if (!username || !password) {
            /*const notification = createNotification({
                content: 'Please fill out every field',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);*/
            return;
        }
        userService.login(username, password, stayLoggedIn).subscribe(res => {
            if (res.ok) {
                router.push('/');
            }
        });
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        stayLoggedIn,
        setStayLoggedIn,
        login
    };
};

export default LoginHandler;