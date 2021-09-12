import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';
import { steamTradeLinkRegex, steamUrlRegex } from '../stores/user/user.model';
import { userService } from '../stores/user/user.service';

const RegisterHandler = () => {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [steamUrl, setSteamUrl] = useState('');
    const [steamTradeLink, setSteamTradeLink] = useState('');
    const [acceptedLegal, setAcceptedLegal] = useState(false);

    const register = () => {
        if (
            !username ||
            !password ||
            !repeatPassword ||
            !displayName ||
            !email) {
            const notification = createNotification({
                content: 'Please fill out every required field',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (password !== repeatPassword) {
            const notification = createNotification({
                content: 'Passwords do not match',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (displayName.length > 20) {
            const notification = createNotification({
                content: 'Display name can\'t be longer than 20 characters',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (steamUrl.trim() &&
            !steamUrlRegex.test(steamUrl)) {
            const notification = createNotification({
                content: 'Invalid steam profile url',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (steamTradeLink.trim() &&
            !steamTradeLinkRegex.test(steamTradeLink)) {
            const notification = createNotification({
                content: 'Invalid steam trade link',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (!steamUrl.trim() && !steamTradeLink.trim()) {
            const notification = createNotification({
                content: 'Please provide either a steam profile link or trade link.',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (!acceptedLegal) {
            const notification = createNotification({
                content: 'Please agree to our Privacy Policy',
                duration: 5000,
                type: 'info'
            });
            notificationService.addNotification(notification);
            return;
        }

        userService.register({
            username,
            displayName,
            password,
            email,
            steamUrl: steamUrl.trim() ? steamUrl : undefined,
            steamTradeLink: steamTradeLink.trim() ? steamTradeLink : undefined
        }).subscribe(res => {
            if (res.ok) {
                router.push('/');
            }
        });
    };

    return {
        username,
        setUsername,
        displayName,
        setDisplayName,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        email,
        setEmail,
        steamUrl,
        setSteamUrl,
        steamTradeLink,
        setSteamTradeLink,
        acceptedLegal,
        setAcceptedLegal,
        register
    };
};

export default RegisterHandler;