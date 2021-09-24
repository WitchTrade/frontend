import { NextPage } from 'next';
import Link from 'next/link';
import CustomHeader from '../../../components/core/CustomHeader';
import LoginWrapper from '../../../components/core/LoginWrapper';
import ActionButton from '../../../components/styles/ActionButton';
import PageHeader from '../../../components/styles/PageHeader';
import TextInput from '../../../components/styles/TextInput';
import AccountSettingsHandler from '../../../shared/handlers/account.handler';
import useThemeProvider from '../../../shared/providers/theme.provider';

const Changepw: NextPage = () => {
    const { theme } = useThemeProvider();

    const {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        newRepeatPassword,
        setNewRepeatPassword,
        changePassword
    } = AccountSettingsHandler();

    return (
        <LoginWrapper>
            <CustomHeader
                title="WitchTrade | Account Settings"
                description="Account Settings"
                url="https://witchtrade.org/user/settings/changepw"
            />
            <PageHeader title="Change Account Password" />
            <div className="flex flex-col justify-center max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="m-1">
                    <TextInput type="password" placeholder="Old Password" value={oldPassword} setValue={setOldPassword} required={true} svgPath={`/assets/svgs/password/${theme?.type === 'light' ? 'black' : 'white'}.svg`} autocompleteValue="current-password" />
                </div>
                <div className="m-1 mt-2">
                    <p className="text-center text-sm">Password: <br />- Must be at least <span className="text-wt-accent-light">8</span> characters long<br />- Must at least contain <span className="text-wt-accent-light">1</span> letter and <span className="text-wt-accent-light">1</span> number</p>
                    <TextInput type="password" placeholder="New Password" value={newPassword} setValue={setNewPassword} required={true} svgPath={`/assets/svgs/password/${theme?.type === 'light' ? 'black' : 'white'}.svg`} autocompleteValue="new-password" />
                </div>
                <div className="m-1">
                    <TextInput type="password" placeholder="Repeat New Password" value={newRepeatPassword} setValue={setNewRepeatPassword} required={true} svgPath={`/assets/svgs/password/${theme?.type === 'light' ? 'black' : 'white'}.svg`} autocompleteValue="new-password" />
                </div>
                <div className="flex justify-center text-center mt-2">
                    <div className="mx-1">
                        <Link href="/user/settings/account" passHref>
                            <ActionButton type="cancel" onClick={() => { }}>Cancel</ActionButton>
                        </Link>
                    </div>
                    <div className="mx-1">
                        <ActionButton type="proceed" onClick={changePassword}>Change</ActionButton>
                    </div>
                </div>
            </div>
        </LoginWrapper>
    );
};

export default Changepw;
