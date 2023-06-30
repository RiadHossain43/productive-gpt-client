import { ProfileContextProvider } from "./profileStore";
import Content from "./Content";
const ProfilePage = () => {
  return (
    <ProfileContextProvider>
      <Content />
    </ProfileContextProvider>
  );
};

export default ProfilePage;
