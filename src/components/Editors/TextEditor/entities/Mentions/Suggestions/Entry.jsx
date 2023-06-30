import { useCallback } from "react";
// import defaultAvatar from "assets/img/default-avatar.png";
export default function Entry({
  name,
  profileImageSrc,
  _id,
  onSelect = () => {},
}) {
  let handleSelect = useCallback((e) => {
    e.preventDefault();
    onSelect({ name, profileImageSrc, _id });
  });
  return (
    <div className="d-flex align-items-center">
      <div className="avatar mb-1">
        <img
          src={
            profileImageSrc ||
            "https://assets.imssystems.tech/images/system/avatar-placeholder.jpg"
          }
          alt={name}
        />
      </div>
      <div onClick={handleSelect} className="btn btn-link p-2 mb-1">
        {name}
      </div>
    </div>
  );
}
