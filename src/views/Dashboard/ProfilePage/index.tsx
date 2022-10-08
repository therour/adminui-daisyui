import ChangePasswordCard from './ChangePasswordCard'
import EditProfileCard from './EditProfileCard'

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Edit Profile */}
      <EditProfileCard />

      {/* Change Password */}
      <ChangePasswordCard />
    </div>
  )
}

export default ProfilePage
