import useUserDetailInfo from "../../hooks/api/user/useUserDetailInfo";

interface IProps {
  columsId: number;
}

const UserDetailComp = ({ columsId }: IProps) => {
  const { data } = useUserDetailInfo(columsId);
  console.log("data:", data);
  return <>나임</>;
};

export default UserDetailComp;
