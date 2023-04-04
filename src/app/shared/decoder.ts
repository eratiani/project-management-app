import jwt_decode, { JwtPayload } from 'jwt-decode';
export interface DecodedToken extends JwtPayload {
  exp: number;

}
 