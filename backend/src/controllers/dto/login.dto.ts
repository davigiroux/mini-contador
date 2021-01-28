import { IsString } from 'class-validator';
 
class LoginDto {
    @IsString()
    public email!: string;
    
    @IsString()
    public senha!: string;

} 
export default LoginDto;