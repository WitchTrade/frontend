import { useEffect, useState } from 'react';
import { createNotification } from '../stores/notification/notification.model';
import { notificationService } from '../stores/notification/notification.service';
import { createUser, discordTagRegex, steamTradeLinkRegex, steamUrlRegex, User } from '../stores/user/user.model';
import { userQuery } from '../stores/user/user.query';
import { userService } from '../stores/user/user.service';

const AccountSettingsHandler = () => {
    const [user, setUser] = useState<User>(createUser({}));

    const [editing, setEditing] = useState(false);

    const [formValue, setFormValue] = useState({
        displayName: '',
        email: '',
        steamUrl: '',
        steamTradeLink: '',
        steamAuth: false,
        discordTag: '',
        hidden: false
    });

    useEffect(() => {
        const userSub = userQuery.select().subscribe(setUser);

        return () => {
            userSub.unsubscribe();
        };

    }, []);

    const editAccountSettings = () => {
        setEditing(true);
        setFormValue({
            displayName: user.displayName,
            email: user.email,
            steamUrl: user.steamUrl ? user.steamUrl : '',
            steamTradeLink: user.steamTradeLink ? user.steamTradeLink : '',
            steamAuth: user.steamAuth ? user.steamAuth : false,
            discordTag: user.discordTag ? user.discordTag : '',
            hidden: user.hidden ? user.hidden : false
        });
    };

    const updateAccountSettings = () => {
        if (
            !formValue.displayName ||
            !formValue.email) {
            const notification = createNotification({
                content: 'Please fill out every required field',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (formValue.displayName.length > 20) {
            const notification = createNotification({
                content: 'Display name can\'t be longer than 20 characters',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (formValue.steamUrl.trim() &&
            !steamUrlRegex.test(formValue.steamUrl)) {
            const notification = createNotification({
                content: 'Invalid steam profile url',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (formValue.steamTradeLink.trim() &&
            !steamTradeLinkRegex.test(formValue.steamTradeLink)) {
            const notification = createNotification({
                content: 'Invalid steam trade link',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (!formValue.steamUrl.trim() && !formValue.steamTradeLink.trim()) {
            const notification = createNotification({
                content: 'Please provide either a steam profile link or trade link.',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        if (formValue.discordTag.trim() &&
            !discordTagRegex.test(formValue.discordTag)) {
            const notification = createNotification({
                content: 'Invalid Discord tag',
                duration: 5000,
                type: 'warning'
            });
            notificationService.addNotification(notification);
            return;
        }

        userService.updateAccountSettings({
            displayName: formValue.displayName,
            email: formValue.email,
            steamUrl: formValue.steamUrl.trim() ? formValue.steamUrl : undefined,
            steamTradeLink: formValue.steamTradeLink.trim() ? formValue.steamTradeLink : undefined,
            steamAuth: formValue.steamAuth,
            discordTag: formValue.discordTag.trim() ? formValue.discordTag : undefined,
            hidden: formValue.hidden
        }).subscribe((res) => {
            setEditing(false);
        });
    };

    const cancelEditAccountSettings = () => {
        setEditing(false);
    };

    return {
        user,
        formValue,
        setFormValue,
        editing,
        editAccountSettings,
        updateAccountSettings,
        cancelEditAccountSettings
    };
};

export default AccountSettingsHandler;