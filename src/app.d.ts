// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
/// <reference types="lucia" />

import type { UserRole } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Locals {
			auth: import('lucia').AuthRequest;
		}

		interface PageState {
			add?: boolean;
		}
	}

	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			email: string;
			emailVerifiedAt: Date | null;
			role: UserRole;
		};
		type DatabaseSessionAttributes = unknown;
	}
}

export {};
