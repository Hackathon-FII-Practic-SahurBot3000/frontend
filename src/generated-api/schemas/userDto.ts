/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI definition
 * OpenAPI spec version: v0
 */
import type { UserDtoRole } from './userDtoRole';

export interface UserDto {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  profilePictureUrl?: string;
  /** @minLength 1 */
  role: UserDtoRole;
  googleAccount?: boolean;
}
