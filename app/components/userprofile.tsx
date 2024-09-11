import '@farcaster/auth-kit/styles.css';
import { useProfile } from '@farcaster/auth-kit';

const UserProfile = () => {
  const {
    isAuthenticated,
    profile: { username, fid },
  } = useProfile();
  return (
    <div className=''>
      {isAuthenticated ? (
        <p>
          Hello, {username}! Your fid is: {fid}
        </p>
      ) : (
        <p>You&#39;re not signed in.</p>
      )}
    </div>
  );
};

export default UserProfile;