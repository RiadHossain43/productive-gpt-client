import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Avatar = ({ imageSrc, userName, className, actionAt }) => {
  return (
    <div className={"d-flex " + className}>
      <div className="avatar avatar-sm rounded-circle">
        <img
          alt="..."
          src={require("../../assets/img/theme/default-avatar.png").default}
        />
      </div>
      {userName && (
        <p className="ml-2 mt-1">
          <Link to={"#"}>
            <small>{userName} </small>
          </Link>
          {actionAt && <small className="text-muted">{actionAt}</small>}
        </p>
      )}
    </div>
  );
};

Avatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  userName: PropTypes.string,
  className: PropTypes.string,
  actionAt: PropTypes.string,
};

export default Avatar;
