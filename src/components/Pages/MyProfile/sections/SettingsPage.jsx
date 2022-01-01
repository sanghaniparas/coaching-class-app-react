import React from 'react';
import ChangePassword from './../components/ChangePassword';
import DeleteAccount from './../components/DeleteAccount';

export default function SettingsPage() {
  return (
    <div className="settings-wrapper">
      {/* Change Password */}
      <ChangePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </div>
  );
}
