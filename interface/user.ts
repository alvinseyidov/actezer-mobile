// src/modules/auth/types/authTypes.ts

export interface TokenObtainPair {
	email: string; // title: Email, minLength: 1
	password: string; // title: Password, minLength: 1
}

export interface TokenRefresh {
	refresh: string; // title: Refresh, minLength: 1
	access?: string; // title: Access, readOnly: true, minLength: 1
}

export interface TokenVerify {
	token: string; // title: Token, minLength: 1
}

export interface AuthToken {
	token?: string; // title: Token, readOnly: true, minLength: 1
	refresh?: string; // title: Refresh Token, minLength: 1
}

export interface User {
	id?: number; // title: ID, readOnly: true
	password: string; // title: Password, maxLength: 128, minLength: 1
	last_login?: string | null; // title: Last login, x-nullable: true, string($date-time)
	is_superuser?: boolean; // title: Superuser status
	first_name?: string; // title: First name, maxLength: 150
	last_name?: string; // title: Last name, maxLength: 150
	is_staff?: boolean; // title: Staff status
	date_joined?: string; // title: Date joined, string($date-time)
	email: string; // title: Email, maxLength: 128, minLength: 1, string($email)
	profile_image?: string | null; // title: Profile image, readOnly: true, x-nullable: true, string($uri)
	date_birth?: string | null; // title: Date birth, x-nullable: true, string($date)
	gender?: string | null; // title: Gender, x-nullable: true
	created_at?: string; // title: Created at, readOnly: true, string($date-time)
	updated_at?: string; // title: Updated at, readOnly: true, string($date-time)
	is_active?: boolean; // title: Is active
	is_deleted?: boolean; // title: Is deleted
	position?: number | null; // title: Position, x-nullable: true
	groups?: number[]; // title: Groups this user belongs to, uniqueItems: true
	user_permissions?: number[]; // title: Specific permissions for this user, uniqueItems: true
}
