import {React , useState} from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Link,
    Paper,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
  } from '@material-ui/core';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';


function Hotel() {

    const[loginStatus,setLoginStatus] = useState('')

    const navigate = useNavigate();

    const clickLogin = (data) => {
        // console.log(data);
        Axios.post("http://localhost:3004/login", {
            username: data.username,
            password: data.password
        }).then((response)=>{
            // console.log(response.data[0].Username);
            if(response.data.message){
                setLoginStatus(response.data.message)
            } else{
                navigate('/product/Home')
            }
        })
    }

    // const navigateToHome = () => {
    //     // 👇️ navigate to Home
    //     navigate('/product/Home');
    //   };

    const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            ),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
    })

    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

  return (
        <Grid>
            <Paper className='paperStyle' elevation={20}
              style={{
                  padding: '80px',
                  height: '590px',
                  width: '490px',
                  margin: '40px auto'
              }}
            > 
                <Grid align='center'>
                    <Avatar className='avatarStyle' style={{ backgroundColor:'#0a8bed'}}><LockOutlinedIcon/></Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField 
                    id="standard-basic" 
                    label='UserName' 
                    placeholder='Enter User' 
                    variant="standard" 
                    fullWidth
                    {...register('username')}
                    error={errors.username ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.username?.message}
                </Typography>
                <br/>
                <TextField 
                    id="standard-basic" 
                    label='Password' 
                    type='password' 
                    placeholder='Enter Password' 
                    variant="standard" 
                    fullWidth
                    {...register('password')}
                    error={errors.password ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.password?.message}
                </Typography>
                <br/><br/>
                <FormGroup>
                <FormControlLabel
                    control={
                        <Controller
                            control={control}
                            name="acceptTerms"
                            defaultValue="false"
                            inputRef={register()}
                            render={({ field: { onChange } }) => (
                                <Checkbox
                                    color="primary"
                                    onChange={e => onChange(e.target.checked)}
                                />
                            )}
                        />
                    }
                    label={
                        <Typography color={errors.acceptTerms ? 'error' : 'inherit'}>
                            I have read and agree to the Terms *
                        </Typography>
                    }
                />
                <Typography variant="inherit" color="textSecondary">
                    {errors.acceptTerms
                        ? '(' + errors.acceptTerms.message + ')'
                        : ''}
                </Typography>
                </FormGroup>
                <Button 
                    className='btnStyle' 
                    fullWidth variant='contained' 
                    type='submit'
                    onClick={handleSubmit(clickLogin)}
                    style={{margin: '20px 0'}}
                >
                    Sign in
                </Button><br/>
                <Typography>
                    <Link href="#" underline='none'>
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography>Do you have an account?
                    <Link href="/product/Register" underline='none'>
                        Register
                    </Link>
                </Typography>
                <h4>{loginStatus}</h4>
            </Paper>
        </Grid>
  )
}

export default Hotel
