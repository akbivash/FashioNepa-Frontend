export const handleFormError = (user, error, setError) => {
 
    if(user.username.length < 4 ){
        setError({...error, usernameErr:'username can not be less than 5 letter'})
      }
      else{
        setError({usernameErr:''})
      }
   if(user.password !== user.confirmPassword){
    setError({...error, cPasswordErr:'password not matched'})

   }
}