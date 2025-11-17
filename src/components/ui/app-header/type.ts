export type TAppHeaderUIProps = {
  userName: string;

  onConstructorClick: () => void;
  onFeedClick: () => void;
  onProfileClick: () => void;

  isConstructorActive: boolean;
  isFeedActive: boolean;
  isProfileActive: boolean;
};
