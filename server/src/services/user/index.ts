import { User, userSchema } from '../../models';

export const checkUsernameAvailibility = async (username: string) : Promise<boolean> => {
  const user = await User.findOne({username});
  if(user)  return false; // if user exists, then username is not available
  return true;
}

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email }); 
};

export const saveUser = async (userData: any) => {
  const user = new User(userSchema.parse(userData)); 
  return await user.save(); 
};