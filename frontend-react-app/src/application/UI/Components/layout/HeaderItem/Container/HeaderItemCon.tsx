import type { ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useContext, type FC, useState } from 'react';
import { HeaderItemPre } from '../Presentational/HeaderItemPre';
import { StateContext } from '../../../../../lib/state/AuthContext';
import { useDisclosure } from '@chakra-ui/react';
import type { RestaurantType } from '../../../../../@types/Restaurant';

interface HeaderItemConProps {
  title: string
  isOwner?: boolean
}
export const HeaderItemCon: FC<HeaderItemConProps> = ({ title, isOwner }) => {
  const { restaurantId, onLogout } = useContext(StateContext);
  const { isOpen: isProfileViewModal, onOpen: profileViewModalOnOpen, onClose: profileViewModalOnClose } = useDisclosure();
  const [address, setAddress] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleLogout = (e: MouseEvent) => {
    e.preventDefault();
    onLogout();
  };
  const handleProfileShow = async (e: MouseEvent) => {
    e.preventDefault();
    profileViewModalOnOpen();
    const responce = await fetch(`http://localhost:8080/restaurants/${restaurantId}`);
    const data:RestaurantType = await responce.json();
    setAddress(data.address);
    setCategory(data.category);
    setDescription(data.description);
    setEmail(data.email);
    setName(data.name);
    setPhoneNumber(data.phone_number);
  };
  const handleProfileHide = () => {
    profileViewModalOnClose();
  };
  const handleProfileUpdate = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return <HeaderItemPre
    {...{
      title,
      isOwner,
      isProfileViewModal,
      handleLogout,
      handleProfileShow,
      handleProfileHide,
      address,
      category,
      description,
      email,
      name,
      phoneNumber,
      handleProfileUpdate,
      handleAddressChange,
      handleEmailChange,
      handleNameChange,
      handlePhoneNumberChange,
      handleDescription,
    }}
  />;
};