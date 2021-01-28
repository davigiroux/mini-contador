import { IsString } from 'class-validator';
 
class CriarUsuarioDto {
    @IsString()
    public nome!: string;
    
    @IsString()
    public senha!: string;

    @IsString()
    public email!: string;
}
 
export default CriarUsuarioDto;