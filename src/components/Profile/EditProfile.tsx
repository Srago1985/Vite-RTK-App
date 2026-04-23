import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useGetCurrentUserQuery, useUpdateUserMutation } from '../../features/api/accountAPI';
import type { UserProfile } from '../../utils/types'; 

type EditProfileFormProps = {
  user: UserProfile;
  close: () => void;
};

function EditProfileForm({ user, close }: EditProfileFormProps) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [updateUser] = useUpdateUserMutation();

  const handleSave = async () => {
    await updateUser({
      login: user.login,
      user: { firstName, lastName },
    }).unwrap();
    close();
  };

  return (
    <div>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

const EditProfile = ({ close }: { close: () => void }) => {
  const token = useAppSelector((state) => state.token);
  const { data: user } = useGetCurrentUserQuery(undefined, { skip: !token });

  if (!user) return null;

  // key нужен, чтобы форма переинициализировалась при смене пользователя
  return <EditProfileForm key={user.login} user={user} close={close} />;
};

export default EditProfile