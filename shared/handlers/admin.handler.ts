import { useEffect, useState } from 'react';
import useUserProvider from '../providers/user.provider';
import { adminService } from '../stores/admin/admin.service';
import { AdminLog, AdminUser } from '../stores/admin/admin.model';
import { adminQuery } from '../stores/admin/admin.query';
import { Badge } from '../stores/user/badge.model';
import { Role } from '../stores/user/role.model';
import { Subscription } from 'rxjs';

const AdminHandler = () => {
  const { user } = useUserProvider();

  const [playerSearchString, setPlayerSearchString] = useState('');

  const [unfilteredAdminUsers, setUnfilteredAdminUsers] = useState<AdminUser[]>([]);

  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const [badges, setBadges] = useState<Badge[]>([]);

  const [roles, setRoles] = useState<Role[]>([]);

  const [logs, setLogs] = useState<AdminLog[]>([]);

  useEffect(() => {
    adminQuery.selectAll().subscribe((adminUsers) => {
      setUnfilteredAdminUsers(adminUsers);
    });
  }, []);

  useEffect(() => {
    let badgeSub: Subscription;
    let roleSub: Subscription;
    let logSub: Subscription;
    let userSub: Subscription;
    if (user.roles?.length > 0) {
      badgeSub = adminService.fetchBadges().subscribe(async (res) => {
        const badges = await res.json();
        setBadges(badges);
      });
      roleSub = adminService.fetchRoles().subscribe(async (res) => {
        const roles = await res.json();
        setRoles(roles);
      });
      logSub = adminService.fetchLog().subscribe(async (res) => {
        const logs: AdminLog[] = await res.json();
        logs.sort((a, b) => {
          const aTime = new Date(a.timestamp).getTime();
          const bTime = new Date(b.timestamp).getTime();
          return bTime - aTime;
        });
        setLogs(logs);
      });
      userSub = adminService.fetchUsers().subscribe();
    }
    return () => {
      badgeSub?.unsubscribe();
      roleSub?.unsubscribe();
      logSub?.unsubscribe();
      userSub?.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    setAdminUsers(unfilteredAdminUsers.filter((adminUser) => adminUser.username.includes(playerSearchString.toLowerCase())));
  }, [unfilteredAdminUsers, playerSearchString]);

  const changeVerification = (adminUser: AdminUser) => {
    if (adminUser.verified) {
      adminService.unverify({ userId: adminUser.id }).subscribe();
    } else {
      adminService.verify({ userId: adminUser.id }).subscribe();
    }
  };

  const ban = (adminUser: AdminUser, reason: string) => {
    adminService.ban({ userId: adminUser.id, reason }).subscribe();
  };

  const unban = (adminUser: AdminUser) => {
    adminService.unban({ userId: adminUser.id }).subscribe();
  };

  const changeBadge = (adminUser: AdminUser, badge: Badge) => {
    if (adminUser.badges.some((b) => b.id === badge.id)) {
      adminService.removeBadge({ userId: adminUser.id, badgeId: badge.id }).subscribe();
    } else {
      adminService.addBadge({ userId: adminUser.id, badgeId: badge.id }).subscribe();
    }
  };

  const changeRole = (adminUser: AdminUser, role: Role) => {
    if (adminUser.roles.some((r) => r.id === role.id)) {
      adminService.removeRole({ userId: adminUser.id, roleId: role.id }).subscribe();
    } else {
      adminService.addRole({ userId: adminUser.id, roleId: role.id }).subscribe();
    }
  };

  return {
    adminUsers,
    playerSearchString,
    setPlayerSearchString,
    changeVerification,
    ban,
    unban,
    badges,
    changeBadge,
    roles,
    changeRole,
    logs
  };
};

export default AdminHandler;