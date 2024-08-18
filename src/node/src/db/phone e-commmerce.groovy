phone e-commmerce
back-end
      Api 
            user side :
                        POST : Registration
                                   UserScheama : {
                                          id
                                          First Name
                                          Last Name
                                          Phone number
                                          Email
                                          password
                                          created_at
                                          updated_at
                                          otpExpiration : otp expire time
                                          otp
                                          profilePicture
                                          address:{
                                                flatNo./House no.:"",
                                                city:"",
                                                state:"",
                                                pinCode:""
                                          }
                                    }
                        Login
                              email /phonenumber/firstname, password
                        Reset Password
                              update user with new password
                        send otp ---> 000000
                              request body :email
                              in process : get data from user email,  email sent with otp, store otp in user table with otp expiration.
                        verify otp
                              in process : check time validity, 
                        update user profile
                              update profile with multer
                        create item
                              if-> id -> update
                              else -> create

                              {
                                    image:[],
                                    title:"",
                                    desc:"",
                                    price:100,
                                    category:"apple"
                              },{
                                    image:[],
                                    title:"",
                                    desc:"",
                                    price:100,
                                    category:"sams"
                              },{
                                    image:[],
                                    title:"",
                                    desc:"",
                                    price:100,
                                    category:"oneplus"
                              }
                              http://localhost:3000/items
                              http://localhost:3000/items/{id}
                              http://localhost:3000/items/{category}
                              

start time : 1
current : 30 