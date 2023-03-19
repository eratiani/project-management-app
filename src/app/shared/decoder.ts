import jwt_decode, { JwtPayload } from 'jwt-decode';
export interface DecodedToken extends JwtPayload {
    exp: number;
    // add any other properties from your token payload here
  }