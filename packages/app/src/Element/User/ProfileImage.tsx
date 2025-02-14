import "./ProfileImage.css";

import React, { ReactNode } from "react";
import { HexKey, UserMetadata } from "@snort/system";
import { useUserProfile } from "@snort/system-react";
import { useHover } from "@uidotdev/usehooks";
import classNames from "classnames";

import Avatar from "Element/User/Avatar";
import Nip05 from "Element/User/Nip05";
import useLogin from "Hooks/useLogin";
import Icon from "Icons/Icon";
import DisplayName from "./DisplayName";
import { ProfileLink } from "./ProfileLink";
import { ProfileCard } from "./ProfileCard";

export interface ProfileImageProps {
  pubkey: HexKey;
  subHeader?: JSX.Element;
  showUsername?: boolean;
  className?: string;
  link?: string;
  defaultNip?: string;
  verifyNip?: boolean;
  overrideUsername?: string;
  profile?: UserMetadata;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
  imageOverlay?: ReactNode;
  showFollowingMark?: boolean;
  icons?: ReactNode;
  showProfileCard?: boolean;
}

export default function ProfileImage({
  pubkey,
  subHeader,
  showUsername = true,
  className,
  link,
  defaultNip,
  verifyNip,
  overrideUsername,
  profile,
  size,
  imageOverlay,
  onClick,
  showFollowingMark = true,
  icons,
  showProfileCard,
}: ProfileImageProps) {
  const user = useUserProfile(profile ? "" : pubkey) ?? profile;
  const nip05 = defaultNip ? defaultNip : user?.nip05;
  const { follows } = useLogin();
  const doesFollow = follows.item.includes(pubkey);
  const [ref, hovering] = useHover<HTMLDivElement>();

  function handleClick(e: React.MouseEvent) {
    if (link === "") {
      e.preventDefault();
      onClick?.(e);
    }
  }

  function inner() {
    return (
      <>
        <div className="avatar-wrapper" ref={ref}>
          <Avatar
            pubkey={pubkey}
            user={user}
            size={size}
            imageOverlay={imageOverlay}
            icons={
              (doesFollow && showFollowingMark) || icons ? (
                <>
                  {icons}
                  {showFollowingMark && (
                    <div className="icon-circle">
                      <Icon name="check" className="success" size={10} />
                    </div>
                  )}
                </>
              ) : undefined
            }
          />
        </div>
        {showUsername && (
          <div className="f-ellipsis">
            <div className="flex g4 username">
              {overrideUsername ? overrideUsername : <DisplayName pubkey={pubkey} user={user} />}
              {nip05 && <Nip05 nip05={nip05} pubkey={pubkey} verifyNip={verifyNip} />}
            </div>
            <div className="subheader">{subHeader}</div>
          </div>
        )}
      </>
    );
  }

  function profileCard() {
    if ((showProfileCard ?? true) && user) {
      return <ProfileCard pubkey={pubkey} user={user} show={hovering} ref={ref} />;
    }
    return null;
  }

  if (link === "") {
    return (
      <>
        <div className={classNames("pfp", className)} onClick={handleClick}>
          {inner()}
        </div>
        {profileCard()}
      </>
    );
  } else {
    return (
      <>
        <ProfileLink
          pubkey={pubkey}
          className={classNames("pfp", className)}
          user={user}
          explicitLink={link}
          onClick={handleClick}>
          {inner()}
        </ProfileLink>
        {profileCard()}
      </>
    );
  }
}
