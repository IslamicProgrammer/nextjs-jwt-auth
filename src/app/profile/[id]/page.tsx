import React from "react";

const ProfileItem = ({ params }: any) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      ProfileItem{" "}
      <span className="mx-2 p-2 block bg-orange-600 rounded">{params.id}</span>
    </div>
  );
};

export default ProfileItem;
